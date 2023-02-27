import MainInput from '@/components/MainInput';
import TopicList from '@/screens/posts/TopicList';
import styles from './Posts.module.css';
import { PostsProps } from '@/types/post';
import PostList from './PostList';
import { useState } from 'react';

export default function PostsScreen({
  topics,
  postItems,
}: PostsProps) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  // 페이지에 보여지는 포스트들
  // 검색 키워드가 타이틀에 포함되는 지 검사하고,
  // 현재 선택된 토픽들을 AND 연산으로 검사해 모두 가진 경우만 페이지에 보여줌
  const visiblePostItems = postItems.filter(postItem => {
    const isSearching = Boolean(keyword.trim());
    if(isSearching) {
      const hasKeyword = Boolean(postItem.title.includes(keyword));
      if(!hasKeyword) return false;
    }
    
    for(const topic of selectedTopics) {
      const hasTopic = Boolean(postItem.topics.includes(topic));
      if(!hasTopic) { return false; }
    }

    return true;
  });

  const onClickTopic = (topicName: string) => {
    const hasTopic = Boolean(selectedTopics.includes(topicName));
    if(hasTopic) {
      setSelectedTopics(selectedTopics.filter(topic => topic !== topicName));
    } else {
      setSelectedTopics([...selectedTopics, topicName]);
    }
  }

  const handleClickCancelTopic = () => {
    setSelectedTopics([]);
  };

  const handleSearch = (newKeyword: string) => {
    setKeyword(newKeyword);
  }

  return (
    <div className={styles.container}>
      <div className={styles['topic-box']}>
        <div className={styles.title}>
          Topics
          <button onClick={handleClickCancelTopic}>모두 취소</button>
        </div>
        <div className={styles.content}>
          <TopicList topics={topics} selectedTopics={selectedTopics} onClickTopic={onClickTopic} />
        </div>
      </div>
      <MainInput placeholder='검색어를 입력하세요.' onSubmit={handleSearch} />
      <div className={styles['post-item-box']}>
        <PostList postItems={visiblePostItems} />
      </div>
    </div>
  );
};