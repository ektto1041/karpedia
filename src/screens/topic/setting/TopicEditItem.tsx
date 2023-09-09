import { TopicsWithCategoriesDto } from '@/types/topic';
import styles from './TopicEditItem.module.css';
import EditBox from './EditBox';

type TopicEditItemProps = {
  topic: TopicsWithCategoriesDto;
};

export default function TopicEditItem({
  topic,
}: TopicEditItemProps) {
  const {name, description} = topic

  return (
    <div className={styles.container}>
      <input type='text' className={styles['topic-name']} defaultValue={name} />
      <input type='text' className={styles['topic-description']} defaultValue={description} />
      {/* <EditBox /> */}
    </div>
  );
};