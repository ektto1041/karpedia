import useComment from '@/hooks/useComment';
import { Fragment, useCallback } from 'react';
import Comment from './Comment';
import styles from './CommentBox.module.css';
import CommentInput from './CommentInput';
import Reply from './Reply';

type CommentBoxProps = {
  postId: string,
};

export default function CommentBox({
  postId,
}: CommentBoxProps) {
  const { commentList, error, isLoading, mutate } = useComment(postId);

  const revalidateCommentList = useCallback( () => {
    mutate();
  }, [mutate, commentList]);

  return (
    <div className={styles.container}>
      <CommentInput placeholder='댓글을 입력하세요.' postId={postId} revalidateCommentList={revalidateCommentList} />
      {commentList.map(comment => Boolean(comment.reply) ? (
        <Fragment key={comment.id}>
          <Comment comment={comment} />
          <Reply content={comment.reply} />
        </Fragment>
      ) : (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}