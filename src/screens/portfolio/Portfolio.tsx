import styles from './Portfolio.module.css';
import ProjectItem, { Project } from './ProjectItem';
import MyProfile from './MyProfile/MyProfile';
import React, { useCallback, useState } from 'react';
import css from '@/utils/css';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiChevronRight, mdiCodeBraces, mdiUnfoldMoreVertical } from '@mdi/js';
import LineNumList from './LineNumList';
import AboutMeContent from './AboutMeContent';
import WPlannerContent from './WPlannerContent';

const projects: Project[] = [
  {
    bgImg: '/karpedia.png',
    figcaption: 'Karpedia 대표 이미지',
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
    icons: [
      { url: "/next.svg", caption: "Next.js" },
      { url: "/vercel.svg", caption: "Vercel" },
      { url: "nest-logo.svg", caption: "Nest.js" },
      { url: "/aws-logo.svg", caption: "AWS" },
    ],
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
    figcaption: 'gigs 대표 이미지',
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
    icons: [
      { url: "/react-logo.svg", caption: "React.js" },
      { url: "/spring-logo.svg", caption: "Spring" },
      { url: "/mysql-logo.svg", caption: "MySQL" },
      { url: "/aws-logo.svg", caption: "AWS" },
    ],
    histories: [
      'React.js를 활용하여 클라이언트 구축',
      'MUI를 활용하여 스타일링',
      'Kakao, Naver login 구현',
      'AWS를 활용하여 배포',
    ],
  },
  {
    bgImg: '/chimtooview.png',
    figcaption: '침투뷰 대표 이미지',
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
    icons: [
      { url: "/react-logo.svg", caption: "React.js" },
      { url: "/spring-logo.svg", caption: "Spring" },
      { url: "/mysql-logo.svg", caption: "MySQL" },
      { url: "/aws-logo.svg", caption: "AWS" },
    ],
    histories: [
      'React.js를 활용하여 클라이언트 구축',
      'Spring을 활용하여 서버 구축',
      'Ant Design을 활용하여 스타일링',
      'MySQL을 활용하여 DB 구축',
      'AWS를 활용하여 배포',
    ],
  },
]

export type FileName = 'about_me.html' | 'w_planner.html' | 'karpedia.html' | 'gigs.html' | 'chimtooview.html'

function PortfolioScreen() {
  const [currentFile, setCurrentFile] = useState<FileName>('about_me.html');
  const [isSrcOpen, setSrcOpen] = useState(true);

  const handleSrcClick = useCallback(() => {
    setSrcOpen(!isSrcOpen);
  }, [isSrcOpen]);

  const handleFileClick = useCallback((file: FileName) => {
    setCurrentFile(file);
  }, []);

  return (
    <main className={styles.container} >
      <div className={styles.explorer}>
        <div className={styles.title}>EXPLORER</div>
        <div className={css(styles['file-line'], styles['list-title']) }>KARPEDIA</div>
        <div className={css(styles['file-line'], styles.ignored)} style={{ paddingLeft: '19px'}}>
          <div className={styles.icon}>
            <Icon path={mdiChevronRight} />
          </div>
          .next
        </div>
        <div className={css(styles['file-line'], styles.ignored)} style={{ paddingLeft: '19px'}}>
          <div className={styles.icon}>
            <Icon path={mdiChevronRight} />
          </div>
          node_modules
        </div>
        <div className={styles['file-line']} style={{ paddingLeft: '19px'}} onClick={handleSrcClick}>
          <div className={styles.icon}>
            <Icon path={isSrcOpen ? mdiChevronDown : mdiChevronRight} />
          </div>
          src
        </div>
        {isSrcOpen && (
          <>
            <div className={styles['file-line']} style={{ paddingLeft: '28.5px'}}>
              <div className={styles.icon}>
                <Icon path={mdiChevronDown} />
              </div>
              portfolio
            </div>
            <div
              className={css(styles['file-line'], currentFile === 'about_me.html' ? styles.opened : '')}
              style={{ paddingLeft: '38px'}}
              onClick={() => handleFileClick('about_me.html')}
            >
              <div className={styles.icon}>
                <Icon path={mdiUnfoldMoreVertical} />
              </div>
              about_me.html
            </div>
            <div
              className={css(styles['file-line'], currentFile === 'w_planner.html' ? styles.opened : '')}
              style={{ paddingLeft: '38px'}}
              onClick={() => handleFileClick('w_planner.html')}
            >
              <div className={styles.icon}>
                <Icon path={mdiUnfoldMoreVertical} />
              </div>
              w_planner.html
            </div>
          </>  
        )}
      </div>
      <div className={styles['content']}>
        <div className={styles['file-tab-list']}>
          <div className={styles['file-tab']}>
            <div className={styles.icon}>
              <Icon path={mdiUnfoldMoreVertical} />
            </div>
            about_me.html
          </div>
        </div>
        <div className={styles.path}>
          {`src > portfolio >`}
          &nbsp;
          <div className={styles.icon}>
            <Icon path={mdiUnfoldMoreVertical} />
          </div>
          {currentFile}
        </div>
        <div key={`pf-${currentFile}`} className={styles.editor}>
          <LineNumList maxNum={currentFile === 'about_me.html' ? 28 : (currentFile === 'w_planner.html' ? 50 : 0)} />
          <div className={styles.code}>
            <div className={styles.line}>
              {'<!DOCTYPE html>'}
            </div>
            <div className={styles.line}>
              {'<html lang="ko">'}
            </div>
            <div className={styles.line}>
              {'<head>'}
            </div>
            <div className={styles.line}>
              &nbsp;&nbsp;{'<title>About Me</title>'}
            </div>
            <div className={styles.line}>
              {'</head>'}
            </div>
            <div className={styles.line}>
              {'<body>'}
            </div>
            {currentFile === 'about_me.html' ? <AboutMeContent onFileClick={handleFileClick} /> :
              (currentFile === 'w_planner.html' ? <WPlannerContent /> : <></>)}
            <div className={styles.line}>
              {'</body>'}
            </div>
            <div className={styles.line}>
              {'</html>'}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
};

export default React.memo(PortfolioScreen);