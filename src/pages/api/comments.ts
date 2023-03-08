import type { NextApiRequest, NextApiResponse } from 'next';
import db, { ErrorRes } from '@/utils/db';
import strings from '@/utils/strings';
import { CommentType, NewCommentType } from '@/types/post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentType[] | CommentType | undefined | ErrorRes>
) {
  if(req.method === 'GET') {
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
      console.log(e);
      res.status(400).json({
        message: strings.db.err.unknown,
      });
    }
  } else if(req.method === 'POST') {
    const newComment: NewCommentType = req.body;

    try {
      const addedComment = await db.addComment(newComment);

      res.status(200).json(addedComment);
    } catch(e) {
      res.status(400).json({
        message: strings.db.err.unknown,
      });
    }
  } else if(req.method === 'DELETE') {
    const { commentId } = req.query;
    const hasNoCommentId = !Boolean(commentId);
    if(hasNoCommentId) {
      res.status(400).json({
        message: 'Comment ID 가 존재하지 않습니다.'
      });

      return;
    }

    try {
      await db.deleteComment(commentId as string);

      // TODO undefined?
      res.status(200).json(undefined);
    } catch(e) {
      res.status(400).json({
        message: strings.db.err.unknown,
      });
    }
  } else {

  }
}
