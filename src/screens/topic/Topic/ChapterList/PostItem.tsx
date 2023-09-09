import { PostItemProps } from '@/types/post';
import styles from './PostItem.module.css';

export default function PostItem({
  post,
  onClickPost,
}: PostItemProps) {
  const {id, title, content, status, viewCount, createdAt, modifiedAt,} = post;
  
  return (
    <div className={styles.container} onClick={() => onClickPost(id)}>
      {title}
    </div>
  );
};