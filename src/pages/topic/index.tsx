import TopicsScreen from "@/screens/topic";
import { TopicsByCategory } from "@/types/category";
import { apis } from "@/utils/api"
import Head from "next/head";

export type TopicsProps = {
  categoriesWithTopics: TopicsByCategory[];
};

export default function Topics({
  categoriesWithTopics,
}: TopicsProps) {
  return (
    <>
      <Head>
        <title>토픽들</title>
        <meta name="description" content="Karpedia가 다루는 모든 토픽들입니다. 궁금하신 토픽을 선택해보세요." />
      </Head>
      <TopicsScreen categoriesWithTopics={categoriesWithTopics} />  
    </>
  )
}

export async function getStaticProps() {
  const response = await apis.getAllTopicsWithCategories();
  const { categories, topics } = response.data;

  const categoriesWithTopics: TopicsByCategory[] = categories.map(c => ({ ...c, topics: topics.filter(t => t.categoriesId === c.id), }));
  
  return {
    props: {
      categoriesWithTopics
    }
  }
}