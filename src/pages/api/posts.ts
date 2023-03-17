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
  if(req.method === 'GET') {
    const postId = req.query.postId ? req.query.postId as string : undefined;

    if(postId) {
      try {
        const post = await db.getPostById(postId);

        if(!post) throw new Error('db에서 데이터를 찾지 못했습니다.');
        
        res.status(200).json(post);
      } catch(e) {
        res.status(400).json({
          message: strings.db.err.unknown,
        });
      }
    } else {
      res.status(400).json({
        message: strings.db.err.unknown,
      });
    }
  } else if(req.method === 'POST') {
    const newPost: NewPostType = req.body;

    try {
      const addedPost = await db.addPost(newPost);

      res.status(200).json(addedPost);
    } catch(e) {
      res.status(400).json({
        message: strings.db.err.unknown,
      });
    }
  } else {
    res.status(400).json({
      message: '잘못된 api 요청입니다.'
    })
  }
}
