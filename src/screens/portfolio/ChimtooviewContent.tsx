import styles from './Content.module.css';
import ProjectImage from './ProjectImage';
import Section from './Section';

export default function ChimtooviewContent() {
  return (
    <div className={styles.container}>
      <ProjectImage src='/chimtooview.png' alt='chimtooview image' />
      <Section sectionKey={'ct-1'} content={[
        { tag: 'h2', content: 'Chimtooview' },
        { tag: 'p', content: 'Chimtooview는 2020.10부터 2021.01 까지 진행했던 프로젝트로, 특정 Youtube 채널의 영상 통계를 보여주고, 검색 기능을 제공하는 웹 서비스입니다. 현재는 배포되어 있지 않습니다.' },
      ]} />
      <Section sectionKey={'ct-2'} content={[
        { tag: 'h2', content: '팀원' },
        { tag: 'p', content: '혼자 진행하였습니다.' },
      ]} />
      <Section sectionKey={'ct-3'} content={[
        { tag: 'h2', content: '사용한 기술' },
        { tag: 'li', content: 'React.js' },
        { tag: 'li', content: 'Ant Design' },
        { tag: 'li', content: 'react-router-dom' },
        { tag: 'li', content: 'Styled-Components' },
        { tag: 'li', content: 'Axios' },
        { tag: 'li', content: 'Sun Editor' },
        { tag: 'li', content: 'Spring' },
        { tag: 'li', content: 'Spring Data JPA' },
        { tag: 'li', content: 'MySQL' },
        { tag: 'li', content: 'AWS' },
      ]} />
      <Section sectionKey={'ct-4'} content={[
        { tag: 'h2', content: '개발한 기능' },
        { tag: 'h3', content: 'Antd 컴포넌트 활용', children: []},
        { tag: 'h3', content: 'react-router-dom 을 활용한 라우팅', children: []},
        { tag: 'h3', content: 'AWS S3를 활용한 클라이언트 정적 배포, EC2를 활용한 서버 배포', children: []},
        { tag: 'h3', content: 'Youtube Data API 를 활용하여 Youtube 채널의 영상 데이터를 조회함', children: []},
      ]} />
    </div>
  ) 
}