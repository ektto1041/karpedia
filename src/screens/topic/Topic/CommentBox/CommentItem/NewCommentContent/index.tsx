import CommentEditor from '@/components/CommentEditor';
import styles from './NewCommentContent.module.css';
import { useCallback, useMemo, useState } from 'react';
import Icon from '@mdi/react';
import { mdiCancel, mdiReplyOutline } from '@mdi/js';
import { CommentsWithPublicUsersWithReplyToDto } from '@/types/comment';

type NewCommentContentProps = {
  onClickCreate: (content: string, replyToId?: number) => void;
  replyTo?: CommentsWithPublicUsersWithReplyToDto;
  onClickCancelReply: () => void;
};

export default function NewCommentContent({
  onClickCreate,
  replyTo,
  onClickCancelReply,
}: NewCommentContentProps) {
  const [content, setContent] = useState('<p></p>');

  const onChangeContent = useCallback((value: string) => {
    setContent(value);
  }, []);

  return (
    <div className={styles.container}>
      <CommentEditor onChangeContent={onChangeContent} defaultContent='<p></p>' editable />
      {replyTo && (
        <div className={styles['reply-to']} onClick={onClickCancelReply}>
          <div className={styles['reply-to-name']}>
            <Icon path={mdiReplyOutline} size={'24px'} />
            {replyTo.users.name} 님에게 답장
          </div>
          <div className={styles['cancel-icon']}>
            <Icon path={mdiCancel} size={'24px'} />
            취소
          </div>
        </div>
      )}
      
      <div className={styles['button-box']}>
        <div className={styles.button} onClick={() => onClickCreate(content, replyTo ? replyTo.id : undefined)} >
          작성하기
        </div>
      </div>
    </div>
  );
};