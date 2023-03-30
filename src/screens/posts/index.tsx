import MainInput from '@/components/MainInput';
import TopicList from '@/screens/posts/TopicList';
import styles from './Posts.module.css';
import { PostsProps } from '@/types/post';
import PostList from './PostList';
import Paging from './Paging';
import { useRouter } from 'next/router';

export default function PostsScreen({
  topics,
  postItems,
}: PostsProps) {
  const router = useRouter();
  const qTopics = router.query.topics ? (router.query.topics as string).split(',') : [];

  const handleClickTopic = (topicName: string) => {
    const newQuery = {...router.query};

    const hasTopic = qTopics.includes(topicName);
    if(hasTopic) {
      if(qTopics.length === 1) delete newQuery.topics;
      else newQuery.topics = qTopics.filter(topic => topic != topicName).join(',');
      router.push({
        pathname: '/posts',
        query: newQuery,
      });
    } else {
      newQuery.topics = [...qTopics, topicName].join(',');

      router.push({
        pathname: '/posts',
        query: newQuery,
      });
    }
  };

  const handleClickCancelTopic = () => {
    const newQuery = {...router.query};
    if(newQuery.topics) delete newQuery.topics;

    router.push({
      pathname: '/posts',
      query: newQuery,
    });
  };

  const handleSearch = (newKeyword: string) => {
    const newQuery = {...router.query};
    if(newKeyword) {
      newQuery.keyword = newKeyword;
    } else {
      if(newQuery.keyword) delete newQuery.keyword;
    }

    router.push({
      pathname: '/posts',
      query: newQuery,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles['topic-box']}>
        <div className={styles.title}>
          Topics
          <button onClick={handleClickCancelTopic}>모두 취소</button>
        </div>
        <div className={styles.content}>
          <TopicList topics={topics} selectedTopics={qTopics} onClickTopic={handleClickTopic} />
        </div>
      </div>
      <MainInput placeholder='검색어를 입력하세요.' onSubmit={handleSearch} />
      <div className={styles['post-item-box']}>
        <PostList postItems={postItems} />
      </div>
      <Paging />
    </div>
  );
};