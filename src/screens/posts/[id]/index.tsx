import { PostDetailProps } from '@/types/post';
import time from '@/utils/time';
import CommentBox from './CommentBox';
import styles from './PostDetail.module.css';
import ShareButton from './ShareButton';

export default function PostDetailScreen({
  post,
  commentList,
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
          {time.toFormat(modifiedAt)}
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.content} >
          {content}
        </div>
        <div className={styles['button-box']}>
          <ShareButton />
        </div>
        <CommentBox commentList={commentList} />
      </div>
    </div>
  );
};