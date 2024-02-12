import { useMemo } from 'react';
import styles from './LineNumList.module.css';

interface LineNumListProps {
  maxNum: number;
}

export default function LineNumList({
  maxNum,
}: LineNumListProps) {
  const numList: number[] = useMemo(() => {
    return Array.from({length: maxNum}, (v: number, i: number) => i+1)
  }, [maxNum]);

  return (
    <div className={styles.container}>
      {numList.map(num => (
        <div key={`line-num-${num}`} className={styles.num}>
          {num}
        </div>
      ))}
    </div>
  )
}