import styles from './PostSlide.module.css';
import Icon from '@mdi/react';
import { mdiKeyboardBackspace } from '@mdi/js';
import MyEditor from '@/components/MyEditor';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { PostType } from '.';
import { apis } from '@/utils/api';
import { useRouter } from 'next/router';
import { newPostsDto } from '@/types/post';
import Dropdown from './Dropdown';
import { ChapterTitle, NewChaptersDto } from '@/types/chapter';

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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChangeCategory = useCallback((value: number) => {
    setChapterIdx(value);
  }, []);

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (value: string) => {
    setContent(value);
  };

  const onClickWrite = useCallback(async () => {
    if(selectedType === 'category') {
      const newChapter: NewChaptersDto = { topicId, title, content };

      const response = await apis.createChapter(newChapter);
      if(response.status < 300) {
        await apis.revalidateTopicAfterCreate(topicId);
        router.push('/');
      }

    } else if(selectedType === 'post') {
      const newPost: newPostsDto = { chapterId: chapters[chapterIdx].id, title, content };

      const response = await apis.createPost(newPost);
      if(response.status < 300) {
        await apis.revalidateTopicAfterCreate(topicId);
        router.push('/');
      }
    }
  }, [selectedType, topicId, title, content]);

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

      {selectedType === 'post' && (<Dropdown data={chapters} value={chapterIdx} onChange={onChangeCategory} />)} 
      <input className={styles.title} type='text' placeholder='제목을 입력하세요.' value={title} onChange={onChangeTitle} />
      <div className={styles.content}>
        <MyEditor onChangeContent={onChangeContent} defaultContent={'<p></p>'} editable={true} />
      </div>
      <div className={styles['button-box']}>
        <div className={styles.button} onClick={onClickWrite}>글쓰기</div>
      </div>
    </div>
  );
};