import { Timestamp } from "firebase/firestore";

export type PostsProps = {
  topics: string[],
  postItems: PostItemType[],
};

export type PostDetailProps = {
  post: PostType,
  commentList: CommentType[],
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
  id: string,
  name: string,
  password: string,
  content: string,
  reply: string,
  createdAt: Timestamp,
  postTitle: string,
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
  postTitle: string,
  status: number,
}