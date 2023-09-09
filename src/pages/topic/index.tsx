import TopicsScreen from "@/screens/topic";
import { TopicsByCategory, TopicsProps } from "@/types/topic";
import { apis } from "@/utils/api"

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

  topics.sort((a, b) => (a.categoriesId - b.categoriesId));
  const categoriesWithTopics: TopicsByCategory[] = categories.map(c => ({ ...c, topics: topics.filter(t => t.categoriesId === c.id), }));

  
  return {
    props: {
      categoriesWithTopics
    }
  }
}