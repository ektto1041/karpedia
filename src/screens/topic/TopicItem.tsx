import { TopicsWithCategoriesDto } from '@/types/topic';
import styles from './TopicItem.module.css';
import Link from 'next/link';

type TopicItemProps = {
  topic: TopicsWithCategoriesDto;
};

export default function TopicItem({
  topic,
}: TopicItemProps) {
  const { id, name, description } = topic;

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
    </Link>
  );
};