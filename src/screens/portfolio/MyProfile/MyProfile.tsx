import Image from 'next/image';
import styles from './MyProfile.module.css';
import Resume from './Resume';

export default function MyProfile() {
  return (
    <article className={styles['profile-box']} >
      <div className={styles.deco} />
      <Resume />
      <div className={styles['main-info']}>
        <div className={styles['image-container']}>
          <Image src='/profile-img.png' alt='profile-image' fill={true} />
        </div>
        <div className={styles['profile-content']}>
          <h1>박상연</h1>
          <h2>많은 사람들에게 영향을 줄 수 있는 <br className={styles['new-line']} /><span>웹 개발자</span>가 되고 싶습니다.</h2>
          <div className={styles['div-line']} />
          <ul>
            <li>
              <span>☎️ 010-2879-5282</span>
            </li>
            <li>
              <span>✉️ dhkdwk1041@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      
    </article>
  )
}