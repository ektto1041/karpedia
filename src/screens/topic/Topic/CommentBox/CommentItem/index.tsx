import { CommentsDto, CommentsWithPublicUsersDto, NewCommentsDto } from '@/types/comment';
import CommentAuthorBox from './CommentAuthorBox';
import styles from './CommentItem.module.css';
import NewCommentContent from './NewCommentContent';
import { PublicUsersDto } from '@/types/user';
import CommentContent from './CommentContent';

type CommentItemProps = {
  isNewComment?: boolean;
  onClickCreate?: (content: string) => void;
  comment?: CommentsDto;
  user: PublicUsersDto;
};

export default function CommentItem({
  isNewComment,
  onClickCreate,
  comment,
  user,
}: CommentItemProps) {

  return (
    <div className={styles.container}>
      <CommentAuthorBox profileImage={user.profileImage} />
      <div className={styles['content-container']}>
        {isNewComment ? (
          <NewCommentContent onClickCreate={onClickCreate!} />
        ) : (
          <CommentContent defaultContent={comment!.content} modifiedAt={comment!.modifiedAt} userName={user.name} />
        )}
      </div>
    </div>
  );
};