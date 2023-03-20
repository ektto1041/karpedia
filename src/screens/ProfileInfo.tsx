import styles from './ProfileInfo.module.css';

export default function ProfileInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.name}>이메일</div>
        <div className={styles.content}>dhkdwk1041@gmail.com</div>
      </div>
      <div className={styles.item}>
        <div className={styles.name}>Github</div>
        <div className={styles.content}>
          <a href='https://github.com/ektto1041' target="_blank">github.com/ektto1041</a>
        </div>
      </div>
    </div>
  );
};