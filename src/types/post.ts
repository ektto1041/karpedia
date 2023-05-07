import { Timestamp } from "firebase/firestore";

export type PostsProps = {
  topics: string[],
  selectedTopics: string[],
  postItems: PostItemDto[],
  page: number,
  maxPage: number,
};

export type PostDetailProps = {
  post: PostsEntity,
};

export type CreatePostDto = {
  emoji: string,
  title: string,
  content: string,
  topics: string[],
};

export type CreateCommentsDto = {
  postId: number,
  name: string,
  password: string,
  content: string,
};

export type PostDoc = {
  emoji: string,
  title: string,
  content: string,
  topics: string[],
  numViewCount: number,
  createdAt: Timestamp,
  modifiedAt: Timestamp,
  status: number,
}

export type ViewCountShardDoc = {
  count: number,
};

export type CommentDoc = {
  name: string,
  password: string,
  content: string,
  reply: string,
  createdAt: Timestamp,
  postId: string,
  status: number,
}

export type PostItemDto = {
  id: number,
  emoji: string,
  title: string,
  viewCount: number,
  createdAt: string,
  modifiedAt: string,
  topics: TopicsEntity[],
}

export type PostItemResDto = {
  data: PostItemDto[];
  maxPage: number;
};

/**
 * Entities
 */
export type PostsEntity = {
  id: number,
  emoji: string,
  title: string,
  content: string,
  topics: TopicsEntity[],
  comments: CommentsEntity[],
  numViewCount: number,
  viewCount: number,
  createdAt: string,
  modifiedAt: string,
  status: number,
}

export type CommentsEntity = {
  id: number,
  name: string,
  password: string,
  content: string,
  reply: string,
  createdAt: string,
  postId: string,
  status: number,
}

export type TopicsEntity = {
  id: number,
  name: string,
};

export type PostsPaging = {
  page: number,
  keyword: string,
  topics: string[],
};