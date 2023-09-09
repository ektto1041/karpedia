import { ChapterListProps } from '@/types/topic';
import styles from './ChapterList.module.css';
import ChapterItem from './ChapterItem';
import { useRouter } from 'next/router';

export default function ChapterList({
  chapterList,
  onClickChapter,
  onClickPost,
}: ChapterListProps) {
  return (
    <div className={styles.container} >
      {chapterList?.map(chapter => (
        <ChapterItem chapter={chapter} onClickChapter={onClickChapter} onClickPost={onClickPost}/>
      ))}
    </div>
  );
};