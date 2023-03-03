import PostDetailScreen from "@/screens/posts/[id]";
import { CommentType, PostDetailProps, PostType } from "@/types/post";
import db from "@/utils/db";
import { GetStaticPropsContext } from "next";

export default function PostDetail({
  post,
}: PostDetailProps) {
  return <PostDetailScreen post={post} />
};

export async function getStaticPaths() {
  const ids = await db.getTopViewCountPostIds();
  const paths = ids.map(id => ({ params: { id } }));

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