import { ChaptersWithPostsDto } from '@/types/chapter';
import styles from './ChapterItem.module.css';
import PostList from './PostList';
import css from '@/utils/css';
import { useMemo } from 'react';

type ChapterItemProps = {
  chapter: ChaptersWithPostsDto;
  pathChapterId: number;
  pathPostId: number;
  onClickChapter: (chapterId: number) => void;
  onClickPost: (postId: number) => void;
};

export default function ChapterItem({
  chapter,
  pathChapterId,
  pathPostId,
  onClickChapter,
  onClickPost,
}: ChapterItemProps) {
  const {id, title, content, postsList} = chapter;
  const isCurrent = useMemo(() => {
    return pathPostId === -1 && (id === pathChapterId);
  }, [id, pathPostId, pathChapterId]);

  return (
    <div className={styles.container}>
      <div className={css(styles.title, isCurrent ? styles.current : '')} onClick={() => {onClickChapter(id)}}>
        {title}
      </div>
      <PostList postList={postsList} pathPostId={pathPostId} onClickPost={onClickPost} />
    </div>
  );
};