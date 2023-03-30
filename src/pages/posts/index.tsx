import PostsScreen from "@/screens/posts";
import { PostItemType, PostsProps, PostType } from "@/types/post";
import db from "@/utils/db";
import time from "@/utils/time";
import { GetServerSidePropsContext } from "next";

const PAGE_SIZE = 3;

export default function Posts({
  topics,
  postItems,
}: PostsProps) {
  return <PostsScreen topics={topics} postItems={postItems} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const page: number = context.query.page ? parseInt(context.query.page as string) : 0;
  const keyword: string = context.query.keyword ? context.query.keyword as string : '';
  const topics: string[] = context.query.topics ? (context.query.topics as string).split(',') : [];
  
  // DB 상의 모든 데이터를 가져옴
  const topicSet = new Set<string>();
  const postItems = (await db.getAllPosts()).map(postItem => {
    const data = postItem as PostType;
    const result: PostItemType = {
      id: data.id,
      emoji: data.emoji,
      title: data.title,
      topics: data.topics,
      modifiedAt: time.toFormat(data.modifiedAt),
    }

    // 시점 이슈 발생할 수 있음!
    data.topics.forEach(topic => topicSet.add(topic));

    return result;
  });

  // keyword, topics 로 필터링
  const filteredPostItems = postItems.filter(postItem => {
    const hasKeyword = postItem.title.includes(keyword);
    if(!hasKeyword) return false;

    for(const topic of topics) {
      const hasTopic = postItem.topics.includes(topic);
      if(!hasTopic) return false;
    }

    return true;
  });
  
  return {
    props: {
      topics: Array.from(topicSet),
      postItems: filteredPostItems.slice(page * PAGE_SIZE, (page+1) * PAGE_SIZE),
    }
  }
};