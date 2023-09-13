import { useCallback } from 'react';
import { PostType } from '.';
import styles from './TypeSlide.module.css';

type TypeSlideProps = {
  onClickType: (type: PostType) => void;
  hasChapter: boolean;
};

export default function TypeSlide({
  onClickType,
  hasChapter,
}: TypeSlideProps) {
  const onClickPost = useCallback(() => {
    if(hasChapter) {
      onClickType('post');
    } else {
      alert('챕터가 없습니다. 챕터를 먼저 작성해주세요.');
    }
  }, [hasChapter]);

  return (
    <div className={styles.container}>
      <h1>어떤 포스트를 작성하시나요?</h1>
      <div className={styles.content}>
        <div className={styles['type-item']} onClick={() => onClickType('category')} >
          카테고리
        </div>
        <div className={styles['type-item']} onClick={onClickPost} >
          포스트
        </div>
      </div>
    </div>
  );
};