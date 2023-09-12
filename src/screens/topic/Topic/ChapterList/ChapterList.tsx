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
  topicId: number;
};

export default function ChapterList({
  chapterList,
  onClickChapter,
  onClickPost,
  isOwner,
  topicId,
}: ChapterListProps) {
  return (
    <div className={styles.container} >
      {chapterList?.map(chapter => (
        <ChapterItem key={chapter.id} chapter={chapter} onClickChapter={onClickChapter} onClickPost={onClickPost}/>
      ))}
      {isOwner && (<ChapterOptions topicId={topicId} />)}
    </div>
  );
};