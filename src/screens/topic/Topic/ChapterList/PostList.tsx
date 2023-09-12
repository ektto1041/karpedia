import { PostListProps } from '@/types/post';
import styles from './PostList.module.css';
import PostItem from './PostItem';

export default function PostList({
  postList,
  onClickPost,
}: PostListProps) {

  return (
    <div className={styles.container}>
      {postList?.map(post => (
        <PostItem key={post.id} post={post} onClickPost={onClickPost} />
      ))}
    </div>
  );
};