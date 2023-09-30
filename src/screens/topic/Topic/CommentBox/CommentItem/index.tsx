import { CommentsDto, NewCommentsDto } from '@/types/comment';
import CommentAuthorBox from './CommentAuthorBox';
import styles from './CommentItem.module.css';
import NewCommentContent from './NewCommentContent';

type CommentItemProps = {
  isNewComment: boolean;
  onClickCreate: (content: string) => void;
};

export default function CommentItem({
  isNewComment,
  onClickCreate,
}: CommentItemProps) {
  return (
    <div className={styles.container}>
      <CommentAuthorBox />
      <div className={styles['content-container']}>
        {isNewComment ? (
          <NewCommentContent onClickCreate={onClickCreate} />
        ) : (<></>)}
      </div>
    </div>
  );
};