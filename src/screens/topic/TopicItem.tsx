import { TopicsWithCategoriesDto } from '@/types/topic';
import styles from './TopicItem.module.css';
import { apis } from '@/utils/api';
import { useRouter } from 'next/router';

type TopicItemProps = {
  topic: TopicsWithCategoriesDto;
};

export default function TopicItem({
  topic,
}: TopicItemProps) {
  const router = useRouter();

  const { id, name, description } = topic;

  const onClickTopicItem = () => {
    router.push(`/topic/${id}`);
  };

  return (
    <div className={styles.container} onClick={onClickTopicItem}>
      <section className={styles.content}>
        <h3 className={styles['topic-name']}>
          {name}
        </h3>
        <div className={styles['topic-description']}>
          {description}
        </div>
      </section>
    </div>
  );
};