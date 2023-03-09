import Image from 'next/image';
import styles from './Home.module.css';

export default function HomeScreen() {
  return (
    <div className={styles.container}>
      <div className={styles['profile-box']} >
        <div className={styles['profile-image-box']} >
          <div className={styles['profile-image']} >
            <Image src='/profile-image.jpeg' alt='profile-image' fill={true} />
          </div>
        </div>
        <div className={styles.name}>박상연</div>
      </div>
      <div className={styles.content}>
        포트폴리오가 준비중입니다.
      </div>
    </div>
  );
};