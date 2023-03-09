import Icon from '@mdi/react';
import styles from './NavigationBar.module.css';
import { mdiAccountBox } from '@mdi/js';
import { mdiListBox } from '@mdi/js';
import Link from 'next/link';

export default function NavigationBar() {
  return (
    <div className={styles.container}>
      <Link href='/'>
        <Icon path={mdiAccountBox} size='100%' />
      </Link>
      <Link href='/posts'>
        <Icon path={mdiListBox} size='100%' />
      </Link>
    </div>
  );
};