import { CommentsDto, CommentsWithPublicUsersDto, NewCommentsDto } from '@/types/comment';
import CommentAuthorBox from './CommentAuthorBox';
import styles from './CommentItem.module.css';
import NewCommentContent from './NewCommentContent';
import { PublicUsersDto } from '@/types/user';
import CommentContent from './CommentContent';
import { LegacyRef } from 'react';

type NewCommentProps = {
  onClickCreate: (content: string, replyToId?: number) => void;
  replyTo?: CommentsWithPublicUsersDto;
  onClickCancelReply: () => void;
}

type CommentProps = {
  comment: CommentsDto;
  onClickReply: (commentId: number) => void;
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
          <CommentContent {...commentProps!} userName={user.name} />
        )}
      </div>
    </div>
  );
};