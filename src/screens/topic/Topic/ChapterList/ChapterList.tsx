import { ChaptersWithPostsDto } from '@/types/topic';
import styles from './ChapterList.module.css';
import ChapterItem from './ChapterItem';
import { useRouter } from 'next/router';
import ChapterOptions from './ChapterOptions';


export type ChapterListProps = {
  chapterList: ChaptersWithPostsDto[];
  onClickChapter: (chapterId: number) => void;
  onClickPost: (postId: number) => void;
  isOwner: boolean;
};

export default function ChapterList({
  chapterList,
  onClickChapter,
  onClickPost,
  isOwner,
}: ChapterListProps) {
  return (
    <div className={styles.container} >
      {chapterList?.map(chapter => (
        <ChapterItem chapter={chapter} onClickChapter={onClickChapter} onClickPost={onClickPost}/>
      ))}
      {isOwner && (<ChapterOptions />)}
    </div>
  );
};