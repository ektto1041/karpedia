import { TopicsWithCategoriesIdDto } from '@/types/topic';
import styles from './TopicItem.module.css';
import Link from 'next/link';
import Icon from '@mdi/react';
import { mdiBookmark, mdiBookmarkOutline } from '@mdi/js';

type TopicItemProps = {
  topic: TopicsWithCategoriesIdDto;
  subscribed?: boolean;
  onClickSubscribe: (topicId: number) => void;
};

export default function TopicItem({
  topic,
  subscribed,
  onClickSubscribe,
}: TopicItemProps) {
  const { id, name, description, categoriesId } = topic;

  return (
    <Link className={styles.container} href={`/topic/${id}`}>
      <section className={styles.content}>
        <h3 className={styles['topic-name']}>
          {name}
        </h3>
        <div className={styles['topic-description']}>
          {description}
        </div>
      </section>
      {subscribed !== undefined && (
        <button className={styles.subscribe} onClick={(e) => {e.preventDefault(); onClickSubscribe(id);}}>
          <Icon path={subscribed ? mdiBookmark : mdiBookmarkOutline} />
        </button>
      )}
    </Link>
  );
};