import { ChaptersWithPostsDto } from '@/types/chapter';
import styles from './ChapterItem.module.css';
import PostList from './PostList';
import css from '@/utils/css';
import { useMemo } from 'react';
import Link from 'next/link';

type ChapterItemProps = {
  topicId: number;
  chapter: ChaptersWithPostsDto;
  pathChapterId: number;
  pathPostId: number;
};

export default function ChapterItem({
  topicId,
  chapter,
  pathChapterId,
  pathPostId,
}: ChapterItemProps) {
  const {id, title, content, postsList} = chapter;
  const isCurrent = useMemo(() => {
    return pathPostId === -1 && (id === pathChapterId);
  }, [id, pathPostId, pathChapterId]);

  return (
    <div className={styles.container}>
      <Link className={css(styles.title, isCurrent ? styles.current : '')} href={`/topic/${topicId}/${id}`}>
        {title}
      </Link>
      <PostList topicId={topicId} chapterId={id} postList={postsList} pathPostId={pathPostId} />
    </div>
  );
};