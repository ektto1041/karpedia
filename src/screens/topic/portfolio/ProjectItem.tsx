import Image from 'next/image';
import styles from './ProjectItem.module.css';
import TechItem from './TechItem';

export type Project = {
  bgImg: string,
  href: string,
  title: string,
  date: string,
  description: JSX.Element,
  icons: string[],
};

type ProjectItemProps = {
  project: Project;
};

export default function ProjectItem({
  project,
}: ProjectItemProps) {
  const {bgImg, href, title, date, icons, description} = project;

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <Image src={bgImg} alt='project-img' width={700} height={400}/>
      </div>
      <div className={styles.description}>
        <div className={styles.title} >
          {title}
        </div>
        <div className={styles.date} >
          {date}
        </div>
        <div className={styles['icon-row']} >
          {icons?.map(icon => (
            <TechItem key={icon} src={`${icon}`} />
          ))}
        </div>
        <div className={styles.desc} >
          {description}
        </div>
      </div>
    </div>
  );
};