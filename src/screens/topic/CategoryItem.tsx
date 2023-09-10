import { CategoryItemProps } from '@/types/topic';
import styles from './CategoryItem.module.css';
import TopicItem from './TopicItem';

export default function CategoryItem({
  name,
  topics,
}: CategoryItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles['category-name']}>
        {name}
      </div>
      <div className={styles.content}>
        {topics.map(t => (
          <TopicItem key={t.id} topic={t}/>
        ))}
      </div>
    </div>
  )
}