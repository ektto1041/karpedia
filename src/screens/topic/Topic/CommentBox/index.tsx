import { CommentsDto, NewCommentsDto } from '@/types/comment';
import styles from './CommentBox.module.css';
import CommentItem from './CommentItem';

type CommentBoxProps = {
  onClickCreateComment: (content: string) => void;
};

export default function CommentBox({
  onClickCreateComment,
}: CommentBoxProps) {
  return (
    <div className={styles.container}>
      <CommentItem isNewComment onClickCreate={onClickCreateComment} />
    </div>
  );
};