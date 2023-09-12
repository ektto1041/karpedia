import styles from './ContentBox.module.css';
import MyEditor from '@/components/MyEditor';

type ContentBoxProps = {
  content: string,
};

export default function ContentBox({
  content,
}: ContentBoxProps) {
  return (
    <div className={styles.container} >
      <div className={styles.hidden}>{content}</div>
      <MyEditor editable={false} defaultContent={content} onChangeContent={() => {}} />
    </div>
  )
};