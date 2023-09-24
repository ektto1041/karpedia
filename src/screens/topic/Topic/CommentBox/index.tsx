import styles from './CommentBox.module.css';
import CommentItem from './CommentItem';

export default function CommentBox() {
  return (
    <div className={styles.container}>
      <CommentItem isNewComment />
    </div>
  );
};