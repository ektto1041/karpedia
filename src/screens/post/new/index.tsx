import { useRouter } from 'next/router';
import styles from './NewPost.module.css';
import { useCallback, useState } from 'react';
import css from '@/utils/css';
import TypeSlide from './TypeSlide';
import PostSlide from './PostSlide';

export type PostType = 'category' | 'post';

export default function NewPostScreen() {
  const router = useRouter();

  const topicId: number = parseInt(router.query.tid as string); 

  const [selectedType, setSelectedType] = useState<PostType | null>(null);

  const onClickType = useCallback((type: PostType) => {
    setSelectedType(type);
  }, []);

  return (
    <div className={styles.container}>
      <div className={css(styles.content, selectedType ? styles.clicked : '')}>
        <div className={styles['slide-type']}>
          <TypeSlide onClickType={onClickType} />
        </div>
        <div className={styles['slide-post']}>
          <PostSlide />
        </div>
      </div>
    </div>
  );
};