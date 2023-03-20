import Image from 'next/image';
import CareerItem from './CareerItem';
import styles from './Home.module.css';

export default function HomeScreen() {
  return (
    <div className={styles.container}>
      <div className={styles['profile-box']} >
        <div className={styles['profile-image-box']} >
          <div className={styles['profile-image']} >
            <Image src='/profile-image.jpeg' alt='profile-image' fill={true} />
          </div>
        </div>
        <div className={styles.name}>박상연</div>
      </div>
      <div className={styles.content}>
        <div className={styles['item-container']} >
          <CareerItem
            bgImg='/chimtooview.png'
            color='chimtooview'
            title="침투뷰 CHIMTOOVIEW"
            subTitle='Youtube 채널 통계 확인 사이트'
            when="2020.겨울 ~ 2021.봄"
            description={(
              <>
                웹 개발을 처음 배우기 시작했던 때, 좋아하던 유투버인 침착맨을 주제로 진행해본 프로젝트입니다.<br />
                침착맨 채널 모든 영상을 다양한 조건으로 정렬해서 보여주는 기능을 가지고 있었습니다.<br />
                이외에도 게시판, 공지사항 등이 구현되어 있었습니다.<br />
                씩씩하게 시작했던 프로젝트지만, 기술적 한계로 인해 개발과 배포를 멈추었습니다.
              </>
            )}
            icons={["/react-logo.svg", "/spring-logo.svg", "/mysql-logo.svg", "/aws-logo.svg"]}
          />
          <CareerItem
            bgImg='/gigs.png'
            color='gigs'
            title="gigs"
            subTitle='공연장 대여 중개 플랫폼'
            when="2022.겨울 ~ 2023.봄"
            description={(
              <>
                웹 개발과 개발 프로세스를 공부한 뒤 팀원을 모아 진행한 프로젝트입니다.<br />
                저는 Frontend 담당으로 참여하였고, React.js 프레임워크를 이용해 구현하였습니다.<br />
                설 무대가 많지 않은 인디 가수들과,<br />
                무대로써 자신의 장소를 제공하고자 하는 무대 제공자를 위한 플랫폼으로<br />
                현재 배포되어 있지만, 운영이 되고 있지는 않습니다.
              </>
            )}
            icons={["/react-logo.svg", "/spring-logo.svg", "/mysql-logo.svg", "/aws-logo.svg"]}
          />
          <CareerItem
            bgImg='/karpedia.png'
            color='karpedia'
            title="Karpedia"
            subTitle='블로그 & 포트폴리오'
            when="2023.봄 ~ "
            description={(
              <>
                공부하는 내용들을 정리하기 위한 블로그이자, 포트폴리오입니다.<br />
                또, 배운 내용들을 실제로 적용해보는 실습 재료이기도 합니다.<br />
                계속해서 유지보수를 하고 있고, 포스트도 업로드하고 있습니다.<br />
              </>
            )}
            icons={["/next.svg", "/vercel.svg", "firebase-logo.svg", "/aws-logo.svg"]}
          />
        </div>
      </div>
    </div>
  );
};