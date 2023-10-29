import { PostsDto } from '@/types/post';
import styles from './PostItem.module.css';
import css from '@/utils/css';
import Link from 'next/link';

type PostItemProps = {
  topicId: number;
  chapterId: number;
  post: PostsDto;
  pathPostId: number;
};

export default function PostItem({
  topicId,
  chapterId,
  post,
  pathPostId,
}: PostItemProps) {
  const {id, title, content, status, viewCount, createdAt, modifiedAt,} = post;
  
  return (
    <Link className={css(styles.container, id === pathPostId ? styles.current : '')} href={`/topic/${topicId}/${chapterId}/${id}`}>
      {title}
    </Link>
  );
};