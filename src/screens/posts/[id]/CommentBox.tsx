import MainInput from '@/components/MainInput';
import { CommentItemType } from '@/types/post';
import { Fragment } from 'react';
import Comment from './Comment';
import styles from './CommentBox.module.css';
import Reply from './Reply';

type CommentBoxProps = {
  commentList: CommentItemType[]
};

export default function CommentBox({
  commentList,
}: CommentBoxProps) {
  // 댓글 리스트 가져와서 처리하는 부분부터

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