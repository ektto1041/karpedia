import Image from 'next/image';
import styles from './ProjectImage.module.css';
import sectionStyles from './Section.module.css';

interface ProjectImageProps {
  src: string;
  alt: string;
}

export default function ProjectImage({
  src,
  alt,
}: ProjectImageProps) {
  return (
    <>
      <div className={styles.container}>
        <div className={sectionStyles['bg-code']}>
          {'<img src=”'}
        </div>
        <div className={styles['image']}>
          <Image src={src} alt={alt} fill style={{ objectFit: 'contain' }} />
        </div>
        <div className={sectionStyles['bg-code']} style={{ marginLeft: 'calc(var(--line-h) * 24)'}}>
          {'“ alt=”profile_image” />'}
        </div>
      </div>
      <div className={sectionStyles.line} />
    </>
  );
}