import styles from './MainInput.module.css';
import Icon from '@mdi/react';
import { mdiKeyboardReturn } from '@mdi/js';

type MainInputProps = {
  placeholder: string,
};

export default function MainInput({
  placeholder
} : MainInputProps) {
  return (
    <div className={styles.container}>
      <input type='text' placeholder={placeholder} />
      <button>
        <Icon path={mdiKeyboardReturn} size='20px' />
      </button>
    </div>
  );
};