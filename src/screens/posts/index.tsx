import MainInput from '@/components/MainInput';
import TopicList from '@/screens/posts/TopicList';
import styles from './Posts.module.css';
import { PostsProps } from '@/types/post';
import PostList from './PostList';

export default function PostsScreen({
  topics,
  postItems,
}: PostsProps) {
  return (
    <div className={styles.container}>
      <div className={styles['topic-box']}>
        <div className={styles.title}>
          Topics
          <button>모두 취소</button>
        </div>
        <div className={styles.content}>
          <TopicList topics={topics} />
        </div>
      </div>
      <MainInput placeholder='검색어를 입력하세요.' />
      <div className={styles['post-item-box']}>
        <PostList postItems={postItems} />
      </div>
    </div>
  );
};