import { ContentProps } from '@/types/post';
import styles from './Content.module.css';
import MyEditor from '@/components/MyEditor';

export default function Content({
  post,
}: ContentProps) {
  const {title} = post;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <MyEditor editable={false} defaultContent={post.content} onChangeContent={() => {}} />
    </div>
  );
};