import { CommentsWithPublicUsersWithReplyToDto, NewCommentsUpdateDto } from '@/types/comment';
import CommentContentWrapper from '../CommentContentWrapper';
import styles from './CommentItem.module.css';
import CommentContent from './CommentContent';
import { LegacyRef, useCallback, useState } from 'react';
import CommentForm from '../CommentForm';
import { apis } from '@/utils/api';
import { useRouter } from 'next/router';

type CommentItemProps = {
  comment: CommentsWithPublicUsersWithReplyToDto;
  onClickReply: (commentId: number) => void;
  onClickScrollToReplyFrom: (commentId: number) => void;
  refs: LegacyRef<HTMLDivElement>;
}

export default function CommentItem({
  comment,
  onClickReply,
  onClickScrollToReplyFrom,
  refs,
}: CommentItemProps) {
  const [isUpdate, setUpdate] = useState(false);

  const router = useRouter();

  const onClickUpdate = useCallback(() => {
    setUpdate(true);
  }, []);

  const onClickCancelUpdate = useCallback(() => {
    setUpdate(false);
  }, []);

  const onClickSubmitUpdate = useCallback(async (content: string) => {
    const newComment: NewCommentsUpdateDto = {
      id: comment.id,
      content,
    };

    const response = await apis.updateComment(newComment);
    if(response.status < 300) {
      router.reload();
    }
  }, [comment, router]);

  const onClickDelete = useCallback(async (commentId: number) => {
    const response = await apis.deleteComment(commentId);
    if(response.status < 300) {
      router.reload();
    }
  }, [router]);

  return (
    <CommentContentWrapper user={comment.users} refs={refs}>
      {!isUpdate ? (
        <CommentContent
          comment={comment}
          onClickReply={onClickReply}
          onClickUpdate={onClickUpdate}
          onClickScrollToReplyFrom={onClickScrollToReplyFrom}
          onClickDelete={onClickDelete}
        />
      ) : (
        <CommentForm
          defaultContent={comment.content}
          replyTo={null}
          submitText='수정하기'
          onClickSubmit={onClickSubmitUpdate}
          buttons={[{ text: '취소하기', onClick: onClickCancelUpdate }]}
        />
      )}
      
    </CommentContentWrapper>
  );
}