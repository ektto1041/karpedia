import styles from './Content.module.css';
import ProjectImage from './ProjectImage';
import Section from './Section';

export default function GigsContent() {
  return (
    <div className={styles.container}>
      <ProjectImage src='/gigs.png' alt='gigs image' />
      <Section sectionKey={'gs-1'} content={[
        { tag: 'h2', content: 'gigs' },
        { tag: 'p', content: 'gigs는 2022.10부터 2023.01 까지 진행했던 토이 프로젝트로, 무명 아티스트들을 위한 장소 대여 중개 플랫폼입니다. 현재는 배포되어 있지 않습니다.' },
      ]} />
      <Section sectionKey={'gs-2'} content={[
        { tag: 'h2', content: '팀원' },
        { tag: 'p', content: 'FE 2, BE 2 로 이루어진 팀으로 진행한 프로젝트로, 저는 FE를 담당하였습니다.' },
      ]} />
      <Section sectionKey={'gs-3'} content={[
        { tag: 'h2', content: '사용한 기술' },
        { tag: 'li', content: 'React.js' },
        { tag: 'li', content: 'Material UI' },
        { tag: 'li', content: 'react-router-dom' },
        { tag: 'li', content: 'Styled-Components' },
        { tag: 'li', content: 'Axios' },
        { tag: 'li', content: 'Sun Editor' },
        { tag: 'li', content: 'Kakao, Naver Login' },
        { tag: 'li', content: 'AWS' },
      ]} />
      <Section sectionKey={'gs-4'} content={[
        { tag: 'h2', content: '개발한 기능' },
        { tag: 'h3', content: 'Social Login 구현', children: [
          { tag: 'p', content: 'Kakao, Naver Login API 를 이용하여 소셜 로그인을 구현하였습니다. JWT Token을 쿠키에 저장하여 보관하고, 인증이 필요한 요청에 포함하여 전송하는 방식을 선택했습니다.' },
        ] },
        { tag: 'h3', content: 'MUI 컴포넌트 활용', children: []},
        { tag: 'h3', content: 'react-router-dom 을 활용한 라우팅', children: []},
        { tag: 'h3', content: 'AWS S3를 활용한 정적 배포', children: [
          { tag: 'p', content: '배포는 프로젝트 빌드 후 AWS S3 버킷에 정적 배포함으로써 진행하였습니다.' },
        ] },
      ]} />
      <Section sectionKey={'gs-5'} content={[
        { tag: 'h2', content: '협업 방식' },
        { tag: 'h3', content: 'Github', children: [
          { tag: 'p', content: 'main, dev, feature, hotfix 브랜치로 나누어 작업했고, merge는 반드시 Pull Request를 작성하여 진행하였습니다.' },
        ] },
        { tag: 'h3', content: 'Figma', children: [
          { tag: 'p', content: 'Figma를 통해 UI를 디자인하고, 이를 구현하였습니다.' },
        ] },
        { tag: 'h3', content: 'Notion', children: [
          { tag: 'p', content: 'Notion을 활용해 백로그를 작성하고 스토리 포인트를 할당하는 등 Scrum을 진행하였습니다. ' },
        ] },
      ]} />
    </div>
  ) 
}