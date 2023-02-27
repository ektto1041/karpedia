import type { NextApiRequest, NextApiResponse } from 'next';
import db, { ErrorRes, PostData } from '@/utils/db';
import strings from '@/utils/strings';
import { DocumentData, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import { PostDoc } from '@/types/post';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostDoc | ErrorRes>
) {
  switch(req.method) {
    case 'POST':
      const newPostData: PostData = req.body;

      const newPost: PostDoc = {
        emoji: newPostData.emoji,
        title: newPostData.title,
        content: newPostData.content,
        topics: newPostData.topics,
        viewCount: 0,
        createdAt: Timestamp.now(),
        modifiedAt: Timestamp.now(),
      }

      try {
        await db.addPost(newPost);

        res.status(200).json(newPost);
      } catch(e) {
        res.status(400).json({
          message: strings.db.err.unknown,
        });
      }
    default:
  }
}
