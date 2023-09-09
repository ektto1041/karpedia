import Icon from '@mdi/react';
import styles from './NavigationBar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mdiAccountCircle } from '@mdi/js';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { apis } from '@/utils/api';

type MenuItem = {
  name: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {name: '포트폴리오', href: '/'},
  {name: '토픽', href: '/topic'},
]

export default function NavigationBar() {
  const [uid, setUid] = useState<string>('')
  const [isAdmin, setAdmin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const cookieUid = getCookie('uid');
    if(cookieUid) setUid(cookieUid as string);

    if(getCookie('is_admin') === '1') setAdmin(true);
  }, []);

  const onClickProfile = () => {
    apis.testat();
  }

  return (
    <div className={styles.container}>
      <div className={styles['nav-box']}>
        <Link className={styles.logo} href='/'>
          Karpedia
        </Link>
        <div className={styles['nav-menu-list']}>
          {menuItems.map(item => (
            <Link key={item.name} className={styles['menu-item']} href={item.href}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className={styles['nav-button-list']}>
          {!uid ? (
            <Link href={'http://localhost:8080/auths/google'} className={styles.button}>
              로그인
            </Link>
          ) : (
            <>
              <div className={styles.profile} onClick={onClickProfile}>
                <Icon path={mdiAccountCircle} />
              </div>
              {isAdmin && (
                <Link href={'/topic/setting'} className={styles.button}>
                  토픽 관리
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};