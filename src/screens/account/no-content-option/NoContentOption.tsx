import styles from './NoContentOption.module.css';

type NoContentOptionProps = {
  text: string;
}

export default function NoContentOption({
  text,
}: NoContentOptionProps) {
  return (
    <div className={styles.container}>
      {text}
    </div>
  );
}