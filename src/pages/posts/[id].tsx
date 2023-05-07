import PostDetailScreen from "@/screens/posts/[id]";
import { CommentsEntity, PostDetailProps, PostsEntity } from "@/types/post";
import { apis } from "@/utils/api";
import time from "@/utils/time";
import { GetStaticPropsContext } from "next";

export default function PostDetail({
  post,
}: PostDetailProps) {
  return <PostDetailScreen post={post} />
};

export async function getStaticPaths() {
  const allPosts: PostsEntity[] = (await apis.getAllPost()).data;

  // TODO: 쿼리로 한 번에 해결
  // build 타임에 실행되기 때문에 급한 수정사항은 아님
  // 1. 최신 수정 포스트 50 개
  const newest = allPosts.sort((a, b) => time.compare(a.modifiedAt, b.modifiedAt)).map(post => post.id).slice(0, 50);

  // 2. 조회 수 높은 50개
  const popular = allPosts.sort((a, b) => b.viewCount - a.viewCount).map(post => post.id).slice(0, 50);

  // 3. 집합으로 중복 제거
  const postIdSet: Set<number> = new Set([...newest, ...popular]);

  const ids = Array.from(postIdSet);
  const paths = ids.map(id => ({ params: { id: String(id) } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = parseInt(context.params!.id as string)
  const post = (await apis.getPostById(id, false)).data;

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