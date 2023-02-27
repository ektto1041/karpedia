import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import { PostDoc, TopicDoc } from '@/types/post';

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
type PostData = {
  emoji: string,
  title: string,
  content: string,
  topics: string[],
};

type ErrorRes = {
  message: string,
}

// Methods about db
export default {
  getAllPosts: async () => {
    return await getDocs(collection(db, 'posts'));
  },
  addPost: async (newPost: PostDoc) => {
    return await addDoc(collection(db, 'posts'), newPost);
  },
  getAllTopics: async () => {
    return await getDocs(collection(db, 'topics'));
  },
  addTopic: async (newTopic: TopicDoc) => {
    return await addDoc(collection(db, 'topics'), newTopic);
  },
};

export type { PostData, ErrorRes };