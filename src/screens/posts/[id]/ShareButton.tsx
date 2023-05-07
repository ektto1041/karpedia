import styles from './ShareButton.module.css';
import Icon from '@mdi/react';
import { mdiShareVariant } from '@mdi/js';
import { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';

export default function ShareButton() {
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}${router.asPath}`);

    alert('해당 글의 주소가 클립보드에 복사되었습니다.');
  };

  return (
    <button className={styles['share-button']} onClick={handleClick}>
      <Icon path={mdiShareVariant} size="30px" />
    </button>
  )
}