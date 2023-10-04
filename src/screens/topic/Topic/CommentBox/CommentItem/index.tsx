import { CommentsWithPublicUsersWithReplyToDto } from '@/types/comment';
import CommentContentWrapper from '../CommentContentWrapper';
import styles from './CommentItem.module.css';
import CommentContent from './CommentContent';
import { LegacyRef, useCallback, useState } from 'react';
import CommentForm from '../CommentForm';

type CommentItemProps = {
  comment: CommentsWithPublicUsersWithReplyToDto;
  onClickReply: (commentId: number) => void;
  onClickScrollToReplyFrom: (commentId: number) => void;
  refs: LegacyRef<HTMLDivElement>;
}

export default function CommentItem_({
  comment,
  onClickReply,
  onClickScrollToReplyFrom,
  refs,
}: CommentItemProps) {
  const [isUpdate, setUpdate] = useState(false);

  const onClickUpdate = useCallback(() => {
    setUpdate(true);
  }, []);

  const onClickCancelUpdate = useCallback(() => {
    setUpdate(false);
  }, []);

  return (
    <CommentContentWrapper user={comment.users} refs={refs}>
      {!isUpdate ? (
        <CommentContent
          comment={comment}
          onClickReply={onClickReply}
          onClickUpdate={onClickUpdate}
          onClickScrollToReplyFrom={onClickScrollToReplyFrom}
        />
      ) : (
        <CommentForm
          defaultContent={comment.content}
          submitText='수정하기'
          onClickSubmit={() => {}}
          buttons={[{ text: '취소하기', onClick: onClickCancelUpdate }]}
        />
      )}
      
    </CommentContentWrapper>
  );
}