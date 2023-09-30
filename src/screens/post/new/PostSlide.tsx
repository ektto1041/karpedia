import styles from './PostSlide.module.css';
import Icon from '@mdi/react';
import { mdiKeyboardBackspace } from '@mdi/js';
import { useCallback, useState } from 'react';
import { apis } from '@/utils/api';
import { useRouter } from 'next/router';
import { NewPostsDto } from '@/types/post';
import { ChapterTitle, NewChaptersDto } from '@/types/chapter';
import PostEditor, { PostEditorResult, PostType } from '@/components/PostEditor/PostEditor';
import Dropdown from '@/components/Dropdown/Dropdown';

type PostSlideProps = {
  chapters: ChapterTitle[];
  selectedType: PostType | null;
  onClickBackToType: () => void;
  topicId: number;
};

export default function PostSlide({
  chapters,
  selectedType,
  onClickBackToType,
  topicId,
}: PostSlideProps) {
  const router = useRouter();

  const [chapterIdx, setChapterIdx] = useState(0);

  const onWrite = useCallback(async (data: PostEditorResult) => {
    const {title, content} = data;
    if(selectedType === 'chapter') {
      const newChapter: NewChaptersDto = { topicId, title, content };

      const response = await apis.createChapter(newChapter);
      if(response.status < 300) {
        router.push('/');
      }
    } else {
      const newPost: NewPostsDto = { chapterId: chapters[chapterIdx].id, title, content };

      const response = await apis.createPost(newPost);
      if(response.status < 300) {
        router.push('/');
      }
    }
  }, [topicId, selectedType]);

  const onChangeChapterIdx = useCallback((value: number) => {
    setChapterIdx(value);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles['back-button']} onClick={onClickBackToType}>
          <div className={styles.icon}>
            <Icon path={mdiKeyboardBackspace} />
          </div>
          돌아가기
        </div>
      </div>

      {selectedType === 'post' && (
        <Dropdown data={chapters.map(c => ({ id: c.id, title: c.title }))} value={chapterIdx} onChange={onChangeChapterIdx} />
      )}
      <PostEditor onWrite={onWrite} />
    </div>
  );
};