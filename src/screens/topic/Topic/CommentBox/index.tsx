import { CommentsWithPublicUsersWithReplyToDto, NewCommentsDto } from '@/types/comment';
import styles from './CommentBox.module.css';
import CommentItem from './CommentItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import { apis } from '@/utils/api';
import { selectSelfUser } from '@/redux/slices/AuthSlice';
import { useRouter } from 'next/router';
import NewComment from './NewComment';
import useAppSelector from '@/hooks/useAppSelector';

type CommentBoxProps = {
  postId: number;
};

export default function CommentBox({
  postId,
}: CommentBoxProps) {
  const [commentList, setCommentList] = useState<CommentsWithPublicUsersWithReplyToDto[]>([]);
  const [replyTo, setReplyTo] = useState<CommentsWithPublicUsersWithReplyToDto | null>(null);

  const commentRefs = useRef<HTMLDivElement[]>([]);
  const newCommentRef = useRef<HTMLDivElement>();

  const selfUser = useAppSelector(state => selectSelfUser(state));
  const router = useRouter();

  const getCommentList = useCallback(async () => {
    const response = await apis.getCommentsWithPublicUser(postId);
    if(response.status < 300) {
      setCommentList(response.data);
    }
  }, [postId]);

  useEffect(() => {
    setReplyTo(null);
  }, [router]);

  useEffect(() => {
    getCommentList();
  }, [getCommentList]);

  const onClickReply = useCallback((commentId: number) => {
    const comment = commentList.find(comment => comment.id === commentId)!;
    setReplyTo({...comment});

    newCommentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [commentList, newCommentRef]);

  const onClickCancelReply = useCallback(() => {
    setReplyTo(null);
  }, []);

  const onClickScrollToReplyFrom = useCallback((commentId: number) => {
    const commentIdx = commentList.findIndex(comment => comment.id === commentId);

    commentRefs.current[commentIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [commentList, commentRefs]);

  const onClickCreateComment = useCallback(async (content: string) => {
    const newComment: NewCommentsDto = {
      content,
      postsId: postId,
      replyToId: replyTo?.id,
    };

    const response = await apis.createComment(newComment);
    if(response.status < 300) {
      router.reload();
    }
  }, [postId, router, replyTo]);

  return (
    <div className={styles.container}>
      <div className={styles['comment-list']}>
        {commentList?.map((comment, i) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onClickReply={onClickReply}
            onClickScrollToReplyFrom={onClickScrollToReplyFrom}
            refs={ref => {commentRefs.current[i] = ref!}}
          />
        ))}
      </div>
      {selfUser && (
        <NewComment
          replyTo={replyTo}
          onClickCancelReply={onClickCancelReply}
          onClickCreateComment={onClickCreateComment}
          refs={ref => {newCommentRef.current = ref!}}
        />
      )}
    </div>
  );
};