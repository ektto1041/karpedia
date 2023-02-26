import styles from './PostItem.module.css';
import dayjs, { Dayjs } from 'dayjs';

type PostItemProps = {
  emoji: string,
  title: string,
  createdAt: Dayjs,
}

export default function PostItem({
  emoji,
  title,
  createdAt,
} : PostItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.emoji}>
        {emoji}
      </div>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles['created-at']}>
        {createdAt.format('MMMM D, YYYY')}
      </div>
      
      <div className={styles.underline}></div>
    </div>
  );
};