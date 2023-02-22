import MainInput from '@/components/mainInput';
import Topic from '@/components/posts/topic';
import styles from '@/styles/Posts.module.css';

export default function Posts() {
  return (
    <div className={styles.container}>
      <div className={styles['topic-box']}>
        <div className={styles.title}>
          Topics
          <button>모두 취소</button>
        </div>
        <div className={styles.content}>
          <Topic>Javascript & React</Topic>
          <Topic>React</Topic>
          <Topic>C</Topic>
          <Topic>Javascript</Topic>
          <Topic>Next.js</Topic>
          <Topic>Firestore</Topic>
        </div>
      </div>
      <MainInput placeholder='검색어를 입력하세요.' />
    </div>
  );
};

// export async function getStaticProps() {

// };