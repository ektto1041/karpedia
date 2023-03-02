import { PostDetailProps } from '@/types/post';
import CommentBox from './CommentBox';
import styles from './PostDetail.module.css';
import ShareButton from './ShareButton';

export default function PostDetailScreen({
  post,
}: PostDetailProps) {
  const {emoji, title, modifiedAt, content, } = post;

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
          {modifiedAt}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.content} >
          {content}
        </div>
        <div className={styles['button-box']}>
          <ShareButton />
        </div>
        <CommentBox />
      </div>
    </div>
  );
};