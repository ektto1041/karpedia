import styles from './Comment.module.css';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { CommentType } from '@/types/post';
import { MouseEventHandler, useCallback } from 'react';
import css from '@/utils/css';
import { apis } from '@/utils/api';

type CommentProps = {
  comment: CommentType,
  onClickDeleteButton: (id: string, password: string) => void,
  isAdmin: boolean,
  revalidateCommentList: () => void,
};

export default function Comment({
  comment,
  onClickDeleteButton,
  isAdmin,
  revalidateCommentList,
}: CommentProps) {
  const {id, name, password, content} = comment;

  const handleClickDeleteButton: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    onClickDeleteButton(id, password);
  }, [onClickDeleteButton]);

  const handleClickAddReplyButton = useCallback(async () => {
    if(isAdmin) {
      const newReply = prompt('답변을 입력해주세요.') || '';

      const result = await apis.updateReply(id, newReply);
      if(result.status === 200) {
        revalidateCommentList();
      } else {
        alert('답변 작성에 실패했습니다.');
      }
    }
    
  }, [isAdmin, id, revalidateCommentList]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {name}
        <button
          className={styles['delete-button']}
          onClick={handleClickDeleteButton}
        >
          <Icon path={mdiClose} size='15px' />
        </button>
      </div>
      <div className={css(styles.content, isAdmin ? styles.admin : '')} onClick={handleClickAddReplyButton} >
        {content}
      </div>
    </div>
  );
};