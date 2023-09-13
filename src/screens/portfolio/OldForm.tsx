import css from '@/utils/css';
import styles from './OldForm.module.css';
import Link from 'next/link';

export default function OldForm() {
  return (
    <div className={styles.container} >
      <div className={styles.row} >
        <div className={css(styles.key, styles.content)}>깃허브 주소</div>
        <div className={css(styles.value, styles.content)}><Link href='https://github.com/ektto1041'>https://github.com/ektto1041</Link></div>
      </div>
      <div className={styles.row} >
        <div className={css(styles.key, styles.content)}>친숙한 언어&기술</div>
        <div className={css(styles.value, styles.content)}>Javascript, React.js, Next.js</div>
      </div>
      <div className={styles.row} >
        <div className={css(styles.key, styles.content)}>경험해 본 언어&기술</div>
        <div className={css(styles.value, styles.content)}>Java, Typescript, Nest.js, Spring, </div>
      </div>
    </div>
  );
};