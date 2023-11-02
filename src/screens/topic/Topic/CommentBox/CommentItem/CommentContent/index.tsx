import CommentEditor from '@/components/CommentEditor';
import styles from './CommentContent.module.css';
import time from '@/utils/time';
import { CommentsWithPublicUsersWithReplyToDto } from '@/types/comment';
import Icon from '@mdi/react';
import { mdiArrowUpCircleOutline, mdiCommentQuoteOutline, mdiDeleteOutline, mdiPencilOutline } from '@mdi/js';
import { selectSelfUser } from '@/redux/slices/AuthSlice';
import useAppSelector from '@/hooks/useAppSelector';

type CommentContentProps = {
  comment: CommentsWithPublicUsersWithReplyToDto;
  onClickUpdate: () => void;
  onClickReply: (commentId: number) => void;
  onClickScrollToReplyFrom: (commentId: number) => void;
  onClickDelete: (commentId: number) => void;
};

export default function CommentContent({
  comment,
  onClickUpdate,
  onClickReply,
  onClickScrollToReplyFrom,
  onClickDelete,
}: CommentContentProps) {
  const {id, content, modifiedAt, users, replyTo} = comment;

  const selfUser = useAppSelector(state => selectSelfUser(state));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles['user-name']}>
          {users.name}
        </div>
      </div>
      {replyTo && (
        <div className={styles['reply-info']}>
          <div className={styles['reply-to']} onClick={() => onClickScrollToReplyFrom(replyTo.id)}>
            {replyTo.users.name} 님의 댓글에 대한 답변입니다.
            <div className={styles['scroll-icon']}>
              <Icon path={mdiArrowUpCircleOutline} size='24px' />
            </div>
          </div>
          <div className={styles['reply-content']}>
            <div className={'ProseMirror comment-editor'} dangerouslySetInnerHTML={{ __html: replyTo.content }} />
          </div>
        </div>
      )}
      <div className={styles.content}>
        <div className={'ProseMirror comment-editor'} dangerouslySetInnerHTML={{ __html: content }} /> 
      </div>
      <div className={styles.footer}>
        <div className={styles['modified-at']}>
          {time.toFormat(time.toString(modifiedAt))}
        </div>
        {selfUser && (
          <div className={styles['button-box']}>
            <div className={styles.button} onClick={() => onClickReply(comment.id)}>
              <Icon path={mdiCommentQuoteOutline} size={'24px'} />
            </div>
            {selfUser.id === users.id && (
              <>
                <div className={styles.button} onClick={() => onClickDelete(id)}>
                  <Icon path={mdiDeleteOutline} size={'24px'} />
                </div>
                <div className={styles.button} onClick={onClickUpdate}>
                  <Icon path={mdiPencilOutline} size={'24px'} />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};