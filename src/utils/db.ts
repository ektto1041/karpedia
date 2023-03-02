import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import { PostDoc, PostType } from '@/types/post';

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
    const result: PostType[] = [];
    const q = query(collection(db, 'posts'), orderBy("modifiedAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(queryDocSnapshot => result[result.length] = {...queryDocSnapshot.data() as PostDoc, id: queryDocSnapshot.id});

    console.log(result);

    return result;
  },
  addPost: async (newPost: PostDoc) => {
    return await addDoc(collection(db, 'posts'), newPost);
  },
};

export type { PostData, ErrorRes };