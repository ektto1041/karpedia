import styles from './SortChapter.module.css';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { apis } from '@/utils/api';
import { TopicsWithChaptersWithPostsDto } from '@/types/topic';
import { ChaptersWithPostsDto } from '@/types/chapter';
import SortChapterItem from './SortChapterItem';

export default function SortChapterScreen() {
  const router = useRouter();
  const topicId: number = parseInt(router.query.tid as string);

  const [topic, setTopic] = useState<TopicsWithChaptersWithPostsDto>();
  const chapters: ChaptersWithPostsDto[] = useMemo(
    () => topic ? [...topic.chaptersList] : []
  , [topic]);

  const getTopic = useCallback(async (topicId: number) => {
    const authResponse = await apis.checkAuths();
    if(authResponse.status >= 300) {
      alert('잘못된 접근입니다.');
      router.push('/');
      return;
    }

    const response = await apis.getTopic(topicId);
    if(response.status === 200) {
      const t = response.data;
      t.chaptersList.sort((a, b) => a.orders - b.orders);
      t.chaptersList.forEach(chapter => {
        chapter.postsList.sort((a, b) => a.orders - b.orders);
      });
      
      setTopic(response.data);
    }
  }, [router]);

  useEffect(() => {
    if(topicId) {
      getTopic(topicId);
    }
  }, [router]);

  const onClickMoveChapter = useCallback(async (from: number, to: number) => {
    const response = await apis.swapChapterOrder(chapters[from].id, chapters[to].id);
    if(response.status < 300) {
      router.reload();
    }
  }, [router, chapters]);

  return (
    <div className={styles.container}>
      <h1>포스트 순서 설정</h1>
      <div className={styles.list}>
        {chapters.map((c, i) => (
          <SortChapterItem
            key={c.id}
            data={c}
            idx={i}
            isLast={Boolean(i === chapters.length-1)}
            onClickMoveParent={onClickMoveChapter}
          />
        ))}
      </div>
    </div>
  );
};