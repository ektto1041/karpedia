import { PostDetailProps } from '@/types/post';
import { apis } from '@/utils/api';
import time from '@/utils/time';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import CommentBox from './CommentBox';
import ContentBox from './ContentBox';
import styles from './PostDetail.module.css';
import ShareButton from './ShareButton';

export default function PostDetailScreen({
  post,
}: PostDetailProps) {
  const {id, emoji, title, modifiedAt, content, } = post;

  const router = useRouter();
  const session = useSession();
  const isAdmin = Boolean(session.status === 'authenticated');

  // 조회 수 처리
  useEffect(() => {
    const viewPost = async () => {
      const result = await apis.viewPost(id);

      if(!(result.status >= 200 && result.status < 300)) {
        alert('조회 수 처리에 문제가 발생했습니다.');
      }
    };
    viewPost();
  }, []);

  const handleClickUpdateButton = useCallback(() => {
    router.push(`/posts/new?postId=${id}`);
  }, [router, id]);

  const handleClickDeleteButton = useCallback(async () => {
    const result = await apis.deletePost(id);

    if(result.status === 200) {
      alert("삭제 성공!");

      const revalidationResult = await apis.revalidatePost(id);
      if(revalidationResult.status !== 200) {
        alert('revalidation failed');
      }

      router.push('/posts');     
    } else {
      alert('삭제 실패');
    }
  }, [router, id]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles['emoji-box']}>
          {emoji}
        </div>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.subtitle} >
          {time.toFormat(modifiedAt)}
        </div>
      </div>
      <div className={styles.body}>
        <ContentBox content={content} />
        {isAdmin ? (
          <div className={styles['admin-box']}>
            <button onClick={handleClickUpdateButton}>수정</button>
            <button onClick={handleClickDeleteButton}>삭제</button>
          </div>
        ) : (<></>)}
        <div className={styles['button-box']}>
          <ShareButton />
        </div>
        <CommentBox postId={id} isAdmin={isAdmin} />
      </div>
    </div>
  );
};