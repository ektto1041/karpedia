import MainInput from '@/components/MainInput';
import Comment from './Comment';
import styles from './CommentBox.module.css';
import Reply from './Reply';

export default function CommentBox() {
  return (
    <div className={styles.container}>
      <MainInput placeholder='댓글을 입력하세요.' onSubmit={() => {}} />
      <Comment />
      <Reply />
    </div>
  )
}