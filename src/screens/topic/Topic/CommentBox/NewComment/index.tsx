import { useSelector } from 'react-redux';
import styles from './NewComment.module.css';
import { RootState } from '@/redux/store';
import { selectSelfUser } from '@/redux/slices/AuthSlice';
import CommentContentWrapper from '../CommentContentWrapper';
import CommentForm from '../CommentForm';
import { CommentsWithPublicUsersDto } from '@/types/comment';
import { LegacyRef } from 'react';

type NewCommentProps = {
  replyTo?: CommentsWithPublicUsersDto;
  onClickCancelReply: () => void;
  onClickCreateComment: (comment: string) => void;
  refs: LegacyRef<HTMLDivElement>;
}

export default function NewComment({
  replyTo,
  onClickCancelReply,
  onClickCreateComment,
  refs,
}: NewCommentProps) {
  const selfUser = useSelector((state: RootState) => selectSelfUser(state))!;
  
  return (
    <CommentContentWrapper user={selfUser} refs={refs}>
      <CommentForm
        replyTo={replyTo}
        onClickCancelReply={onClickCancelReply}
        submitText='작성하기'
        onClickSubmit={onClickCreateComment}
      />
    </CommentContentWrapper>
  );
}