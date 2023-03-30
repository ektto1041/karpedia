import css from '@/utils/css';
import { useMemo } from 'react';
import styles from './Paging.module.css';

type PagingProps = {
  page: number,
  maxPage: number,
  onClickPage: (page: string) => void,
};

export default function Paging({
  page,
  maxPage,
  onClickPage,
}: PagingProps) {
  const pages = useMemo(() => {
    const result = [];

    for(let i=page-3; i<=page+3; i++) {
      if(i < 0) continue;
      if(i > maxPage) continue;
      result.push(i);
    }

    return result;
  }, [page, maxPage]);

  return (
    <div className={styles.container}>
      <div className={styles['page-container']}>
        {page > 0 ? (<div className={styles.page} onClick={() => onClickPage('0')}>{'<<'}</div>) : (<></>)}
        {pages.map(p => (
          <div
            key={p}
            className={css(styles.page, page === p ? styles['current-page'] : '')}
            onClick={() => onClickPage(p.toString())}
          >{p}</div>
        ))}
        {page < maxPage ? (<div className={styles.page} onClick={() => onClickPage(maxPage.toString())}>{'>>'}</div>) : (<></>)}
      </div>
    </div>
  );
};