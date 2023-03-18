import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, query, orderBy, limit, where, getDoc, doc, updateDoc, setDoc, writeBatch, increment, DocumentReference, DocumentData, deleteDoc } from "firebase/firestore";
import { CommentDoc, CommentType, NewCommentType, NewPostType, PostDoc, PostType, ViewCountShardDoc } from '@/types/post';
import time from "./time";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore
const db = getFirestore(app);

// types
type ErrorRes = {
  message: string,
}

// 분산 카운터 구현을 위한 shard 개수
const NUM_VIEW_COUNT = 10;

// 포스트 viewCount 구해주는 함수
const getViewCount = async (ref: DocumentReference<DocumentData>): Promise<number> => {
  let result = 0;

  const viewCountQuerySnapshot = await getDocs(collection(ref, 'viewCount'));
  for(const shardSnapshot of viewCountQuerySnapshot.docs) {
    result += (shardSnapshot.data() as ViewCountShardDoc).count;
  }

  return result;
};

// 포스트 viewCount 증가시켜주는 함수
const incrementViewCount = async (ref: DocumentReference<DocumentData>): Promise<void> => {
    // Select a shard of the counter at random
    const viewCountId = Math.floor(Math.random() * NUM_VIEW_COUNT).toString();
    const viewCountRef = doc(collection(ref, 'viewCount'), viewCountId);

    // Update count
    await updateDoc(viewCountRef, { count: increment(1) });
}

// Methods about db
export default {
  /**
   * DB 에서 모든 Post 를 가져오는 함수
   * @returns 모든 Post 배열
   */
  getAllPosts: async () => {
    const result: PostType[] = [];
    const q = query(collection(db, 'posts'), where('status', '==', 0), orderBy("modifiedAt", "desc"));
    const querySnapshot = await getDocs(q);
    for(const postSnapshot of querySnapshot.docs) {
      const data = postSnapshot.data() as PostDoc;

      const post: PostType = {
        ...data,
        id: postSnapshot.id,
        viewCount: await getViewCount(postSnapshot.ref),
        createdAt: time.toString(data.createdAt),
        modifiedAt: time.toString(data.modifiedAt),
      };

      result[result.length] = post;
    }

    return result;
  },
  /**
   * id로 포스트를 찾아 가져오고 조회 수를 업데이트 하는 함수
   * @param id 찾으려는 포스트의 id
   * @returns 찾은 포스트
   */
  getPostById: async (id: string): Promise<PostType | undefined> => {
    // Post 가져오기
    const foundPost = await getDoc(doc(collection(db, 'posts'), id));
    const data = foundPost.data() as PostDoc;

    const hasNoData = !Boolean(data);
    // TODO 예외 처리
    if(hasNoData) return undefined;

    const result: PostType = {
      ...data,
      id: foundPost.id,
      viewCount: await getViewCount(foundPost.ref),
      createdAt: time.toString(data.createdAt),
      modifiedAt: time.toString(data.modifiedAt),
    };

    // viewCount 증가
    incrementViewCount(foundPost.ref);

    return result;
  },
  /**
   * 새 포스트를 저장하는 함수
   * @param newPostData 새 포스트 저장을 위해 필요한 데이터들
   * @returns 등록된 포스트
   */
  addPost: async (newPostData: NewPostType) => {
    const now = time.now();
    const newPost: PostDoc = {
      emoji: newPostData.emoji,
      title: newPostData.title,
      content: newPostData.content,
      topics: newPostData.topics,
      numViewCount: NUM_VIEW_COUNT,
      createdAt: now,
      modifiedAt: now,
      status: 0,
    };

    const batch = writeBatch(db);

    // new post doc
    const addedPost = doc(collection(db, 'posts'));
    // set data without viewCount(subcollection)
    batch.set(addedPost, newPost);

    const viewCountShards = collection(addedPost, 'viewCount');
    for(let i = 0; i < NUM_VIEW_COUNT; i++) {
      const viewCountShard = doc(viewCountShards, i.toString());
      batch.set(viewCountShard, { count: 0 });
    }

    await batch.commit();

    const result: PostType = {
      ...newPost,
      id: addedPost.id,
      viewCount: 0,
      createdAt: time.toString(newPost.createdAt),
      modifiedAt: time.toString(newPost.modifiedAt),
    }

    return result;
  },
  /**
   * 포스트를 수정하는 함수
   * @param newPostData 수정할 내용
   * @param postId 수정할 포스트의 id
   */
  updatePost: async (newPostData: NewPostType, postId: string): Promise<void> => {
    const postRef = doc(collection(db, 'posts'), postId);

    const newPost = {
      emoji: newPostData.emoji,
      title: newPostData.title,
      content: newPostData.content,
      topics: newPostData.topics,
      modifiedAt: time.now(),
    };

    await updateDoc(postRef, newPost);
  },
  /**
   * 포스트를 삭제하는 함수
   * @param postId 삭제하려는 포스트 id
   */
  deletePost: async (postId: string): Promise<void> => {
    const postDoc = doc(collection(db, 'posts'), postId);

    await updateDoc(postDoc, { status: 1 });
  },

  /**
   * 한 포스트의 댓글 리스트를 가져오는 함수
   * @param postId 찾으려는 댓글이 작성되어 있는 포스트의 아이디
   * @returns 해당 포스트에 작성된 댓글 리스트
   */
  getCommentsByPostId: async (postId: string) => {
    const result: CommentType[] = [];
    
    const q = query(collection(db, 'comments'), where('status', '==', 0), where('postId', '==', postId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(queryDocSnapshot => {
      const data = queryDocSnapshot.data() as CommentDoc;
      result[result.length] = {
        ...data,
        createdAt: time.toString(data.createdAt),
        id: queryDocSnapshot.id,
      };
    });

    return result;
  },
  /**
   * 새 댓글을 저장하는 함수
   * @param newCommentData 새 댓글 저장을 위해 필요한 데이터들
   * @returns 등록된 댓글
   */
  addComment: async (newCommentData: NewCommentType) => {
    const newComment: CommentDoc = {
      ...newCommentData,
      reply: '',
      createdAt: time.now(),
      status: 0,
    };

    const addedCommentId = (await addDoc(collection(db, 'comments'), newComment)).id;
    const addedComment: CommentType = {
      ...newComment,
      id: addedCommentId,
      createdAt: time.toString(newComment.createdAt),
    };

    return addedComment;
  },
  /**
   * 댓글을 삭제하는 함수
   * @param commentId 삭제하려는 댓글의 id
   */
  deleteComment: async (commentId: string) => {
    await updateDoc(doc(collection(db, 'comments'), commentId), {
      status: 1,
    });
  },
};

export type { ErrorRes };