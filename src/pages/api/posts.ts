import type { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';
import db, { ErrorRes, Post, PostData } from '@/utils/db';
import strings from '@/utils/strings';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | ErrorRes>
) {
  switch(req.method) {
    case 'POST':
      const newPostData: PostData = req.body;

      // post 데이터에 날짜 추가
      const newPost: Post = {
        ...newPostData,
        createdAt: dayjs().format(),
        modifiedAt: dayjs().format(),
      };

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
