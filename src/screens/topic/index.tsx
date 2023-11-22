import { TopicsProps } from '@/pages/topic';
import CategoryItem from './CategoryItem';
import styles from './Topics.module.css';
import { Fragment, useCallback, useEffect, useState } from 'react';
import useAppSelector from '@/hooks/useAppSelector';
import { selectSelfUser } from '@/redux/slices/AuthSlice';
import { apis } from '@/utils/api';

export default function TopicsScreen({
  categoriesWithTopics,
}: TopicsProps) {
  const selfUser = useAppSelector(selectSelfUser);

  const [subscribedTopics, setSubscribedTopics] = useState<number[] | undefined>(undefined);

  const getSubscribedTopicIds = useCallback(async () => {
    const response = await apis.getSubscribedTopicIds();
    if(response.status < 300) {
      setSubscribedTopics(response.data.map(topic => topic.id));
    }
  }, [selfUser]);

  useEffect(() => {
    if(selfUser) {
      getSubscribedTopicIds();
    } else {
      setSubscribedTopics(undefined);
    }
  }, [selfUser]);

  const onClickSubscribe = async (topicId: number) => {
    const response = await apis.subscribeTopic(topicId);
    if(response.status < 300) {
      const subscribeResult = response.data.subscribed;
      if(subscribeResult) {
        setSubscribedTopics([...subscribedTopics!, topicId]);
      } else {
        setSubscribedTopics(subscribedTopics!.filter(tid => tid !== topicId));
      }
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.description}>
        원하시는 토픽을 선택해주세요.
      </h1>
      <div className={styles.content}>
        {categoriesWithTopics.map(c => {
          if(c.topics.length === 0) return (<Fragment key={c.id}></Fragment>);
          else return (<CategoryItem key={c.id} name={c.name} topics={c.topics} subscribedTopics={subscribedTopics} onClickSubscribe={onClickSubscribe} />)
        })}
      </div>
    </main>
  );
};