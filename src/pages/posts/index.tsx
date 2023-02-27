import PostsScreen from "@/screens/posts";
import { PostDoc, PostItemType, PostsProps } from "@/types/post";
import db from "@/utils/db";
import dayjs from "dayjs";

export default function Posts({
  topics,
  postItems,
}: PostsProps) {
  return <> <PostsScreen topics={topics} postItems={postItems} /> </>;
};

export async function getStaticProps() {
  const topicSet = new Set<string>();
  const postItems = (await db.getAllPosts()).docs.map(postItem => {
    const data = postItem.data() as PostDoc;
    const result: PostItemType = {
      emoji: data.emoji,
      title: data.title,
      modifiedAt: dayjs(data.modifiedAt.toDate()).format('MMMM D, YYYY'),
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