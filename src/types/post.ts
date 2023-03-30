import { Timestamp } from "firebase/firestore";

export type PostsProps = {
  topics: string[],
  selectedTopics: string[],
  postItems: PostItemType[],
  page: number,
  maxPage: number,
};

export type PostDetailProps = {
  post: PostType,
};

export type NewPostType = {
  emoji: string,
  title: string,
  content: string,
  topics: string[],
};

export type NewCommentType = {
  postId: string,
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

export type PostItemType = {
  id: string,
  emoji: string,
  title: string,
  modifiedAt: string,
  topics: string[],
}

export type PostType = {
  id: string,
  emoji: string,
  title: string,
  content: string,
  topics: string[],
  numViewCount: number,
  viewCount: number,
  createdAt: string,
  modifiedAt: string,
  status: number,
}

export type CommentType = {
  id: string,
  name: string,
  password: string,
  content: string,
  reply: string,
  createdAt: string,
  postId: string,
  status: number,
}