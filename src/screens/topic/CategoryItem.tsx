import { TopicsWithCategoriesDto } from '@/types/topic';
import styles from './CategoryItem.module.css';
import TopicItem from './TopicItem';
import { Http2ServerRequest } from 'http2';

type CategoryItemProps = {
  name: string;
  topics: TopicsWithCategoriesDto[];
  subscribedTopics?: number[];
  onClickSubscribe: (topicId: number) => void;
}

export default function CategoryItem({
  name,
  topics,
  subscribedTopics,
  onClickSubscribe,
}: CategoryItemProps) {
  return (
    <section className={styles.container}>
      <h2 className={styles['category-name']}>
        {name}
      </h2>
      <div className={styles.content}>
        {topics.map(t => (
          <TopicItem key={t.id} topic={t} subscribed={subscribedTopics ? subscribedTopics.indexOf(t.id) !== -1 : undefined} onClickSubscribe={onClickSubscribe}/>
        ))}
      </div>
    </section>
  )
}