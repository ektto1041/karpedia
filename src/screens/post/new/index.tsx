import { useRouter } from 'next/router';
import styles from './NewPost.module.css';
import { useCallback, useEffect, useState } from 'react';
import css from '@/utils/css';
import TypeSlide from './TypeSlide';
import PostSlide from './PostSlide';
import { apis } from '@/utils/api';
import { TopicsWithChaptersDto, ChapterTitle } from '@/types/topic';

export type PostType = 'category' | 'post';

export default function NewPostScreen() {
  const router = useRouter();

  const topicId: number = parseInt(router.query.tid as string); 
  
  const [selectedType, setSelectedType] = useState<PostType | null>(null);
  const [topic, setTopic] = useState<TopicsWithChaptersDto>();

  const chapters: ChapterTitle[] | undefined = topic?.chaptersList.map(chapter => ({ id: chapter.id, title: chapter.title }));

  const getTopic = useCallback(async (topicId: number) => {
    const response = await apis.getTopic(topicId);
    if(response.status === 200) {
      setTopic(response.data);
    }
  }, []);

  useEffect(() => {
    if(topicId) {
      getTopic(topicId);
    } else {
      alert('잘못된 접근입니다.');
      router.push('/');
    }
  }, [router]);

  const onClickType = useCallback((type: PostType) => {
    setSelectedType(type);
  }, []);

  const onClickBackToType = useCallback(() => {
    setSelectedType(null);
  }, []);

  return (
    <div className={styles.container}>
      <div className={css(styles.content, selectedType ? styles.clicked : '')}>
        <div className={styles['slide-type']}>
          <TypeSlide onClickType={onClickType} />
        </div>
        <div className={styles['slide-post']}>
          {chapters && (<PostSlide selectedType={selectedType} chapters={chapters} onClickBackToType={onClickBackToType} topicId={topicId} />)}
        </div>
      </div>
    </div>
  );
};