import styles from './PostEditor.module.css';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import MyEditor from '../MyEditor';

export type PostType = 'chapter' | 'post';

export type PostEditorResult = {
  title: string;
  content: string;
};

type PostEditorProps = {
  onWrite: (data: PostEditorResult) => void;
  defaultTitle?: string;
  defaultContent?: string;
};

export default function PostEditor({
  onWrite,
  defaultTitle,
  defaultContent,
}: PostEditorProps) {
  const [title, setTitle] = useState(defaultTitle || '');
  const [content, setContent] = useState(defaultContent || '<p></p>');

  useEffect(() => {
    setTitle(defaultTitle || '');
  }, [defaultTitle]);

  useEffect(() => {
    setContent(defaultContent || '<p></p>');
  }, [defaultContent]);

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (value: string) => {
    setContent(value);
  };

  const onClickWrite = useCallback(() => {
    const data: PostEditorResult = {
      title, content
    };

    onWrite(data);
  }, [onWrite, title, content]);

  return (
    <div className={styles.container} >
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