import { CommentsByUsersDto } from '@/types/comment';
import styles from './CommentTabItem.module.css';
import time from '@/utils/time';
import Icon from '@mdi/react';
import { mdiDeleteOutline } from '@mdi/js';
import Link from 'next/link';
import { apis } from '@/utils/api';
import { useRouter } from 'next/router';

type CommentTabItemProps = {
  comment: CommentsByUsersDto;
}

export default function CommentTabItem({
  comment,
}: CommentTabItemProps) {
  const {id, content, modifiedAt, postTitle, postId, chapterId, topicId, replyTo} = comment;

  const href = `/topic/${topicId}/${chapterId}/${postId}#comments`;

  const router = useRouter();

  const onClickDelete = async () => {
    const response = await apis.deleteComment(id);
    if(response.status < 300) {
      router.reload();
    }
  };

  return (
    <div className={styles.container}>
      <Link href={href} className={styles.content} dangerouslySetInnerHTML={{ __html: content}} />
      <div className={styles.floating}>
        <button onClick={onClickDelete}>
          <Icon path={mdiDeleteOutline} />
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles['post-title']}>
          "{postTitle}" 에서 작성한 {replyTo ? '답변' : '댓글'}입니다.
        </div>
        <div className={styles.date}>
          {time.toFormat(time.toString(modifiedAt))}
        </div>
      </div>
    </div>
  );
}