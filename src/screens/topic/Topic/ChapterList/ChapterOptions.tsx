import styles from './ChapterOptions.module.css';
import Icon from '@mdi/react';
import { mdiCog } from '@mdi/js';
import Link from 'next/link';

type ChapterOptionsProps = {
  topicId: number;
};

export default function ChapterOptions({
  topicId,
}: ChapterOptionsProps) {
  return (
    <Link href={`/post/new?tid=${topicId}`} className={styles.container}>
      <div className={styles.icon}  >
        <Icon path={mdiCog} />
      </div>
      새 포스트 작성하기
    </Link>
  );
};