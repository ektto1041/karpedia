import styles from './ChapterOptions.module.css';
import Icon from '@mdi/react';
import { mdiCog } from '@mdi/js';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Link from 'next/link';

export default function ChapterOptions() {
  return (
    <Link href={'/post/new'} className={styles.container}>
      <div className={styles.icon}  >
        <Icon path={mdiCog} />
      </div>
      새 포스트 작성하기
    </Link>
  );
};