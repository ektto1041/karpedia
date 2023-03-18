import type { NextApiRequest, NextApiResponse } from 'next';
import db, { ErrorRes } from '@/utils/db';
import strings from '@/utils/strings';
import { CommentType, NewCommentType } from '@/types/post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean | ErrorRes>
) {
  if(req.method === 'PUT') {
    const commentId = req.query.commentId ? req.query.commentId as string : undefined;
    if(commentId) {
      const newReply: string = req.body.newReply;

      try {
        await db.updateReply(commentId, newReply);

        res.status(200).json(true);
      } catch(e) {
        console.log(e);
        res.status(400).json({
          message: strings.db.err.unknown,
        });
      }
    } else {
      res.status(400).json({
        message: 'comment id 가 입력되지 않았습니다.',
      });
    }
  } else {
    res.status(400).json({
      message: '잘못된 api 요청입니다.'
    })
  }
}
