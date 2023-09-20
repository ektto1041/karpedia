import styles from './PostEditor.module.css';
import Dropdown from '@/screens/post/new/Dropdown';
import { ChapterTitle } from '@/types/chapter';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import MyEditor from '../MyEditor';

export type PostType = 'chapter' | 'post';

export type PostEditorResult = {
  chapterId?: number;
  title: string;
  content: string;
};

type PostEditorProps = {
  type: PostType | null;
  chapters: ChapterTitle[];
  onWrite: (data: PostEditorResult) => void;
  defaultTitle?: string;
  defaultContent?: string;
};

export default function PostEditor({
  type,
  chapters,
  onWrite,
  defaultTitle,
  defaultContent,
}: PostEditorProps) {
  const [chapterIdx, setChapterIdx] = useState(0);
  const [title, setTitle] = useState(defaultTitle || '');
  const [content, setContent] = useState(defaultContent || '<p></p>');

  useEffect(() => {
    setTitle(defaultTitle || '');
  }, [defaultTitle]);

  useEffect(() => {
    setContent(defaultContent || '<p></p>');
  }, [defaultContent]);

  const onChangeChapter = useCallback((value: number) => {
    setChapterIdx(value);
  }, []);

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (value: string) => {
    setContent(value);
  };

  const onClickWrite = useCallback(() => {
    const data: PostEditorResult = {
      chapterId: type === 'post' ? chapters[chapterIdx].id : undefined,
      title, content
    };

    onWrite(data);
  }, [onWrite, type, chapters, chapterIdx, title, content]);

  return (
    <div className={styles.container} >
      {type === 'post' && (<Dropdown data={chapters} value={chapterIdx} onChange={onChangeChapter} />)} 
      <input className={styles.title} type='text' placeholder='제목을 입력하세요.' value={title} onChange={onChangeTitle} />
      <div className={styles.content}>
        <MyEditor onChangeContent={onChangeContent} defaultContent={defaultContent || '<p></p>'} editable={true} />
      </div>
      <div className={styles['button-box']}>
        <div className={styles.button} onClick={onClickWrite}>글쓰기</div>
      </div>
    </div>
  );
};