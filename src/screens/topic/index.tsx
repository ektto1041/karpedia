import CategoryItem from './CategoryItem';
import styles from './Topics.module.css';
import { TopicsProps } from "@/types/topic";

export default function TopicsScreen({
  categoriesWithTopics,
}: TopicsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        원하시는 토픽을 선택해주세요.
      </div>
      <div className={styles.content}>
        {categoriesWithTopics.map(c => {
          if(c.topics.length === 0) return (<></>);
          else return (<CategoryItem key={c.id} name={c.name} topics={c.topics} />)
        })}
      </div>
    </div>
  );
};