import Icon from '@mdi/react';
import styles from './NavigationBar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mdiAccountCircle } from '@mdi/js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCookie } from 'cookies-next';
import { apis } from '@/utils/api';
import css from '@/utils/css';
import { mdiMenu } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';
import { mdiClose } from '@mdi/js';
import MobileMenuList from './MobileMenuList';
import { fetchSelfUser, selectAuthStatus, selectSelfUser } from '@/redux/slices/AuthSlice';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';

export type MenuItem = {
  name: string;
  href: string;
}

export default function NavigationBar() {
  const [uid, setUid] = useState<string>('')
  const [isAdmin, setAdmin] = useState<boolean>(false);
  const [isMenuClicked, setMenuClicked] = useState(false);

  const authStatus = useAppSelector(state => selectAuthStatus(state));
  const selfUser = useAppSelector(state => selectSelfUser(state));

  const router = useRouter();
  const dispatch = useAppDispatch();

  const menuItems = useMemo<MenuItem[]>(() => ([
    {name: '포트폴리오', href: '/portfolio'},
    {name: '토픽', href: '/topic'},
  ]), []);

  useEffect(() => {
    console.log('useEffect');
    const cookieUid = getCookie('uid');
    if(cookieUid) {
      setUid(cookieUid as string);

      if(authStatus === 'idle') {
        dispatch(fetchSelfUser());
      }
    }

    if(getCookie('is_admin') === '1') setAdmin(true);
  }, []);

  // 모바일에서 페이지 이동했을 때 모바일 메뉴 리스트를 종료해주는 역할
  useEffect(() => {
    onClickMenu(false);
  }, [router]);

  const onClickProfile = () => {
    apis.testat();
  };

  const onClickMenu = useCallback((clicked: boolean) => {
    setMenuClicked(clicked);

    if(clicked) {
      document.body.classList.add('small');
    } else {
      document.body.classList.remove('small');
    }
  }, []);

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
          <div className={css(styles.content, styles.desktop)}>
            {!selfUser ? (
              <Link href={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}auths/google`} className={styles.button}>
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
          <div className={css(styles.content, styles.mobile)}>
            <div className={styles['icon-button']} onClick={() => onClickMenu(!isMenuClicked)}>
              {!isMenuClicked ? (<Icon path={mdiMenu} />) : (<Icon path={mdiClose} /> )}
            </div>
            <div className={styles['icon-button']}>
              <Icon path={mdiMagnify} />
            </div>
          </div>
        </div>

        {isMenuClicked && (
          <div className={styles['menu-list']}>
            <MobileMenuList uid={uid} isAdmin={isAdmin} onClickProfile={onClickProfile} menuItems={menuItems} />
          </div>
        )}
      </div>
    </div>
  );
};