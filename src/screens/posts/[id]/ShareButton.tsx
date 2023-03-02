import styles from './ShareButton.module.css';
import Icon from '@mdi/react';
import { mdiShareVariant } from '@mdi/js';

export default function ShareButton() {
  return (
    <button className={styles['share-button']}>
      <Icon path={mdiShareVariant} size="30px" />
    </button>
  )
}