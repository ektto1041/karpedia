import MobileMenuItem from './MobileMenuItem';
import styles from './MobileMenuList.module.css';
import { MenuItem } from './NavigationBar';

type MobileMenuListProps = {
  uid: string;
  isAdmin: boolean;
  menuItems: MenuItem[];
};

export default function MobileMenuList({
  uid,
  isAdmin,
  menuItems,
}: MobileMenuListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.account}>
        {!uid ? (
          <MobileMenuItem text='로그인' href={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}auths/google`} />
        ) : (
          <>
            <MobileMenuItem text='프로필' href='/account' />
            {isAdmin && (
              <MobileMenuItem text='토픽 관리' href='/topic/setting' />
            )}
          </>
        )}
      </div>
      <div className={styles['menu-list']}>
        {menuItems?.map(item => (
          <MobileMenuItem key={item.name} text={item.name} href={item.href}/>
        ))}
      </div>
    </div>
  );
};