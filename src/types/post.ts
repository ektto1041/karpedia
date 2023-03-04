import { Timestamp } from "firebase/firestore";

export type PostsProps = {
  topics: string[],
  postItems: PostItemType[],
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

export type PostDoc = {
  emoji: string,
  title: string,
  content: string,
  topics: string[],
  viewCount: number,
  createdAt: Timestamp,
  modifiedAt: Timestamp,
}

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
  viewCount: number,
  createdAt: string,
  modifiedAt: string,
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