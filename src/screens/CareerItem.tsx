import css from '@/utils/css';
import Image from 'next/image';
import styles from './CareerItem.module.css';

type CareerItemProps = {
  bgImg: string,
  color: string,
  title: string,
  subTitle: string,
  when: string,
  description: JSX.Element,
  icons: string[],
};

export default function CareerItem({
  bgImg,
  color,
  title,
  subTitle,
  when,
  description,
  icons,
}: CareerItemProps) {
  return (
    <div className={styles.container}>
      <div className={css(styles['bg-color'], styles[color])} />
      <Image className={styles['bg-img']} src={bgImg} alt='chiltooview' width={700} height={400} />
      <div className={styles['main-content']} >
        <h1>
          {title}
        </h1>
        <h2>
          {subTitle}
        </h2>
        <h2>
          {when}
        </h2>
      </div>
      <div className={styles['sub-content']} >
        {description}
        <div className={styles.stacks}>
          {icons.map(iconSrc => (
            <div className={styles['icon-container']} key={iconSrc}>
              <div className={styles.icon}>
                <Image src={iconSrc} alt="spring" fill />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};