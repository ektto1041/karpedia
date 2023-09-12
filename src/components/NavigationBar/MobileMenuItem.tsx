import { useMemo } from 'react';
import styles from './MobileMenuItem.module.css';
import Link from 'next/link';

type MobileMenuItemProps = {
  text: string;
  onClick?: () => void;
  href?: string;
};

export default function MobileMenuItem({
  text,
  onClick,
  href,
}: MobileMenuItemProps) {
  const isLink = useMemo(() => onClick === undefined, [onClick]);
  
  return (
    <div className={styles.container}>
      {isLink ? (
        <Link href={href!} className={styles.content}>
          {text}
        </Link>
      ) : (
        <div className={styles.content} onClick={onClick}>
          {text}
        </div>
      )}
    </div>
  );
};