import styles from './Content.module.css';
import ProjectImage from './ProjectImage';
import Section from './Section';

export default function WPlannerContent() {
  return (
    <div className={styles.container}>
      <ProjectImage src='/w-planner-img.png' alt='w-planner image' />
      <Section sectionKey={'wp-1'} content={[
        { tag: 'h2', content: 'W Planner' },
        { tag: 'p', content: 'W Planner는 2024.01 부터 진행중인 프로젝트로, 일정을 더 체계적으로 관리할 수 있게 카테고리, 우선순위 등의 기능을 추가한 캘린더 웹 서비스로, 현재 배포되어 운영되고 있습니다.' },
      ]} />
      <Section sectionKey={'wp-2'} content={[
        { tag: 'h2', content: '팀원' },
        { tag: 'p', content: '총 4인 (1 PM, 1 FE, 1 BE, 1 Design)으로, 저는 FE 담당으로 참여하였습니다.' },
      ]} />
      <Section sectionKey={'wp-3'} content={[
        { tag: 'h2', content: '사용한 기술' },
        { tag: 'li', content: 'Next.js' },
        { tag: 'li', content: 'typescript' },
        { tag: 'li', content: 'styled-components' },
        { tag: 'li', content: 'day.js' },
        { tag: 'li', content: 'ContextAPI' },
        { tag: 'li', content: 'SWR' },
        { tag: 'li', content: 'vercel' },
      ]} />
      <Section sectionKey={'wp-4'} content={[
        { tag: 'h2', content: '개발한 기능' },
        { tag: 'h3', content: 'Google Login 구현', children: [
          { tag: 'p', content: 'Google Login API 를 이용하여 소셜 로그인 구현하였습니다. JWT Token을 Local Storage에 저장하여 보관하고, 인증이 필요한 요청마다 헤더에 포함하여 전송하는 방식을 선택했습니다.' },
        ] },
        { tag: 'h3', content: 'v1.0.0의 모든 UI 컴포넌트 구현', children: [
          { tag: 'p', content: '캘린더를 포함한 W Planner v1.0.0에 사용된 모든 컴포넌트를 styled-component를 활용하여 직접 구현하였습니다.' }
        ] },
        { tag: 'h3', content: 'SWR을 활용한 Data-fetching', children: [
          { tag: 'p', content: 'SWR을 활용하여 Data를 조회하여 사용자 경험을 높이기 위해 노력했습니다. 또, SWR 설정을 프로젝트에 맞게 수정하여 최적의 API 요청을 위해 노력하고 있습니다.' }
        ] },
        { tag: 'h3', content: 'Modal, Popup을 ContextAPI를 통해 관리', children: [
          { tag: 'p', content: '모든 Modal과 Popup을 Context를 이용해 관리함으로써 특정 페이지, 컴포넌트에 의존하지 않는 구조를 구현하였습니다.' }
        ] },
        { tag: 'h3', content: 'CSS Animation, Transition을 활용한 애니메이션 처리', children: [
          { tag: 'p', content: 'Modal이 열고 닫힐 때를 비롯한 많은 경우에 애니메이션을 추가하였습니다.' }
        ] },
      ]} />
      <Section sectionKey={'wp-5'} content={[
        { tag: 'h2', content: '협업 방식' },
        { tag: 'h3', content: 'Github', children: [
          { tag: 'p', content: 'main, dev, feature, hotfix 브랜치로 나누어 작업했고, merge는 반드시 Pull Request를 작성하여 진행하였습니다.' },
        ] },
        { tag: 'h3', content: 'Jira', children: [
          { tag: 'p', content: 'Jira를 활용하여 Scrum의 방식을 팀에 맞게 적용하였습니다.' },
        ] },
        { tag: 'h3', content: 'Slack', children: [
          { tag: 'p', content: '이슈들을 Slack을 통해 공유하였습니다.' },
        ] },
        { tag: 'h3', content: 'Figma', children: [
          { tag: 'p', content: 'Figma를 통해 디자인된 UI를 확인하고, 이를 구현하였습니다.' },
        ] },
      ]} />
      <Section sectionKey={'wp-6'} content={[
        { tag: 'h2', content: '이슈들' },
        { tag: 'h3', content: '왜 Next.js 14 를 사용하였나', children: [
          { tag: 'p', content: '캘린더 자체는 사용자와의 상호작용이 많고, 변화도 잦기 때문에 CSR에 적합하지만, 기획 초기에는 SSR에 적합한 페이지 또한 기획되어 있었기에, 이러한 점에 유리한 Next.js 14 를 사용하여 개발을 시작하였습니다. 하지만 개발을 진행하며 기획이 다소 변경되어 현재는 모든 페이지가 CSR 방식으로 렌더링되고 있습니다.' },
        ] },
        { tag: 'h3', content: '왜 ContextAPI 를 사용하였나', children: [
          { tag: 'p', content: 'W Planner는 규모가 작은 프로젝트라 생각했습니다. 또한 관리하려는 전역 상태가 복잡하지 않은 데이터였기 때문에 굳이 외부 라이브러리를 사용하지 않고 Context API를 사용하여 전역 상태 관리를 구현하였습니다.' },
        ] },
        { tag: 'h3', content: '캘린더를 직접 구현한 이유', children: [
          { tag: 'p', content: 'W Planner의 캘린더는 일반적인 캘린더와는 달리 카테고리를 항상 표시해야하는 특징과 기타 다른 여러 특징이 있기에, 직접 캘린더를 구현하였습니다.' },
        ] },
        { tag: 'h3', content: 'vercel을 이용해 배포한 이유', children: [
          { tag: 'p', content: '현재 프로젝트는 베타 버전이기 때문에 많은 수의 사용자를 대상으로 하지 않았고, 상업적으로 이용하지 않고 있기 때문에, 관리가 쉽고 CI/CD까지 지원하는 vercel을 이용하여 배포하게 되었습니다.' },
        ] },
      ]} />
    </div>
  ) 
}