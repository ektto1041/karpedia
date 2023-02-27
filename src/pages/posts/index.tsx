import PostsScreen from "@/screens/posts";
import { PostsProps } from "@/types/post";

export default function Posts({
  topics
}: PostsProps) {
  return <PostsScreen topics={topics} />;
};

export async function getStaticProps() {
  // 임시 데이터
  const data = [
    { name: 'Javascript' },
    { name: 'React' },
    { name: 'Next' },
    { name: 'Node' },
    { name: 'C' },
    { name: 'Java' },
    { name: 'Css' },
    { name: 'HTML' },
  ];

  const topics = data.map(topic => topic.name);

  return {
    props: {
      topics,
    }
  }
};