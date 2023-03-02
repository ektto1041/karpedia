import styles from './Comment.module.css';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

export default function Comment() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        JS초보
        <button className={styles['delete-button']}>
          <Icon path={mdiClose} size='15px' />
        </button>
      </div>
      <div className={styles.content}>
        아주 유용한 글입니다.
      </div>
    </div>
  );
};