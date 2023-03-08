import styles from './MainInput.module.css';
import Icon from '@mdi/react';
import { mdiKeyboardReturn } from '@mdi/js';
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';

type MainInputProps = {
  placeholder: string,
  onSubmit: (keyword: string) => void,
};

export default function MainInput({
  placeholder,
  onSubmit,
} : MainInputProps) {
  const [value, setValue] = useState<string>("");

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    onSubmit(value);
  };

  const handleEnterKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if(e.key === 'Enter') {
      handleClick();
    };
  };

  return (
    <div className={styles.container}>
      <input type='text' placeholder={placeholder} onChange={handleChangeValue} onKeyDown={handleEnterKeyDown} />
      <button onClick={handleClick}>
        <Icon path={mdiKeyboardReturn} size='20px' />
      </button>
    </div>
  );
};