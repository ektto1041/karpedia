import type { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

type PostData = {
  title: string,
  content: string,
  topic: string,
};

type Post = {
  title: string,
  content: string,
  topic: string,
  createdAt: string,
  modifiedAt: string,
}

type ErrorRes = {
  message: string,
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | ErrorRes>
) {
  switch(req.method) {
    case 'POST':
      const newPostData: PostData = req.body;

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      // const analytics = getAnalytics(app);

      // Initialize Cloud Firestore
      const db = getFirestore(app);

      const newPost: Post = {
        ...newPostData,
        createdAt: dayjs().format(),
        modifiedAt: dayjs().format(),
      };

      try {
        await addDoc(collection(db, "posts"), newPost);

        res.status(200).json(newPost);
      } catch(e) {
        res.status(400).json({
          message: '데이터베이스 저장 실패',
        });
      }
    default:
  }
}
