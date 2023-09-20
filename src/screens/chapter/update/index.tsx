import { useRouter } from 'next/router';
import styles from './UpdateChapter.module.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { apis } from '@/utils/api';
import { TopicsNameDto } from '@/types/topic';
import { ChaptersWithTopicsIdDto, NewChaptersUpdateDto } from '@/types/chapter';
import PostEditor, { PostEditorResult } from '@/components/PostEditor/PostEditor';
import Dropdown from '@/screens/post/new/Dropdown';

export default function UpdateChapterScreen() {
  const router = useRouter();
  const chapterId: number | undefined = useMemo(() => 
    (router.query.cid ? parseInt(router.query.cid as string) : undefined)
  , [router]);

  const [topics, setTopics] = useState<TopicsNameDto[]>([]);
  const [chapter, setChapter] = useState<ChaptersWithTopicsIdDto>();
  const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);

  const getUpdateChapterData = useCallback(async (chapterId: number) => {
    const response = await apis.getUpdateChapter(chapterId);
    if(response.status < 300) {
      const data = response.data;
      setTopics(data.topicsList);
      setChapter(data.chapters);
      const defaultSelectedTopicIdx = data.topicsList.findIndex(t => t.id === data.chapters.topicsId);
      setSelectedTopicIdx(defaultSelectedTopicIdx);
    }
  }, []);

  useEffect(() => {
    if(chapterId) {
      getUpdateChapterData(chapterId);
    }
  }, [chapterId]);

  const onChangeTopic = useCallback((value: number) => {
    setSelectedTopicIdx(value);
  }, []);

  const onWrite = useCallback(async (data: PostEditorResult) => {
    const newChapter: NewChaptersUpdateDto = {
      id: chapter!.id,
      title: data.title,
      content: data.content,
      topicId: topics[selectedTopicIdx].id,
    };

    const response = await apis.updateChapter(newChapter);
    if(response.status < 300) {
      router.push('/');
    }
  }, [chapter, router, topics, selectedTopicIdx]);

  return (
    <div className={styles.container}>
      <h1>챕터 수정</h1>
      {chapter ? (
        <>
          <Dropdown data={topics.map(t => ({ id: t.id, title: t.name }))} value={selectedTopicIdx} onChange={onChangeTopic}  />
          <PostEditor
            type='chapter'
            chapters={[]}
            onWrite={onWrite}
            defaultTitle={chapter.title}
            defaultContent={chapter.content}
          />
        </>
      ) : (<></>)}
    </div>
  );
};