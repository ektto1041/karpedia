import styles from './Dropdown.module.css';
import Icon from '@mdi/react';
import { mdiTriangleSmallDown } from '@mdi/js';

export type DropdownData = {
  id: number;
  title: string;
};

type DropdownProps<T> = {
  data: T[];
  value: number;
  onChange: (value: number) => void;
};

export default function Dropdown<T extends DropdownData>({
  data,
  value,
  onChange,
}: DropdownProps<T>) {
  return (
    <div className={styles.container}>
      <div className={styles.selected}>
        {data[value]?.title}
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