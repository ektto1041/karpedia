import { useRouter } from 'next/router';
import styles from './UpdatePost.module.css';
import { useCallback, useEffect } from 'react';
import { apis } from '@/utils/api';

export default function UpdatePostScreen() {
  const router = useRouter();
  const chapterId: number | undefined = router.query.cid ? parseInt(router.query.cid as string) : undefined;
  const postId: number | undefined = router.query.pid ? parseInt(router.query.pid as string) : undefined;

  const getUpdateData = useCallback(async () => {
    
  }, []);

  useEffect(() => {
    if(chapterId) {
      apis.getUpdateChapter(chapterId);
    }
  }, [router]);


  return (
    <div className={styles.container}>

    </div>
  );
};