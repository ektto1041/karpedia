import { CommentsByUsersDto } from '@/types/comment';
import styles from './CommentTabItem.module.css';
import time from '@/utils/time';
import Icon from '@mdi/react';
import { mdiDeleteOutline } from '@mdi/js';

type CommentTabItemProps = {
  comment: CommentsByUsersDto;
}

export default function CommentTabItem({
  comment,
}: CommentTabItemProps) {
  const {id, content, modifiedAt, postTitle, replyTo} = comment;

  return (
    <div className={styles.container}>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content}} />
      <div className={styles.floating}>
        <button>
          <Icon path={mdiDeleteOutline} />
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles['post-title']}>
          "{postTitle}" 에서 작성한 댓글입니다.
        </div>
        <div className={styles.date}>
          {time.toFormat(time.toString(modifiedAt))}
        </div>
      </div>
    </div>
  );
}