import css from '@/utils/css';
import styles from './Resume.module.css';
import Link from 'next/link';
import React from 'react';

type RowProps = {
  keys: string;
  children: JSX.Element;
}

function Row({
  keys,
  children,
}: RowProps) {
  return (
    <section className={styles.row} >
      <h2 className={css(styles.key, styles.content)}>{keys}</h2>
      <div className={css(styles.value, styles.content)}>{children}</div>
    </section>
  );
}

export default function Resume() {
  return (
    <section className={styles.container} >
      <h1>
        이 력 서
      </h1>
      <div className={styles['sub-info']}>
        <Row keys={'깃허브 주소'}>
          <Link href='https://github.com/ektto1041'>https://github.com/ektto1041</Link>
        </Row>
        <Row keys={'친숙한 언어&기술'}>
          <>Javascript, React.js, Next.js</>
        </Row>
        <Row keys={'경험해 본 언어&기술'}>
          <>Java, Typescript, Nest.js, Spring</>
        </Row>
      </div>
    </section>
  );
};