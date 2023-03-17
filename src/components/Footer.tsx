import { signIn, useSession } from 'next-auth/react';
import styles from './Footer.module.css';

export default function Footer() {
  const session = useSession();

  const handleClickLogin = () => {
    if(session.status === 'authenticated') alert('이미 로그인되어 있습니다.');
    else {
      signIn();
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles['login-button']} onClick={handleClickLogin}>⚙️ 관리자 계정으로 로그인</button>
    </div>
  );
};