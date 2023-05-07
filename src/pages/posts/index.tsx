import PostsScreen from "@/screens/posts";
import { PostItemDto, PostsProps, PostsEntity, TopicsEntity, PostsPaging } from "@/types/post";
import { apis } from "@/utils/api";
import time from "@/utils/time";
import { GetServerSidePropsContext } from "next";

export default function Posts({
  topics,
  selectedTopics,
  postItems,
  page,
  maxPage,
}: PostsProps) {
  return <PostsScreen topics={topics} selectedTopics={selectedTopics} postItems={postItems} page={page} maxPage={maxPage} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const paging: PostsPaging = {
    page: context.query.page ? parseInt(context.query.page as string) : 0,
    keyword: context.query.keyword ? context.query.keyword as string : '',
    topics: context.query.topics ? (context.query.topics as string).split(',') : [],
  };
  
  // 모든 토픽을 가져옴
  const topics: TopicsEntity[] = (await apis.getAllTopics()).data;

  // 포스트들을 페이징해서 가져옴
  const {data, maxPage} = (await apis.getAllPostPaging(paging)).data;
  
  return {
    props: {
      topics: topics.map(t => t.name),
      selectedTopics: paging.topics,
      postItems: data,
      page: paging.page,
      maxPage,
    }
  }
};