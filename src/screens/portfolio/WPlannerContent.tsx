import styles from './Content.module.css';
import ProjectImage from './ProjectImage';
import Section from './Section';

export default function WPlannerContent() {
  return (
    <div className={styles.container}>
      <ProjectImage src='/w-planner-img.png' alt='w-planner image' />
      <Section sectionKey={'wp-1'} content={[
        { tag: 'h2', content: 'W Planner' },
        { tag: 'p', content: 'W Planner는 2024.01 부터, 총 4인의 팀원(PM 1, FE 1, BE 1, Design 1)과 함께 진행 중인 프로젝트입니다. 일정을 더 체계적으로 관리할 수 있게 카테고리, 우선순위 등의 기능을 추가한 캘린더 웹 서비스로, 현재 배포되어 운영되고 있습니다.' },
      ]} />
      <Section sectionKey={'wp-2'} content={[
        { tag: 'h2', content: '사용한 기술' },
        { tag: 'p', content: 'Next.js typescript styled-components day.js ContextAPI' },
      ]} />
      <Section sectionKey={'wp-3'} content={[
        { tag: 'h2', content: '개발한 기능' },
        { tag: 'h3', content: 'Google Login 구현', children: [
          { tag: 'p', content: 'Google Login API 를 이용하여 소셜 로그인을 구현하였습니다. JWT Token을 Local Storage에 저장하여 보관하고, 인증이 필요한 요청마다 헤더에 포함하여 전송하는 방식을 선택했습니다.' },
        ] },
        { tag: 'h3', content: '모든 UI 구현', children: [
          { tag: 'p', content: '서비스의 모든 UI를 styled-component를 활용하여 직접 구현하였습니다.' }
        ] },
        { tag: 'h3', content: '캘린더 컴포넌트 구현', children: [
          { tag: 'p', content: '특수한 기능이 포함된 캘린더였기에 외부 라이브러리 없이 직접 캘린더를 구현하였습니다.' }
        ] },
      ]} />
      <Section sectionKey={'wp-4'} content={[
        { tag: 'h2', content: '이슈들' },
        { tag: 'p', content: 'Google Login 구현' },
        { tag: 'p', content: '모든 UI 구현' },
        { tag: 'p', content: '캘린더 컴포넌트 구현' },
      ]} />
    </div>
  ) 
}