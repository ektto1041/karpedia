import useComment from '@/hooks/useComment';
import { apis } from '@/utils/api';
import { Fragment, useCallback } from 'react';
import Comment from './Comment';
import styles from './CommentBox.module.css';
import CommentInput from './CommentInput';
import Reply from './Reply';

type CommentBoxProps = {
  postId: number,
  isAdmin: boolean,
};

export default function CommentBox({
  postId,
  isAdmin,
}: CommentBoxProps) {
  const { commentList, error, isLoading, mutate } = useComment(postId);

  const revalidateCommentList = useCallback( () => {
    mutate();
  }, [mutate]);

  const deleteComment = async (id: number) => {
    const result = await apis.deleteComment(id);
    if(result.status !== 200) {
      alert('댓글을 삭제할 수 없습니다.');
    } else {
      revalidateCommentList();
    }
  };

  const handleClickDeleteButton = (id: number, password: string) => {
    const pw = prompt('비밀번호를 입력해주세요.');
    const isNull = !Boolean(pw);
    if(!isNull && (pw === password)) {
      deleteComment(id);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <CommentInput placeholder='댓글을 입력하세요.' postId={postId} revalidateCommentList={revalidateCommentList} />
      {commentList.map(comment => Boolean(comment.reply) ? (
        <Fragment key={comment.id}>
          <Comment comment={comment} onClickDeleteButton={handleClickDeleteButton} isAdmin={isAdmin} revalidateCommentList={revalidateCommentList} />
          <Reply content={comment.reply} />
        </Fragment>
      ) : (
        <Comment key={comment.id} comment={comment} onClickDeleteButton={handleClickDeleteButton} isAdmin={isAdmin} revalidateCommentList={revalidateCommentList} />
      ))}
    </div>
  )
}