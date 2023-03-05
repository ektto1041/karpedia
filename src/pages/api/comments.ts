import type { NextApiRequest, NextApiResponse } from 'next';
import db, { ErrorRes } from '@/utils/db';
import strings from '@/utils/strings';
import { CommentType, NewCommentType } from '@/types/post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentType[] | CommentType | ErrorRes>
) {
  switch(req.method) {
    case 'GET':
      const { postId } = req.query;
      const hasNoPostId = !Boolean(postId);
      if(hasNoPostId) {
        res.status(400).json({
          message: 'Post ID 가 존재하지 않습니다.'
        });

        return;
      }

      try {
        const commentList = await db.getCommentsByPostId(postId as string);

        res.status(200).json(commentList);
      } catch(e) {
        res.status(400).json({
          message: strings.db.err.unknown,
        });
      }

      break;
    case 'POST':
      const newComment: NewCommentType = req.body;

      try {
        const addedComment = await db.addComment(newComment);

        res.status(200).json(addedComment);
      } catch(e) {
        res.status(400).json({
          message: strings.db.err.unknown,
        });
      }

      break;
    default:
  }
}
