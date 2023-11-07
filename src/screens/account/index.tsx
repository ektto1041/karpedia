import Link from 'next/link';
import styles from './Account.module.css';
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import ProfileTab from './profile-tab/ProfileTab';

type Tab = 'profile' | 'comments' | 'topics';

type TabItem = {
  name: string;
  url: string;
}

const tabList: TabItem[] = [
  { name: '프로필', url: 'profile', },
  { name: '작성 댓글', url: 'comments', },
  { name: '구독한 토픽', url: 'topics', },
];

const componentByTab: {[key: string]: JSX.Element} = {
  profile: (<ProfileTab />)
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

  return (
    <main className={styles.container}>
      <aside className={styles['tab-list']}>
        {tabList.map(tab => (
          <Link key={tab.url} href={`?tab=${tab.url}`} >{tab.name}</Link>
        ))}
      </aside>
      <article className={styles['option-list']}>
        {componentByTab[tab]}
      </article>
    </main>
  );
}