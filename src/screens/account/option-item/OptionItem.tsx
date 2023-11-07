import styles from './OptionItem.module.css';

type OptionItemButton = {
  label: string;
  onClick: () => void;
};

export type OptionItemProps = {
  name: string;
  description: string;
  children: JSX.Element;
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
        <h2>{description}</h2>
        <div className={styles.content}>
          {children}
        </div>
      </div>
      <div className={styles['button-box']}>
        {buttons.map(button => (
          <button key={button.label} onClick={button.onClick}>{button.label}</button>
        ))}
      </div>
    </section>
  );
}