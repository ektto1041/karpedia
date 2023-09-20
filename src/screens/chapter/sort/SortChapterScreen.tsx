import Icon from '@mdi/react';
import styles from './SortChapter.module.css';
import { mdiTriangle, mdiTriangleDown } from '@mdi/js';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { apis } from '@/utils/api';
import { TopicsWithChaptersDto } from '@/types/topic';
import { ChaptersDto } from '@/types/chapter';

export default function SortChapterScreen() {
  const router = useRouter();
  const topicId: number = parseInt(router.query.tid as string);

  const [topic, setTopic] = useState<TopicsWithChaptersDto>();
  const chapters: ChaptersDto[] = useMemo(
    () => topic ? [...topic.chaptersList] : []
  , [topic]);

  const getTopic = useCallback(async (topicId: number) => {
    const response = await apis.getTopicWithChapters(topicId);
    if(response.status === 200) {
      const t = response.data;
      t.chaptersList.sort((a, b) => b.orders - a.orders);
      
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

  return (
    <div className={styles.container}>
      <h1>챕터 순서 설정</h1>
      <div className={styles.list}>
        {chapters.map(c => (
          <div key={c.id} className={styles.item}>
            {c.title}
            <div className={styles['button-box']}>
              <div className={styles.button}>
                <Icon path={mdiTriangle} />
              </div>
              <div className={styles.button}>
                <Icon path={mdiTriangleDown} />
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};