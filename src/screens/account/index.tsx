import Link from 'next/link';
import styles from './Account.module.css';
import { useRouter } from "next/router";
import { useMemo } from "react";
import ProfileTab from './profile-tab/ProfileTab';
import useAppSelector from '@/hooks/useAppSelector';
import { selectSelfUser } from '@/redux/slices/AuthSlice';
import CommentTab from './comment-tab/CommentTab';

type Tab = 'profile' | 'comments' | 'topics';

type TabItem = {
  name: string;
  url: Tab;
}

const tabList: TabItem[] = [
  { name: '프로필', url: 'profile', },
  { name: '작성 댓글', url: 'comments', },
  { name: '구독한 토픽', url: 'topics', },
];

const componentByTab: {[key: string]: JSX.Element} = {
  profile: (<ProfileTab />),
  comments: (<CommentTab />),
}

export default function AccountScreen() {
  const router = useRouter();
  const tab = useMemo<Tab>(() => {
    const query: string = router.query.tab as string;

    return (
      query === 'comments' ||
      query === 'topics'
    ) ? query : 'profile';
  }, [router]);

  const selfUser = useAppSelector(selectSelfUser);

  return (
    <main className={styles.container}>
      {selfUser ? (
        <>
          <aside className={styles['tab-list']}>
            {tabList.map(tabItem => (
              <Link key={tabItem.url} href={`?tab=${tabItem.url}`} className={tab === tabItem.url ? styles.current : ''} >{tabItem.name}</Link>
            ))}
          </aside>
          <article className={styles['option-list']}>
            {componentByTab[tab]}
          </article>
        </>
      ) : (
        <div className={styles.warning}>로그인 후 이용해주세요</div>
      )}
    </main>
  );
}