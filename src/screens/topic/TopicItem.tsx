import { TopicItemProps } from '@/types/topic';
import styles from './TopicItem.module.css';
import { apis } from '@/utils/api';
import { useRouter } from 'next/router';

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
      <div className={styles.content}>
        <div className={styles['topic-name']}>
          {name}
        </div>
        <div className={styles['topic-description']}>
          {description}
        </div>
      </div>
    </div>
  );
};