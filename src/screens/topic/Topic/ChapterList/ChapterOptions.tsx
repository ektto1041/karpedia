import styles from './ChapterOptions.module.css';
import Icon from '@mdi/react';
import { mdiCog } from '@mdi/js';
import { mdiSort } from '@mdi/js';
import Link from 'next/link';

type ChapterOptionsProps = {
  topicId: number;
};

export default function ChapterOptions({
  topicId,
}: ChapterOptionsProps) {
  return (
    <div className={styles.container}>
      <Link href={`/post/new?tid=${topicId}`}  className={styles.line} >
        <div className={styles.icon}  >
          <Icon path={mdiCog} />
        </div>
        새 포스트 작성하기
      </Link>
      <Link href={`/chapter/sort?tid=${topicId}`}  className={styles.line} >
        <div className={styles.icon}  >
          <Icon path={mdiSort} />
        </div>
        챕터 순서 설정
      </Link>
    </div>
  );
};