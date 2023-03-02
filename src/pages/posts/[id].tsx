import PostDetailScreen from "@/screens/posts/[id]";
import { PostDetailProps, PostDetailType, PostType } from "@/types/post";
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";

export default function PostDetail({
  post,
}: PostDetailProps) {
  return <PostDetailScreen post={post} />
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

export async function getStaticProps() {
  // 임시 작성글
  const foundPost: PostType = {
    id: 'abcd',
    title: 'React React Javascript',
    emoji: '😍',
    content: '리액트는 이런겁니다.',
    viewCount: 0,
    topics: ['Java'],
    createdAt: Timestamp.now(),
    modifiedAt: Timestamp.now(),
  };

  const post: PostDetailType = {
    ...foundPost,
    createdAt: dayjs(foundPost.createdAt.toDate()).format('MMMM D, YYYY'),
    modifiedAt: dayjs(foundPost.modifiedAt.toDate()).format('MMMM D, YYYY'),
  };

  return {
    props: {
      post
    }
  };
};