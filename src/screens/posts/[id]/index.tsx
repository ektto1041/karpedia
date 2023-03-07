import { PostDetailProps } from '@/types/post';
import time from '@/utils/time';
import CommentBox from './CommentBox';
import ContentBox from './ContentBox';
import styles from './PostDetail.module.css';
import ShareButton from './ShareButton';

export default function PostDetailScreen({
  post,
}: PostDetailProps) {
  const {id, emoji, title, modifiedAt, content, } = post;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles['emoji-box']}>
          {emoji}
        </div>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.subtitle} >
          {time.toFormat(modifiedAt)}
        </div>
      </div>
      <div className={styles.body}>
        <ContentBox content={content} />
        <div className={styles['button-box']}>
          <ShareButton />
        </div>
        <CommentBox postId={id} />
      </div>
    </div>
  );
};