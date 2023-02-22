import MainInput from '@/components/mainInput';
import PostItem from '@/components/posts/postItem';
import Topic from '@/components/posts/topic';
import styles from '@/styles/Posts.module.css';
import dayjs from 'dayjs';

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
      <div className={styles['post-item-box']}>
        <PostItem emoji='😍' title='When to Use Static Generation v.s. Server-side Rendering' createdAt={dayjs()} />
        <PostItem emoji='😍' title='I am Park Sangyeon' createdAt={dayjs()} />
        <PostItem emoji='😍' title='이 제품은 우유 메밀 땅콩 대두 밀 복숭아 토마토 아황산류 호두 잣을 사용한 제품과 같은 시설에서 제조하고 있습니다' createdAt={dayjs()} />
      </div>
    </div>
  );
};

// export async function getStaticProps() {

// };