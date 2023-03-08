import type { NextApiRequest, NextApiResponse } from 'next';
import db, { ErrorRes } from '@/utils/db';
import strings from '@/utils/strings';
import { NewPostType, PostType } from '@/types/post';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostType | ErrorRes>
) {
  switch(req.method) {
    case 'POST':
      const newPost: NewPostType = req.body;

      try {
        const addedPost = await db.addPost(newPost);

        res.status(200).json(addedPost);
      } catch(e) {
        res.status(400).json({
          message: strings.db.err.unknown,
        });
      }
    default:
  }
}
