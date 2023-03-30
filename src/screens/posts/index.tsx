import MainInput from '@/components/MainInput';
import TopicList from '@/screens/posts/TopicList';
import styles from './Posts.module.css';
import { PostsProps } from '@/types/post';
import PostList from './PostList';
import Paging from './Paging';
import { useRouter } from 'next/router';

export default function PostsScreen({
  topics,
  selectedTopics,
  postItems,
  page,
  maxPage,
}: PostsProps) {
  const router = useRouter();

  const handleClickTopic = (topicName: string) => {
    const newQuery = {...router.query};
    delete newQuery.page;

    const hasTopic = selectedTopics.includes(topicName);
    if(hasTopic) {
      if(selectedTopics.length === 1) delete newQuery.topics;
      else newQuery.topics = selectedTopics.filter(topic => topic != topicName).join(',');
      router.push({
        pathname: '/posts',
        query: newQuery,
      });
    } else {
      newQuery.topics = [...selectedTopics, topicName].join(',');

      router.push({
        pathname: '/posts',
        query: newQuery,
      });
    }
  };

  const handleClickCancelTopic = () => {
    const newQuery = {...router.query};
    if(newQuery.topics) delete newQuery.topics;
    delete newQuery.page;

    router.push({
      pathname: '/posts',
      query: newQuery,
    });
  };

  const handleSearch = (newKeyword: string) => {
    const newQuery = {...router.query};
    delete newQuery.page;

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

  const handleClickPage = (page: string) => {
    const newQuery = {...router.query};

    if(page === '<<') {

    } else if(page === '>>') {

    } else {
      newQuery.page = page;
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
          <TopicList topics={topics} selectedTopics={selectedTopics} onClickTopic={handleClickTopic} />
        </div>
      </div>
      <MainInput placeholder='검색어를 입력하세요.' onSubmit={handleSearch} />
      <div className={styles['post-item-box']}>
        <PostList postItems={postItems} />
      </div>
      {maxPage > -1 ? (<Paging page={page} maxPage={maxPage} onClickPage={handleClickPage} />) : (<></>)}
    </div>
  );
};