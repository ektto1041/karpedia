import { CommentsDto, NewCommentsDto } from '@/types/comment';
import styles from './CommentBox.module.css';
import CommentItem from './CommentItem';
import { PublicUsersDto } from '@/types/user';

type CommentBoxProps = {
  onClickCreateComment: (content: string) => void;
  viewer: PublicUsersDto;
};

export default function CommentBox({
  onClickCreateComment,
  viewer,
}: CommentBoxProps) {
  return (
    <div className={styles.container}>
      <CommentItem isNewComment onClickCreate={onClickCreateComment} user={viewer} />
    </div>
  );
};