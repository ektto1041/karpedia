import CommentEditor from '@/components/CommentEditor';
import styles from './CommentForm.module.css';
import { useCallback, useState } from 'react';
import { CommentsWithPublicUsersDto } from '@/types/comment';
import Icon from '@mdi/react';
import { mdiCancel, mdiReplyOutline } from '@mdi/js';

type Button = {
  text: string;
  onClick: () => void;
}

type CommentFormProps = {
  defaultContent?: string;
  replyTo: CommentsWithPublicUsersDto | null;
  onClickCancelReply?: () => void;
  submitText: string;
  onClickSubmit: (content: string) => void;
  buttons?: Button[];
}

/**
 * @param defaultContent 에디터의 기본 Content
 * @param replyTo 답변의 대상이 되는 댓글. NewComment의 경우에만 사용
 * @param onClickCancelReply 답변 작성을 취소하는 메소드
 * @param submitText 제출 버튼의 텍스트
 * @param onClickSubmit 제출 버튼을 눌렀을 때 메소드
 * @param buttons 커스텀 버튼 리스트
 */
export default function CommentForm({
  defaultContent,
  replyTo,
  onClickCancelReply,
  submitText,
  onClickSubmit,
  buttons,
}: CommentFormProps) {
  const [content, setContent] = useState(defaultContent || '<p></p>');

  const onChangeContent = useCallback((value: string) => {
    setContent(value);
  }, []);

  return (
    <div className={styles.container}>
      <CommentEditor onChangeContent={onChangeContent} defaultContent={defaultContent || '<p></p>'} editable />
      {replyTo && (
        <div className={styles['reply-to']} onClick={onClickCancelReply!}>
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
        {buttons?.map(button => (
          <div key={button.text} className={styles.button} onClick={button.onClick} >
            {button.text}
          </div>
        ))}
        <div className={styles.button} onClick={() => onClickSubmit(content)} >
          {submitText}
        </div>
      </div>
    </div>
  );
}