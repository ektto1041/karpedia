import Image from 'next/image';
import styles from './TechItem.module.css';

type TechItemProps = {
  url: string;
  caption: string;
};

export default function TechItem({
  url,
  caption,
}: TechItemProps) {
  return (
    <div className={styles.container}>
      <figure className={styles.content}>
        <Image src={url} alt={caption} fill />
        <figcaption className='invisible'>{caption}</figcaption>
      </figure>
    </div>
  );
};