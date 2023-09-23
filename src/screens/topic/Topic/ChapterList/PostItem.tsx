import { PostsDto } from '@/types/post';
import styles from './PostItem.module.css';
import css from '@/utils/css';

type PostItemProps = {
  post: PostsDto;
  pathPostId: number;
  onClickPost: (postId: number) => void;
};

export default function PostItem({
  post,
  pathPostId,
  onClickPost,
}: PostItemProps) {
  const {id, title, content, status, viewCount, createdAt, modifiedAt,} = post;
  
  return (
    <div className={css(styles.container, id === pathPostId ? styles.current : '')} onClick={() => onClickPost(id)}>
      {title}
    </div>
  );
};