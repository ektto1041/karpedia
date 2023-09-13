import styles from './Dropdown.module.css';
import Icon from '@mdi/react';
import { mdiTriangleSmallDown } from '@mdi/js';
import { useCallback, useState } from 'react';
import { ChapterTitle } from '@/types/chapter';

type DropdownProps<T> = {
  data: T[];
  value: number;
  onChange: (value: number) => void;
};

export default function Dropdown<T extends ChapterTitle>({
  data,
  value,
  onChange,
}: DropdownProps<T>) {
  console.log(data);
  const onClickItem = useCallback((val: number) => {
    onChange(val);
  }, [onChange]);

  return (
    <div className={styles.container}>
      <div className={styles.selected}>
        {data[value].title}
        <div className={styles.icon}>
          <Icon path={mdiTriangleSmallDown}/>
        </div>
      </div>
      
      <div className={styles.content}>
        {data.map((item, idx) => (
          <div key={item.id} className={styles.item} onClick={() => {onChange(idx);}}>
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};