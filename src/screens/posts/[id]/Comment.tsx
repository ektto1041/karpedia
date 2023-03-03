import styles from './Comment.module.css';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { CommentType } from '@/types/post';

type CommentProps = {
  comment: CommentType,
};

export default function Comment({
  comment,
}: CommentProps) {
  const {name, content} = comment;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {name}
        <button className={styles['delete-button']}>
          <Icon path={mdiClose} size='15px' />
        </button>
      </div>
      <div className={styles.content}>
        {content}
      </div>
    </div>
  );
};