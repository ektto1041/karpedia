import styles from './Reply.module.css';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

export default function Reply() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        박상연
      </div>
      <div className={styles.content}>
        감사합니다.
      </div>
    </div>
  );
};