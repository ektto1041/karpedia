import { useCallback, useState } from 'react';
import styles from './CheckBox.module.css';
import css from '@/utils/css';

type CheckBoxProps = {
  label: string;
};

export default function CheckBox({
  label,
}: CheckBoxProps) {
  const [isSelected, setSelected] = useState(false);

  const onClick = useCallback(() => {
    setSelected(!isSelected);
  }, [isSelected]);

  return (
    <div className={css(styles.container, isSelected ? styles.selected : '')} onClick={onClick}>
      <div className={css(styles.background, isSelected ? styles.selected : '')} >
        <div className={styles.white} />
        <div className={styles.red} />
      </div>
      <div className={styles.content}>
        {label}
      </div>
    </div>
  );
};