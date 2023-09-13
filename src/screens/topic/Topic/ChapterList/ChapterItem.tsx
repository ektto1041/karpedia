import { ChaptersWithPostsDto } from '@/types/chapter';
import styles from './ChapterItem.module.css';
import PostList from './PostList';

type ChapterItemProps = {
  chapter: ChaptersWithPostsDto;
  onClickChapter: (chapterId: number) => void;
  onClickPost: (postId: number) => void;
};

export default function ChapterItem({
  chapter,
  onClickChapter,
  onClickPost,
}: ChapterItemProps) {
  const {id, title, content, postsList} = chapter;

  return (
    <div className={styles.container}>
      <div className={styles.title} onClick={() => {onClickChapter(id)}}>
        {title}
      </div>
      <PostList postList={postsList} onClickPost={onClickPost} />
    </div>
  );
};