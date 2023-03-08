import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, query, orderBy, limit, where, getDoc, doc, updateDoc } from "firebase/firestore";
import { CommentDoc, CommentType, NewCommentType, NewPostType, PostDoc, PostType } from '@/types/post';
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

// Methods about db
export default {
  /**
   * DB 에서 모든 Post 를 가져오는 함수
   * @returns 모든 Post 배열
   */
  getAllPosts: async () => {
    const result: PostType[] = [];
    const q = query(collection(db, 'posts'), orderBy("modifiedAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(queryDocSnapshot => {
      const data = queryDocSnapshot.data() as PostDoc;

      result[result.length] = {
        ...data,
        id: queryDocSnapshot.id,
        createdAt: time.toString(data.createdAt),
        modifiedAt: time.toString(data.modifiedAt),
      };
    });

    return result;
  },
  /**
   * 포스트 중 조회수가 가장 높은 50개의 id 를 가져오는 함수
   * @returns 조회수 순으로 정렬된 50개의 포스트의 id
   */
  getTopViewCountPostIds: async () => {
    const result: string[] = [];
    const q = query(collection(db, 'posts'), orderBy('viewCount', 'desc'), limit(50));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(queryDocSnapshot => {
      result[result.length] = queryDocSnapshot.id;
    });

    return result;
  },
  /**
   * id로 포스트를 찾아 가져오는 함수
   * @param id 찾으려는 포스트의 id
   * @returns 찾은 포스트
   */
  getPostById: async (id: string) => {
    const foundPost = await getDoc(doc(collection(db, 'posts'), id));
    const data = foundPost.data() as PostDoc;

    const hasNoData = !Boolean(data);
    if(hasNoData) return undefined;

    const result: PostType = {
      ...data,
      id: foundPost.id,
      createdAt: time.toString(data.createdAt),
      modifiedAt: time.toString(data.modifiedAt),
    };

    return result;
  },
  /**
   * 새 포스트를 저장하는 함수
   * @param newPostData 새 포스트 저장을 위해 필요한 데이터들
   * @returns 등록된 포스트
   */
  addPost: async (newPostData: NewPostType) => {
    const now = time.now();
    const newPost = {
      emoji: newPostData.emoji,
      title: newPostData.title,
      content: newPostData.content,
      topics: newPostData.topics,
      viewCount: 0,
      createdAt: now,
      modifiedAt: now,
    }

    const addedPostId = (await addDoc(collection(db, 'posts'), newPost)).id;
    const addedPost: PostType = {
      ...newPost,
      id: addedPostId,
      createdAt: time.toString(newPost.createdAt),
      modifiedAt: time.toString(newPost.modifiedAt),
    }

    return addedPost;
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