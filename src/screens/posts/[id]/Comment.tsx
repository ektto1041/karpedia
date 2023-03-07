import styles from './Comment.module.css';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { CommentType } from '@/types/post';
import { MouseEventHandler, useCallback } from 'react';

type CommentProps = {
  comment: CommentType,
  onClickDeleteButton: (id: string, password: string) => void,
};

export default function Comment({
  comment,
  onClickDeleteButton,
}: CommentProps) {
  const {id, name, password, content} = comment;

  const handleClickDeleteButton: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    onClickDeleteButton(id, password);
  }, [onClickDeleteButton]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {name}
        <button
          className={styles['delete-button']}
          onClick={handleClickDeleteButton}
        >
          <Icon path={mdiClose} size='15px' />
        </button>
      </div>
      <div className={styles.content}>
        {content}
      </div>
    </div>
  );
};