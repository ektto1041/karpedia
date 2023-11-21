import { TopicsDto, TopicsWithCategoriesNameDto } from '@/types/topic';
import styles from './SubscribedTopicItem.module.css';
import Icon from '@mdi/react';
import { mdiCancel } from '@mdi/js';

type SubscribedTopicItemProps = {
  topic: TopicsWithCategoriesNameDto;
};

export default function SubscribedTopicItem({
  topic,
}: SubscribedTopicItemProps) {
  const {id, name, description, orders, categoriesName} = topic;

  return (
    <div className={styles.container}>
      <div className={styles.category}>{categoriesName}</div>
      <div className={styles.topic}>{name}</div>
      <div className={styles.floating}>
        <button>
          <Icon path={mdiCancel} />
        </button>
      </div>
    </div>
  );
}