import styles from './PostItem.module.css';
import { PostItemType } from '@/types/post';
import Link from 'next/link';

type PostItemProps = {
  postItem: PostItemType,
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
          {modifiedAt}
        </div>
        
        <div className={styles.underline}></div>
      </div>
    </Link>
  );
};