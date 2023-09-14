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
        학습한 내용을 기록하고, 공유하기 위한 개인 블로그입니다.<br />
        포트폴리오로도 사용하고 있습니다.<br />
        혼자 개발하였습니다.
      </>
    ),
    icons: ["/next.svg", "/vercel.svg", "nest-logo.svg", "/aws-logo.svg"],
    histories: [
      'Next.js를 활용하여 페이지마다 다른 렌더링 방식을 고민하고 적용',
      'Next.js를 활용하여 서버 구축',
      'MySQL을 활용하여 DB 구축',
      'Google login 구현',
      'Vercel과 AWS를 활용하여 배포',
    ],
  },
  {
    bgImg: '/gigs.png',
    href: 'https://github.com/signalman/gigs',
    title: 'gigs',
    date: "2022.겨울 ~ 2023.봄",
    description: (
      <>
        무명 아티스트들을 위한 장소 대여 중개 플랫폼입니다.<br />
        아티스트는 서비스에 가입하여 자신을 홍보하고,<br />
        원하는 장소를 예약할 수 있습니다.<br />
        현재는 배포 중단되었습니다.<br />
        교내 공모전에 공모하여 장려상을 수상하였습니다.
      </>
    ),
    icons: ["/react-logo.svg", "/spring-logo.svg", "/mysql-logo.svg", "/aws-logo.svg"],
    histories: [
      'React.js를 활용하여 클라이언트 구축',
      'MUI를 활용하여 스타일링',
      'Kakao, Naver login 구현',
      'AWS를 활용하여 배포',
    ],
  },
  {
    bgImg: '/chimtooview.png',
    href: 'https://github.com/ektto1041/Chimtooview',
    title: '침투뷰 CHIMTOOVIEW',
    date: "2020.겨울 ~ 2021.봄",
    description: (
      <>
        Youtube 채널의 통계를 보여주고,<br />
        원하는 조건으로 영상을 검색할 수 있는 웹 서비스입니다.<br />
        배포하여 실제 사용자들에게 피드백을 받아가며 운영을 했습니다.<br />
        현재는 배포 중단되었습니다.
      </>
    ),
    icons: ["/react-logo.svg", "/spring-logo.svg", "/mysql-logo.svg", "/aws-logo.svg"],
    histories: [
      'React.js를 활용하여 클라이언트 구축',
      'Spring을 활용하여 서버 구축',
      'Ant Design을 활용하여 스타일링',
      'MySQL을 활용하여 DB 구축',
      'AWS를 활용하여 배포',
    ],
  },
]

export default function PortfolioScreen() {
  return (
    <div className={styles.container} >
      <div className={styles['profile-box']} >
        <div className={styles.deco} />
        <div className={styles['background']}>
          <div className={styles.resume} >
            이 력 서
          </div>
          <div className={styles['sub-info']}>
            <OldForm />
          </div>
        </div>
        <div className={styles['main-info']}>
          <div className={styles['image-container']}>
            <Image src='/profile-img.png' alt='profile-image' fill={true} />
          </div>
          <div className={styles['profile-content']}>
            <h1>박상연</h1>
            <h2>많은 사람들에게 영향을 줄 수 있는 <br className={styles['new-line']} /><span>웹 개발자</span>가 되고 싶습니다.</h2>
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
            <ProjectItem key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
};