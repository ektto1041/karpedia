import styles from './Paging.module.css';

export default function Paging() {
  return (
    <div className={styles.container}>
      <div className={styles['page-container']}>
        <div className={styles.page}>{'<'}</div>
        <div className={styles.page}>1</div>
        <div className={styles.page}>12</div>
        <div className={styles.page}>123</div>
        <div className={styles.page}>1234</div>
        <div className={styles.page}>{'>'}</div>
      </div>
    </div>
  );
};