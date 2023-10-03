import CommentEditor from '@/components/CommentEditor';
import styles from './CommentContent.module.css';
import time from '@/utils/time';
import { CommentsDto } from '@/types/comment';

type CommentContentProps = {
  comment: CommentsDto,
  userName: string;
  onClickReply: (commentId: number) => void;
};

export default function CommentContent({
  comment,
  userName,
  onClickReply,
}: CommentContentProps) {
  const {content: defaultContent, modifiedAt} = comment;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles['user-name']}>
          {userName}
        </div>
      </div>
      <div className={styles.content}>
        <CommentEditor onChangeContent={() => {}} defaultContent={defaultContent} editable={false} />
      </div>
      <div className={styles.footer}>
        <div className={styles['modified-at']}>
          {time.toFormat(time.toString(modifiedAt))}
        </div>
        <div className={styles['button-box']}>
          <div className={styles.button}>
            수정하기
          </div>
          <div className={styles.button} onClick={() => onClickReply(comment.id)}>
            답변하기
          </div>
        </div>
      </div>
    </div>
  );
};