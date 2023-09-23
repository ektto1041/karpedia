import styles from './PostList.module.css';
import PostItem from './PostItem';
import { PostsDto } from '@/types/post';

type PostListProps = {
  postList: PostsDto[];
  pathPostId: number;
  onClickPost: (postId: number) => void;
};

export default function PostList({
  postList,
  pathPostId,
  onClickPost,
}: PostListProps) {

  return (
    <div className={styles.container}>
      {postList?.map(post => (
        <PostItem key={post.id} post={post} pathPostId={pathPostId} onClickPost={onClickPost} />
      ))}
    </div>
  );
};