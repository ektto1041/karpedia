import styles from './PostItem.module.css';
import { PostItemDto } from '@/types/post';
import time from '@/utils/time';
import Link from 'next/link';

type PostItemProps = {
  postItem: PostItemDto,
}

export default function PostItem({
  postItem,
} : PostItemProps) {
  const {id, emoji, title, modifiedAt} = postItem;

  return (
    <Link href={`/posts/${id}`}>
      <div className={styles.container}>
        <div className={styles.emoji}>
          {emoji}
        </div>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles['created-at']}>
          {time.toFormat(modifiedAt)}
        </div>
        
        <div className={styles.underline}></div>
      </div>
    </Link>
  );
};