import styles from './Content.module.css';
import ProjectImage from './ProjectImage';
import Section from './Section';

export default function KarpediaContent() {
  return (
    <div className={styles.container}>
      <ProjectImage src='/karpedia.png' alt='karpedia image' />
      <Section sectionKey={'kp-1'} content={[
        { tag: 'h2', content: 'Karpedia' },
        { tag: 'p', content: 'Karpedia는 2023.03부터 진행중인 프로젝트로, 저의 개발 블로그이자 포트폴리오입니다. 현재 배포되어 운영되고 있습니다.' },
      ]} />
      <Section sectionKey={'kp-2'} content={[
        { tag: 'h2', content: '팀원' },
        { tag: 'p', content: '혼자 진행한 프로젝트입니다.' },
      ]} />
      <Section sectionKey={'kp-3'} content={[
        { tag: 'h2', content: '사용한 기술' },
        { tag: 'h3', content: 'FE', children: [
          { tag: 'li', content: 'Next.js - page router' },
          { tag: 'li', content: 'typescript' },
          { tag: 'li', content: 'css module' },
          { tag: 'li', content: 'TipTap Editor' },
          { tag: 'li', content: 'Axios' },
          { tag: 'li', content: 'Day.js' },
          { tag: 'li', content: 'Redux' },
          { tag: 'li', content: 'ContextAPI' },
          { tag: 'li', content: 'SWR' },
          { tag: 'li', content: 'vercel' },
        ] },
        { tag: 'h3', content: 'BE', children: [
          { tag: 'li', content: 'Nest.js' },
          { tag: 'li', content: 'typescript' },
          { tag: 'li', content: 'Express' },
          { tag: 'li', content: 'MySQL' },
          { tag: 'li', content: 'Docker' },
          { tag: 'li', content: 'AWS EC2, S3, Route53 등' },
        ] },
      ]} />
      <Section sectionKey={'kp-4'} content={[
        { tag: 'h2', content: '개발한 기능' },
        { tag: 'h3', content: 'Google Login 구현', children: [
          { tag: 'p', content: 'Google Login API 를 이용하여 소셜 로그인을 구현하였습니다. JWT Token을 쿠키에 저장하여 보관하고, 인증이 필요한 요청에 포함하여 전송하는 방식을 선택했습니다.' },
        ] },
        { tag: 'h3', content: '모든 컴포넌트 구현', children: [
          { tag: 'p', content: '모든 컴포넌트를 css-module을 활용하여 직접 구현하였습니다.' },
        ] },
        { tag: 'h3', content: '페이지별 다른 렌더링 방식 적용', children: [
          { tag: 'p', content: 'Next.js 의 기능을 활용하여 페이지마다의 특성을 고려한 다른 렌더링 방식을 적용하였습니다. 이를 통해 사용자 경험을 높이기 위해 노력했습니다.' },
        ] },
        { tag: 'h3', content: 'SWR을 활용한 Data-fetching', children: [
          { tag: 'p', content: 'SWR을 활용하여 Data를 조회하여 사용자 경험을 높이기 위해 노력했습니다. 또, SWR 설정을 프로젝트에 맞게 수정하여 최적의 API 요청을 위해 노력하고 있습니다.' },
        ] },
        { tag: 'h3', content: 'Redux를 통한 전역 상태 관리', children: [
          { tag: 'p', content: 'Redux를 활용하여 전역 상태를 관리하고 있습니다.' },
        ] },
        { tag: 'h3', content: 'Docker를 활용한 개발 환경 통일', children: [
          { tag: 'p', content: '서버를 Docker Image로 만들어 관리함으로써 AWS EC2 환경에서도 편리하게 배포할 수 있게 진행하였습니다.' },
        ] },
      ]} />
      <Section sectionKey={'kp-5'} content={[
        { tag: 'h2', content: '협업 방식' },
        { tag: 'h3', content: 'Github', children: [
          { tag: 'p', content: 'main, dev, feature, hotfix 브랜치로 나누어 작업했고, merge는 반드시 Pull Request를 작성하여 진행하였습니다.' },
        ] },
        { tag: 'h3', content: 'Figma', children: [
          { tag: 'p', content: 'Figma를 통해 UI를 디자인하고, 이를 구현하였습니다.' },
        ] },
      ]} />
      <Section sectionKey={'kp-6'} content={[
        { tag: 'h2', content: '이슈들' },
        { tag: 'h3', content: '왜 Next.js를 사용하였나', children: [
          { tag: 'p', content: '데이터 변화가 잦지 않고 데이터 변화 시점이 예측 가능한 블로그의 특징에 주목하였습니다. 따라서 페이지마다 다른 렌더링 방식을 적용할 수 있는 Next.js를 활용하여 개발하게 되었습니다.' },
        ] },
        { tag: 'h3', content: 'vercel을 이용해 배포한 이유', children: [
          { tag: 'p', content: 'Karpedia는 상업적으로 이용하지 않고 있기 때문에, 관리가 쉽고 CI/CD까지 지원하는 vercel을 이용하여 배포하게 되었습니다.' },
        ] },
      ]} />
    </div>
  ) 
}