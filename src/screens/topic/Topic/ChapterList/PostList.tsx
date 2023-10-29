import styles from './PostList.module.css';
import PostItem from './PostItem';
import { PostsDto } from '@/types/post';

type PostListProps = {
  topicId: number;
  chapterId: number;
  postList: PostsDto[];
  pathPostId: number;
};

export default function PostList({
  topicId,
  chapterId,
  postList,
  pathPostId,
}: PostListProps) {
  return (
    <div className={styles.container}>
      {postList?.map(post => (
        <PostItem key={post.id} topicId={topicId} chapterId={chapterId} post={post} pathPostId={pathPostId} />
      ))}
    </div>
  );
};