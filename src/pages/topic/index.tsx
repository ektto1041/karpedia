import TopicsScreen from "@/screens/topic";
import { TopicsByCategory } from "@/types/category";
import { apis } from "@/utils/api"

export type TopicsProps = {
  categoriesWithTopics: TopicsByCategory[];
};

export default function Topics({
  categoriesWithTopics,
}: TopicsProps) {
  return (
    <TopicsScreen categoriesWithTopics={categoriesWithTopics} />
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