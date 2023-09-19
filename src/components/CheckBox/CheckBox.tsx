import { useCallback, useState } from 'react';
import styles from './CheckBox.module.css';
import css from '@/utils/css';

type CheckBoxProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function CheckBox({
  label,
  value,
  onChange,
}: CheckBoxProps) {
  return (
    <div className={css(styles.container, value ? styles.selected : '')} onClick={() => {onChange(!value)}}>
      <div className={css(styles.background, value ? styles.selected : '')} >
        <div className={styles.white} />
        <div className={styles.red} />
      </div>
      <div className={styles.content}>
        {label}
      </div>
    </div>
  );
};