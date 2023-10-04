import CommentEditor from '@/components/CommentEditor';
import styles from './CommentContent.module.css';
import time from '@/utils/time';
import { CommentsWithPublicUsersWithReplyToDto } from '@/types/comment';
import Icon from '@mdi/react';
import { mdiArrowUpCircleOutline } from '@mdi/js';
import { useSelector } from 'react-redux';
import { selectSelfUser } from '@/redux/slices/AuthSlice';
import { RootState } from '@/redux/store';

type CommentContentProps = {
  comment: CommentsWithPublicUsersWithReplyToDto;
  onClickReply: (commentId: number) => void;
  onClickScrollToReplyFrom: (commentId: number) => void;
};

export default function CommentContent({
  comment,
  onClickReply,
  onClickScrollToReplyFrom,
}: CommentContentProps) {
  const {content, modifiedAt, users, replyTo} = comment;

  const selfUser = useSelector((state: RootState) => selectSelfUser(state));

  console.log(selfUser?.id);
  console.log(users.id);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles['user-name']}>
          {users.name}
        </div>
      </div>
      {replyTo && (
        <div className={styles['reply-to']} onClick={() => onClickScrollToReplyFrom(replyTo.id)}>
          {replyTo.users.name} 님의 댓글에 대한 답변입니다.
          <div className={styles['scroll-icon']}>
            <Icon path={mdiArrowUpCircleOutline} size='24px' />
          </div>
        </div>
      )}
      <div className={styles.content}>
        <CommentEditor onChangeContent={() => {}} defaultContent={content} editable={false} />
      </div>
      <div className={styles.footer}>
        <div className={styles['modified-at']}>
          {time.toFormat(time.toString(modifiedAt))}
        </div>
        {selfUser && (
          <div className={styles['button-box']}>
            {selfUser.id === users.id && (
              <div className={styles.button}>
                수정하기
              </div>
            )}
            <div className={styles.button} onClick={() => onClickReply(comment.id)}>
              답변하기
            </div>
          </div>
        )}
      </div>
    </div>
  );
};