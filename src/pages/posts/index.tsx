import PostsScreen from "@/screens/posts";
import { PostItemType, PostsProps, PostType } from "@/types/post";
import db from "@/utils/db";
import dayjs from "dayjs";

export default function Posts({
  topics,
  postItems,
}: PostsProps) {
  return <PostsScreen topics={topics} postItems={postItems} />;
};

export async function getStaticProps() {
  const topicSet = new Set<string>();
  const postItems = (await db.getAllPosts()).map(postItem => {
    const data = postItem as PostType;
    const result: PostItemType = {
      id: data.id,
      emoji: data.emoji,
      title: data.title,
      topics: data.topics,
      modifiedAt: dayjs(data.modifiedAt).format('MMMM D, YYYY'),
    }

    // 시점 이슈 발생할 수 있음!
    data.topics.forEach(topic => topicSet.add(topic));

    return result;
  });

  const topics = Array.from(topicSet);
  
  return {
    props: {
      topics,
      postItems,
    }
  }
};