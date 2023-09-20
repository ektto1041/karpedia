import Icon from '@mdi/react';
import styles from './SortChapter.module.css';
import { mdiTriangle, mdiTriangleDown } from '@mdi/js';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { apis } from '@/utils/api';
import { TopicsWithChaptersDto } from '@/types/topic';
import { ChaptersDto } from '@/types/chapter';
import css from '@/utils/css';

export default function SortChapterScreen() {
  const router = useRouter();
  const topicId: number = parseInt(router.query.tid as string);

  const [topic, setTopic] = useState<TopicsWithChaptersDto>();
  const chapters: ChaptersDto[] = useMemo(
    () => topic ? [...topic.chaptersList] : []
  , [topic]);

  const getTopic = useCallback(async (topicId: number) => {
    const authResponse = await apis.checkAuths();
    if(authResponse.status >= 300) {
      alert('잘못된 접근입니다.');
      router.push('/');
      return;
    }

    const response = await apis.getTopicWithChapters(topicId);
    if(response.status === 200) {
      const t = response.data;
      t.chaptersList.sort((a, b) => b.orders - a.orders);
      
      setTopic(response.data);
    }
  }, [router]);

  useEffect(() => {
    if(topicId) {
      getTopic(topicId);
    }
  }, [router]);

  const onClickMove = useCallback(async (from: number, to: number) => {
    const response = await apis.swapChapterOrder(chapters[from].id, chapters[to].id);
    if(response.status < 300) {
      router.reload();
    }
  }, [router, chapters]);

  return (
    <div className={styles.container}>
      <h1>챕터 순서 설정</h1>
      <div className={styles.list}>
        {chapters.map((c, i) => (
          <div key={c.id} className={styles.item}>
            {c.title}
            <div className={styles['button-box']}>
              <div
                className={css(styles.button, Boolean(i > 0) ? styles.abled : styles.disabled)}
                onClick={() => onClickMove(i, i-1)}
              >
                <Icon path={mdiTriangle} />
              </div>
              <div
                className={css(styles.button, Boolean(i < (chapters.length-1)) ? styles.abled : styles.disabled)}
                onClick={() => onClickMove(i, i+1)}
              >
                <Icon path={mdiTriangleDown} />
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};