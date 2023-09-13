import Image from 'next/image';
import styles from './TechItem.module.css';

type TechItemProps = {
  src: string;
};

export default function TechItem({
  src,
}: TechItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image src={src} alt={src} fill />
      </div>
    </div>
  );
};