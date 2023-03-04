import MainInput from '@/components/MainInput';
import useComment from '@/hooks/useComment';
import { Fragment, useEffect, useState } from 'react';
import Comment from './Comment';
import styles from './CommentBox.module.css';
import Reply from './Reply';

type CommentBoxProps = {
  postId: string,
};

export default function CommentBox({
  postId,
}: CommentBoxProps) {
  const { commentList, error, isLoading } = useComment(postId);

  return (
    <div className={styles.container}>
      <MainInput placeholder='댓글을 입력하세요.' onSubmit={() => {}} />
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