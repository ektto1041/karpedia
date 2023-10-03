import { CommentsDto, CommentsWithPublicUsersDto } from '@/types/comment';
import styles from './CommentBox.module.css';
import CommentItem from './CommentItem';
import { PublicUsersDto } from '@/types/user';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { apis } from '@/utils/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { selectSelfUser } from '@/redux/slices/AuthSlice';

type CommentBoxProps = {
  onClickCreateComment: (content: string, replyToId?: number) => void;
  viewer: PublicUsersDto;
  postId: number;
};

export default function CommentBox({
  onClickCreateComment,
  viewer,
  postId,
}: CommentBoxProps) {
  const [commentList, setCommentList] = useState<CommentsWithPublicUsersDto[]>([]);
  const [replyTo, setReplyTo] = useState<CommentsWithPublicUsersDto>();

  const commentRefs = useRef<HTMLDivElement[]>([]);
  const newCommentRef = useRef<HTMLDivElement>();

  const selfUser = useSelector((state: RootState) => selectSelfUser(state));

  const getCommentList = useCallback(async () => {
    const response = await apis.getCommentsWithPublicUser(postId);
    if(response.status < 300) {
      setCommentList(response.data);
    }
  }, [postId]);

  useEffect(() => {
    getCommentList();
  }, [getCommentList]);

  const onClickReply = useCallback((commentId: number) => {
    const comment = commentList.find(comment => comment.id === commentId)!;
    setReplyTo({...comment});

    newCommentRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commentList, newCommentRef]);

  const onClickCancelReply = useCallback(() => {
    setReplyTo(undefined);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles['comment-list']}>
        {commentList?.map((comment, i) => (
          <CommentItem
            key={comment.id}
            commentProps={{
              comment,
              onClickReply,
            }}
            user={comment.users}
            refs={ref => {commentRefs.current[i] = ref!}}
          />
        ))}
      </div>
      {selfUser && (
        <CommentItem
          isNewComment
          newCommentProps={{
            onClickCreate: onClickCreateComment,
            replyTo,
            onClickCancelReply,
          }}
          user={selfUser}
          refs={ref => newCommentRef.current = ref!}
        />
      )}
    </div>
  );
};