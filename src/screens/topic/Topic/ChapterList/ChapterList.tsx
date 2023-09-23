import styles from './ChapterList.module.css';
import ChapterItem from './ChapterItem';
import ChapterOptions from './ChapterOptions';
import { ChaptersWithPostsDto } from '@/types/chapter';

export type ChapterListProps = {
  chapterList: ChaptersWithPostsDto[];
  onClickChapter: (chapterId: number) => void;
  onClickPost: (postId: number) => void;
  isOwner: boolean;
  topicId: number;
  chapterId: number;
  postId: number;
  updateHref: string;
};

export default function ChapterList({
  chapterList,
  onClickChapter,
  onClickPost,
  isOwner,
  topicId,
  chapterId,
  postId,
  updateHref,
}: ChapterListProps) {
  return (
    <div className={styles.container} >
      {chapterList?.map(chapter => (
        <ChapterItem
          key={chapter.id}
          chapter={chapter}
          pathChapterId={chapterId}
          pathPostId={postId}
          onClickChapter={onClickChapter}
          onClickPost={onClickPost}
        />
      ))}
      {isOwner && (<ChapterOptions topicId={topicId} updateHref={updateHref} />)}
    </div>
  );
};