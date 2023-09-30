import { CommentsDto, NewCommentsDto } from '@/types/comment';
import CommentAuthorBox from './CommentAuthorBox';
import styles from './CommentItem.module.css';
import NewCommentContent from './NewCommentContent';
import { PublicUsersDto } from '@/types/user';

type CommentItemProps = {
  isNewComment: boolean;
  onClickCreate: (content: string) => void;
  user: PublicUsersDto;
};

export default function CommentItem({
  isNewComment,
  onClickCreate,
  user,
}: CommentItemProps) {
  return (
    <div className={styles.container}>
      <CommentAuthorBox profileImage={user.profileImage} />
      <div className={styles['content-container']}>
        {isNewComment ? (
          <NewCommentContent onClickCreate={onClickCreate} />
        ) : (<></>)}
      </div>
    </div>
  );
};