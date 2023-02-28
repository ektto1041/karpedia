import PostsScreen from "@/screens/posts";
import { PostDoc, PostItemType, PostsProps } from "@/types/post";
import db from "@/utils/db";
import dayjs from "dayjs";

export default function Posts({
  topics,
  postItems,
}: PostsProps) {
  return <PostsScreen topics={topics} postItems={postItems} />;
};

export async function getStaticProps() {
  const topics = (await db.getAllTopics()).docs.map(topic => topic.data().name);
  const postItems = (await db.getAllPosts()).docs.map(postItem => {
    const data = postItem.data() as PostDoc;
    const result: PostItemType = {
      emoji: data.emoji,
      title: data.title,
      modifiedAt: dayjs(data.modifiedAt.toDate()).format('MMMM D, YYYY'),
    }
    return result;
  });
  
  return {
    props: {
      topics,
      postItems,
    }
  }
};