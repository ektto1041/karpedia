import { CommentsDto, CommentsWithPublicUsersDto, CommentsWithPublicUsersWithReplyToDto, NewCommentsDto } from '@/types/comment';
import CommentAuthorBox from './CommentAuthorBox';
import styles from './CommentItem.module.css';
import NewCommentContent from './NewCommentContent';
import { PublicUsersDto } from '@/types/user';
import CommentContent from './CommentContent';
import { LegacyRef } from 'react';

type NewCommentProps = {
  onClickCreate: (content: string, replyToId?: number) => void;
  replyTo?: CommentsWithPublicUsersWithReplyToDto;
  onClickCancelReply: () => void;
}

type CommentProps = {
  comment: CommentsWithPublicUsersWithReplyToDto;
  onClickReply: (commentId: number) => void;
  onClickScrollToReplyFrom: (commentId: number) => void;
}

type CommentItemProps = {
  isNewComment?: boolean;
  newCommentProps?: NewCommentProps;
  commentProps?: CommentProps;
  user: PublicUsersDto;
  refs?: LegacyRef<HTMLDivElement>;
}

export default function CommentItem({
  isNewComment,
  newCommentProps,
  commentProps,
  user,
  refs,
}: CommentItemProps) {

  return (
    <div className={styles.container} ref={refs} >
      <CommentAuthorBox profileImage={user.profileImage} />
      <div className={styles['content-container']}>
        {isNewComment ? (
          <NewCommentContent {...newCommentProps!} />
        ) : (
          <CommentContent {...commentProps!} />
        )}
      </div>
    </div>
  );
};