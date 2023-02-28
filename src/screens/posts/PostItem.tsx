import styles from './PostItem.module.css';
import { PostItemType } from '@/types/post';

type PostItemProps = {
  postItem: PostItemType,
}

export default function PostItem({
  postItem,
} : PostItemProps) {
  const {emoji, title, modifiedAt} = postItem;

  return (
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
  );
};