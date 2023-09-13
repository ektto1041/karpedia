import styles from './PostList.module.css';
import PostItem from './PostItem';
import { PostsDto } from '@/types/post';

type PostListProps = {
  postList: PostsDto[];
  onClickPost: (postId: number) => void;
};

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