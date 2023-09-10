import styles from './PostSlide.module.css';
import Icon from '@mdi/react';
import { mdiKeyboardBackspace } from '@mdi/js';
import MyEditor from '@/components/MyEditor';
import { ChangeEventHandler, useCallback, useState } from 'react';
import Dropdown from './DropDown';
import { ChapterTitle } from '@/types/topic';

type PostSlideProps = {
  chapters: ChapterTitle[];
};

export default function PostSlide({
  chapters,
}: PostSlideProps) {
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChangeCategory = useCallback((value: number) => {
    setCategoryIdx(value);
  }, []);

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setContent(e.target.value);
  };

  const onChangeContent = (value: string) => {
    setContent(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles['back-button']}>
          <div className={styles.icon}>
            <Icon path={mdiKeyboardBackspace} />
          </div>
          돌아가기
        </div>
      </div>

      <Dropdown data={chapters} value={categoryIdx} onChange={onChangeCategory} />
      <input className={styles.title} type='text' placeholder='제목을 입력하세요.' value={title} onChange={onChangeTitle} />
      <div className={styles.content}>
        <MyEditor onChangeContent={onChangeContent} defaultContent={'<p></p>'} editable={true} />
      </div>
      <div className={styles['button-box']}>
        <div className={styles.button}>글쓰기</div>
      </div>
    </div>
  );
};