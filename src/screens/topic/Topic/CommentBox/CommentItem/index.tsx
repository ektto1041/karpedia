import CommentAuthorBox from './CommentAuthorBox';
import styles from './CommentItem.module.css';
import NewCommentContent from './NewCommentContent';

type CommentItemProps = {
  isNewComment: boolean;
};

export default function CommentItem({
  isNewComment,
}: CommentItemProps) {
  return (
    <div className={styles.container}>
      <CommentAuthorBox />
      <div className={styles['content-container']}>
        {isNewComment ? (
          <NewCommentContent />
        ) : (<></>)}
      </div>
    </div>
  );
};