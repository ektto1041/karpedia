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
  histories: string[],
};

type ProjectItemProps = {
  project: Project;
};

export default function ProjectItem({
  project,
}: ProjectItemProps) {
  const {bgImg, href, title, date, icons, description, histories} = project;

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        {/* <Image src={bgImg} alt='project-img' width={700} height={400}/> */}
        <Image src={bgImg} alt='project-img' fill/>
      </div>
      <div className={styles.info}>
        <div className={styles.title} >
          {title}
          <div className={styles.date} >
            {date}
          </div>
        </div>
        <div className={styles['icon-row']} >
          {icons?.map(icon => (
            <TechItem key={icon} src={`${icon}`} />
          ))}
        </div>
        <div className={styles.description} >
          {description}
        </div>
        <div className={styles.histories} >
          진행내용:
          <ul>
            {histories?.map(history => (
              <li key={history} className={styles.history}>
                {history}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};