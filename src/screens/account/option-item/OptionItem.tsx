import React from 'react';
import styles from './OptionItem.module.css';

type OptionItemButton = {
  label: string;
  disabled: boolean;
  onClick: () => void;
};

export type OptionItemProps = {
  name: string;
  description: string[];
  children?: JSX.Element;
  buttons: OptionItemButton[];
}

export default function OptionItem({
  name,
  description,
  children,
  buttons,
}: OptionItemProps) {
  return (
    <section className={styles.container}>
      <div className={styles.main}>
        <h1>{name}</h1>
        <h2>
        {description.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}<br />
          </React.Fragment>
        ))}
        </h2>
        <div className={styles.content}>
          {children}
        </div>
      </div>
      <div className={styles['button-box']}>
        {buttons.map(button => (
          <button key={button.label} onClick={button.onClick} disabled={button.disabled}>{button.label}</button>
        ))}
      </div>
    </section>
  );
}