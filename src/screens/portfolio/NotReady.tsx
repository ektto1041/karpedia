import Link from 'next/link';
import styles from './NotReady.module.css';

export default function NotReady() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p>
          죄송합니다.
        </p>
        <p>
          해당 크기의 디바이스는
        </p>
        <p>
          아직 지원되지 않습니다.
        </p>
        <Link href='https://picturesque-astronomy-4f6.notion.site/ddaf9fcfbdbc46979b38cca4a52aa210?pvs=4' target='_blank'>노션 포트폴리오 확인하기</Link>
      </div>
    </div>
  )
}