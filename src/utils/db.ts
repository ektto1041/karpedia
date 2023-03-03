import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { NewPostType, PostDoc, PostType } from '@/types/post';
import dayjs from "dayjs";

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
  getAllPosts: async () => {
    const result: PostType[] = [];
    const q = query(collection(db, 'posts'), orderBy("modifiedAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(queryDocSnapshot => {
      const data = queryDocSnapshot.data() as PostDoc;

      result[result.length] = {
        ...data,
        id: queryDocSnapshot.id,
        createdAt: dayjs(data.createdAt.toDate()).format(),
        modifiedAt: dayjs(data.modifiedAt.toDate()).format(),
      };
    });

    return result;
  },
  addPost: async (newPostData: NewPostType) => {
    const now = Timestamp.now();
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
      createdAt: dayjs(newPost.createdAt.toDate()).format(),
      modifiedAt: dayjs(newPost.modifiedAt.toDate()).format(),
    }

    return addedPost;
  },
};

export type { ErrorRes };