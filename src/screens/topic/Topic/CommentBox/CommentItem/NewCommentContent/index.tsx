import CommentEditor from '@/components/CommentEditor';
import styles from './NewCommentContent.module.css';
import { NewCommentsDto } from '@/types/comment';
import { useCallback, useMemo, useState } from 'react';

type NewCommentContentProps = {
  onClickCreate: (content: string) => void;
};

export default function NewCommentContent({
  onClickCreate,
}: NewCommentContentProps) {
  const [content, setContent] = useState('<p></p>');

  const onChangeContent = useCallback((value: string) => {
    setContent(value);
  }, []);

  return (
    <div className={styles.container}>
      <CommentEditor onChangeContent={onChangeContent} defaultContent='<p></p>' editable />
      <div className={styles['button-box']}>
        <div className={styles.button} onClick={() => onClickCreate(content)} >
          작성하기
        </div>
      </div>
    </div>
  );
};