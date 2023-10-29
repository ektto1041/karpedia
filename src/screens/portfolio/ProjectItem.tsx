import Image from 'next/image';
import styles from './ProjectItem.module.css';
import TechItem from './TechItem';

type TechIcon = {
  url: string,
  caption: string,
}

export type Project = {
  bgImg: string,
  figcaption: string,
  href: string,
  title: string,
  date: string,
  description: JSX.Element,
  icons: TechIcon[],
  histories: string[],
};

type ProjectItemProps = {
  project: Project;
};

export default function ProjectItem({
  project,
}: ProjectItemProps) {
  const {bgImg, figcaption, href, title, date, icons, description, histories} = project;

  return (
    <section className={styles.container}>
      <figure className={styles.img}>
        <Image src={bgImg} alt='project-img' fill/>
        <figcaption>{figcaption}</figcaption>
      </figure>
      <div className={styles.info}>
        <div className={styles.primary}>
          <h1>{title}</h1>
          <section className={styles.date} >
            <h2 className='invisible'>프로젝트 수행 기간</h2>
            {date}
          </section>
        </div>
        <section className={styles['icon-row']} >
          <h2 className='invisible'>기술 스택</h2>
          {icons?.map(icon => (
            <TechItem key={icon.caption} url={icon.url} caption={icon.caption} />
          ))}
        </section>
        <section className={styles.description} >
          <h2 className='invisible'>프로젝트 설명</h2>
          {description}
        </section>
        <section className={styles.histories} >
          <h2>프로젝트 진행 내용</h2>
          <ul>
            {histories?.map(history => (
              <li key={history} className={styles.history}>
                {history}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};