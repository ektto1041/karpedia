import Image from 'next/image';
import styles from './MyProfile.module.css';
import Resume from './Resume';

export default function MyProfile() {
  return (
    <article className={styles['profile-box']} >
      <div className={styles.deco} />
      <Resume />
      <section className={styles['main-info']}>
        <figure className={styles['image-container']}>
          <Image src='/profile-img.png' alt='profile-image' fill={true} />
          <figcaption>프로필 이미지</figcaption>
        </figure>
        <div className={styles['profile-content']}>
          <h1>박상연</h1>
          <h2>많은 사람들에게 영향을 줄 수 있는 <br className={styles['new-line']} /><span>웹 개발자</span>가 되고 싶습니다.</h2>
          <div className={styles['div-line']} />
          <section className={styles['info-item']}>
            <h1 className='invisible'>전화번호</h1>
            <span>☎️ 010-2879-5282</span>
          </section>
          <section className={styles['info-item']}>
            <h1 className='invisible'>이메일</h1>
            <span>✉️ dhkdwk1041@gmail.com</span>
          </section>
        </div>
      </section>
    </article>
  )
}