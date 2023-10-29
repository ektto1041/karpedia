import styles from './ChapterList.module.css';
import ChapterItem from './ChapterItem';
import ChapterOptions from './ChapterOptions';
import { ChaptersWithPostsDto } from '@/types/chapter';

export type ChapterListProps = {
  chapterList: ChaptersWithPostsDto[];
  isOwner: boolean;
  topicId: number;
  chapterId: number;
  postId: number;
  updateHref: string;
};

export default function ChapterList({
  chapterList,
  isOwner,
  topicId,
  chapterId,
  postId,
  updateHref,
}: ChapterListProps) {
  return (
    <nav className={styles.container} >
      {chapterList?.map(chapter => (
        <ChapterItem
          key={chapter.id}
          topicId={topicId}
          chapter={chapter}
          pathChapterId={chapterId}
          pathPostId={postId}
        />
      ))}
      {isOwner && (<ChapterOptions topicId={topicId} updateHref={updateHref} />)}
    </nav>
  );
};