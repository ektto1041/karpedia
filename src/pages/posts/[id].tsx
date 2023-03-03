import PostDetailScreen from "@/screens/posts/[id]";
import { CommentType, PostDetailProps, PostType } from "@/types/post";
import dayjs from "dayjs";

export default function PostDetail({
  post,
  commentList,
}: PostDetailProps) {
  return <PostDetailScreen post={post} commentList={commentList} />
};

export async function getStaticPaths() {
  // 레이아웃 구현을 위한 임시 작업
  return {
    paths: [{ params: { id: '1' } },],
    fallback: 'blocking',
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
    createdAt: dayjs().format(),
    modifiedAt: dayjs().format(),
  };

  // 임시 댓글 리스트
  const foundComments: CommentType[] = [
    {
      id: 'bcda',
      name: 'JS 초보',
      password: '1234',
      content: '정말 좋은 글입니다.',
      reply: '감사합니다. 앞으로 더 정진하겠습니다.',
      createdAt: dayjs().format(),
      postTitle: 'React React Javascript',
      status: 0,
    },
    {
      id: 'bcdb',
      name: 'JS 고수',
      password: '1234',
      content: '완전 별로네요.',
      reply: '',
      createdAt: dayjs().format(),
      postTitle: 'React React Javascript',
      status: 0,
    },
    {
      id: 'bcdd',
      name: '아무개',
      password: '1234',
      content: '풀밭에 살 듣기만 있을 봄바람이다. 있는 피는 같으며, 청춘 일월과 같이, 이것이야말로 인생에 타오르고 교향악이다. 못할 싶이 피에 설산에서 커다란 때문이다. 뜨고, 설레는 풍부하게 뿐이다. 위하여, 구할 찾아 있다. 커다란 이상의 곧 우리 되려니와, 이상, 뛰노는 것이다. 사랑의 이 만물은 착목한는 못할 끓는 거친 있으랴? 길을 같은 무엇을 이상이 위하여 없으면 부패를 이상의 석가는 때문이다. 이상, 구하지 위하여 피는 보내는 부패를 청춘 때문이다.',
      reply: '감사합니다. 앞으로 더 정진하겠습니다.',
      createdAt: dayjs().format(),
      postTitle: 'React React Javascript',
      status: 0,
    },
  ];

  return {
    props: {
      post: foundPost,
      commentList: foundComments,
    }
  };
};