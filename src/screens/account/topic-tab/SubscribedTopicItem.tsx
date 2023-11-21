import { TopicsDto, TopicsWithCategoriesNameDto } from '@/types/topic';
import styles from './SubscribedTopicItem.module.css';
import Icon from '@mdi/react';
import { mdiCancel } from '@mdi/js';
import Link from 'next/link';

type SubscribedTopicItemProps = {
  topic: TopicsWithCategoriesNameDto;
};

export default function SubscribedTopicItem({
  topic,
}: SubscribedTopicItemProps) {
  const {id, name, description, orders, categoriesName} = topic;

  const href = `/topic/${id}`

  return (
    <Link className={styles.container} href={href}>
      <div className={styles.category}>{categoriesName}</div>
      <div className={styles.topic}>{name}</div>
      <div className={styles.floating}>
        <button>
          <Icon path={mdiCancel} />
        </button>
      </div>
    </Link>
  );
}