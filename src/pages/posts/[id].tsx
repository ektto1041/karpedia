import PostDetailScreen from "@/screens/posts/[id]";
import { CommentType, PostDetailProps, PostType } from "@/types/post";
import db from "@/utils/db";
import time from "@/utils/time";
import { GetStaticPropsContext } from "next";

export default function PostDetail({
  post,
}: PostDetailProps) {
  return <PostDetailScreen post={post} />
};

export async function getStaticPaths() {
  const allPosts: PostType[] = await db.getAllPosts();

  // 1. 최신 수정 포스트 50 개
  const newest = allPosts.sort((a, b) => time.compare(a.modifiedAt, b.modifiedAt)).map(post => post.id).slice(0, 50);

  // 2. 조회 수 높은 50개
  const popular = allPosts.sort((a, b) => b.viewCount - a.viewCount).map(post => post.id).slice(0, 50);

  // 3. 집합으로 중복 제거
  const postIdSet: Set<string> = new Set([...newest, ...popular]);

  const ids = Array.from(postIdSet);
  const paths = ids.map(id => ({ params: { id } }));

  console.log(ids);

  return {
    paths,
    fallback: 'blocking',
  };
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params!.id as string
  const post = await db.getPostById(id);

  const hasNoData = !Boolean(post);
  if(hasNoData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    }
  };
};