import { CommentsDto, CommentsWithPublicUsersDto, NewCommentsDto } from '@/types/comment';
import styles from './CommentBox.module.css';
import CommentItem from './CommentItem';
import { PublicUsersDto } from '@/types/user';
import { useCallback, useEffect, useState } from 'react';
import { apis } from '@/utils/api';

type CommentBoxProps = {
  onClickCreateComment: (content: string) => void;
  viewer: PublicUsersDto;
  postId: number;
};

export default function CommentBox({
  onClickCreateComment,
  viewer,
  postId,
}: CommentBoxProps) {
  const [commentList, setCommentList] = useState<CommentsWithPublicUsersDto[]>([]);

  const getCommentList = useCallback(async () => {
    const response = await apis.getCommentsWithPublicUser(postId);
    if(response.status < 300) {
      setCommentList(response.data);
    }
  }, [postId]);

  useEffect(() => {
    getCommentList();
  }, [getCommentList]);

  return (
    <div className={styles.container}>
      <div className={styles['comment-list']}>
        {commentList?.map(comment => (
          <CommentItem key={comment.id} comment={comment} user={comment.users} />
          ))}
      </div>
      <CommentItem isNewComment onClickCreate={onClickCreateComment} user={viewer} />
    </div>
  );
};