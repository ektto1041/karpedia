import { PostType } from '.';
import styles from './TypeSlide.module.css';

type TypeSlideProps = {
  onClickType: (type: PostType) => void;
};

export default function TypeSlide({
  onClickType,
}: TypeSlideProps) {
  return (
    <div className={styles.container}>
      <h1>어떤 포스트를 작성하시나요?</h1>
      <div className={styles.content}>
        <div className={styles['type-item']} onClick={() => onClickType('category')} >
          카테고리
        </div>
        <div className={styles['type-item']} onClick={() => onClickType('post')} >
          포스트
        </div>
      </div>
    </div>
  );
};