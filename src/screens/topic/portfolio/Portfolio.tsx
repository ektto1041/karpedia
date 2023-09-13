import Image from 'next/image';
import styles from './Portfolio.module.css';
import OldForm from './OldForm';
import ProjectItem, { Project } from './ProjectItem';

const projects: Project[] = [
  {
    bgImg: '/karpedia.png',
    href: 'https://github.com/ektto1041/karpedia',
    title: 'Karpedia',
    date: '2023.봄 ~ 진행중',
    description: (
      <>
        공부하는 내용들을 정리하기 위한 블로그이자, 포트폴리오입니다.<br />
        또, 배운 내용들을 실제로 적용해보는 실습 재료이기도 합니다.<br />
        계속해서 유지보수를 하고 있고, 포스트도 업로드하고 있습니다.<br />
      </>
    ),
    icons: ["/next.svg", "/vercel.svg", "nest-logo.svg", "/aws-logo.svg"],
  },
  {
    bgImg: '/gigs.png',
    href: 'https://github.com/signalman/gigs',
    title: 'gigs',
    date: "2022.겨울 ~ 2023.봄",
    description: (
      <>
        웹 개발과 개발 프로세스를 공부한 뒤 팀원을 모아 진행한 프로젝트입니다.<br />
        저는 Frontend 담당으로 참여하였고, React.js 프레임워크를 이용해 구현하였습니다.<br />
        설 무대가 많지 않은 인디 가수들과,<br />
        무대로써 자신의 장소를 제공하고자 하는 무대 제공자를 위한 플랫폼으로<br />
        현재 배포되어 있지만, 운영이 되고 있지는 않습니다.
      </>
    ),
    icons: ["/react-logo.svg", "/spring-logo.svg", "/mysql-logo.svg", "/aws-logo.svg"],
  },
  {
    bgImg: '/chimtooview.png',
    href: 'https://github.com/ektto1041/Chimtooview',
    title: '침투뷰 CHIMTOOVIEW',
    date: "2020.겨울 ~ 2021.봄",
    description: (
      <>
        웹 개발을 처음 배우기 시작했던 때, 좋아하던 유투버인 침착맨을 주제로 진행해본 프로젝트입니다.<br />
        침착맨 채널 모든 영상을 다양한 조건으로 정렬해서 보여주는 기능을 가지고 있었습니다.<br />
        이외에도 게시판, 공지사항 등이 구현되어 있었습니다.<br />
        씩씩하게 시작했던 프로젝트지만, 기술적 한계로 인해 개발과 배포를 멈추었습니다.
      </>
    ),
    icons: ["/react-logo.svg", "/spring-logo.svg", "/mysql-logo.svg", "/aws-logo.svg"],
  },
]

export default function PortfolioScreen() {
  return (
    <div className={styles.container} >
      <div className={styles['profile-box']} >
        <div className={styles.deco} />
        <div className={styles['background']}>
          <div className={styles['main-block']} >
            <div className={styles.resume} >
              이 력 서
            </div>
            <div className={styles['sub-info']}>
              <OldForm />
            </div>
          </div>
        </div>
        <div className={styles['main-info']}>
          <div className={styles['image-container']}>
            <Image src='/profile-img.png' alt='profile-image' fill={true} />
          </div>
          <div className={styles['profile-content']}>
            <h1>박상연</h1>
            <h2>많은 사람들에게 영향을 줄 수 있는 <span>웹 개발자</span>가 되고 싶습니다.</h2>
            <div className={styles['div-line']} />
            <ul>
              <li>
                <span>☎️ 010-2879-5282</span>
              </li>
              <li>
                <span>✉️ dhkdwk1041@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
      <div className={styles['project-box']}>
        <h1>프로젝트</h1>
        <div className={styles['project-list']} >
          {projects.map(project => (
            <ProjectItem project={project} />
          ))}
        </div>
      </div>
    </div>
  )
};