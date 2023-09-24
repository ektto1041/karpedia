import CommentEditor from '@/components/CommentEditor';
import styles from './NewCommentContent.module.css';

export default function NewCommentContent() {
  return (
    <div className={styles.container}>
      <CommentEditor onChangeContent={() => {}} defaultContent='<p></p>' editable />
      <div className={styles['button-box']}>
        <div className={styles.button}>
          작성하기
        </div>
      </div>
    </div>
  );
};