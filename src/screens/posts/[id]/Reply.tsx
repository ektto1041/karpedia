import styles from './Reply.module.css';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

type ReplyProps = {
  content: string,
};

export default function Reply({
  content,
}: ReplyProps) {
  // TODO 운영자 닉네임 관리
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        박상연
      </div>
      <div className={styles.content}>
        {content}
      </div>
    </div>
  );
};