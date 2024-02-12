import Image from 'next/image';
import styles from './AboutMeContent.module.css';
import css from '@/utils/css';
import Link from 'next/link';
import { FileName } from './Portfolio';

interface AboutMeContentProps {
  onFileClick: (file: FileName) => void;
}

export default function AboutMeContent({
  onFileClick,
}: AboutMeContentProps) {
  return (
    <div className={styles.container}>
      <div className={css(styles.profile) }>
        <div className={styles.line}>
          {'<img src=”'}
        </div>
        <div className={styles['profile-image']}>
          <Image src={'/profile-img.png'} alt="profile-image" fill />
        </div>
        <div className={styles.line}>
          {'“ alt=”profile_image” />'}
        </div>
        <div className={styles['main-info']}>
          <div className={styles['div-line']}>
            <div className={styles.line}>{`<h1>`}</div>
            <h1>박상연</h1>
            <div className={styles.line}>{`</h1>`}</div>
          </div>
          <div className={styles['div-line']}>
            <div className={styles.line}>{`<p>`}</div>
            <p>많은 사람들에게 영향을 줄 수 있는 <strong>웹 개발자</strong>가 되고 싶습니다.</p>
            <div className={styles.line}>{`</p>`}</div>
          </div>
          <div className={styles['div-line']} />
          <div className={styles['div-line']}>
            <div className={styles.line}>{`<p>`}</div>
            <p>☎️ 010-2879-5282</p>
            <div className={styles.line}>{`</p>`}</div>
          </div>
          <div className={styles['div-line']}>
            <div className={styles.line}>{`<p>`}</div>
            <p>✉️ dhkdwk1041@gmail.com</p>
            <div className={styles.line}>{`</p>`}</div>
          </div>
        </div>
      </div>
      <div className={styles.line} />
      <div className={styles['sub-info']} >
        <div className={styles['div-line']} style={{ marginLeft: '2rem' }}>
          <div className={styles.line}>{`<h2>`}</div>
          <h2>개발 경험</h2>
          <div className={styles.line}>{`</h2>`}</div>
        </div>
        <div className={styles['div-line']}>
          <div className={styles.line}>{`<ul><li>`}</div>
          <p>github 주소:</p>
        </div>
        <div className={styles['div-line']}>
          <div className={styles.line}>{`<a href="`}</div>
          <Link className={styles.link} href='https://github.com/ektto1041' target='_blank'>{'https://github.com/ektto1041'}</Link>
          <div className={styles.line}>{`" >링크</a></li>"`}</div>
        </div>
        <div className={styles['div-line']} style={{ marginLeft: '2rem' }}>
          <div className={styles.line}>{`<li>`}</div>
          <p>친숙한 기술:</p>
        </div>
        <div className={styles['div-line']} style={{ marginLeft: '4.5rem' }}>
          <p>Next.js React.js Javascript</p>
          <div className={styles.line}>{`</li></ul>`}</div>
        </div>
      </div>
      <div className={styles.line} />
      <div className={styles['sub-info']} >
        <div className={styles['div-line']} style={{ marginLeft: '2rem' }}>
          <div className={styles.line}>{`<h2>`}</div>
          <h2>진행한 프로젝트</h2>
          <div className={styles.line}>{`</h2>`}</div>
        </div>
        <div className={styles['div-line']} style={{ marginLeft: '1.25rem' }}>
          <div className={styles.line}>{`<ul><li>`}</div>
          <p className={styles['file-link']} onClick={() => onFileClick('w_planner.html')} >W Planner</p>
          <div className={styles.line}>{`</li>`}</div>
        </div>
        <div className={styles['div-line']} style={{ marginLeft: '3rem' }}>
          <div className={styles.line}>{`<li>`}</div>
          <p className={styles['file-link']}>Karpedia</p>
          <div className={styles.line}>{`</li>`}</div>
        </div>
        <div className={styles['div-line']} style={{ marginLeft: '3rem' }}>
          <div className={styles.line}>{`<li>`}</div>
          <p className={styles['file-link']}>gigs</p>
          <div className={styles.line}>{`</li>`}</div>
        </div>
        <div className={styles['div-line']} style={{ marginLeft: '3rem' }}>
          <div className={styles.line}>{`<li>`}</div>
          <p className={styles['file-link']}>Chimtooview</p>
          <div className={styles.line}>{`</li></ul>`}</div>
        </div>
      </div>
    </div>
  ) 
}