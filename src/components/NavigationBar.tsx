import Icon from '@mdi/react';
import styles from './NavigationBar.module.css';
import { mdiAccountBox } from '@mdi/js';
import { mdiListBox } from '@mdi/js';
import Link from 'next/link';

type MenuItem = {
  name: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {name: '포트폴리오', href: '/'},
  {name: '토픽', href: '/topics'},
]

export default function NavigationBar() {
  return (
    <div className={styles.container}>
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
        <div className={styles['login-button']}>
          로그인
        </div>
      </div>
    </div>
  );
};