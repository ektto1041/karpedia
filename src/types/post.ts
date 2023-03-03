import { Timestamp } from "firebase/firestore";

interface WithId {
  id: string,
};

export type PostsProps = {
  topics: string[],
  postItems: PostItemType[],
};

export type PostDetailProps = {
  post: PostDetailType,
  commentList: CommentItemType[],
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
  postTitle: string,
  status: number,
}

export interface PostType extends WithId, PostDoc {}
export interface CommentType extends WithId, CommentDoc {}

export type PostItemType = {
  id: string,
  emoji: string,
  title: string,
  modifiedAt: string,
  topics: string[],
}

export type PostDetailType = {
  id: string,
  emoji: string,
  title: string,
  content: string,
  topics: string[],
  viewCount: number,
  createdAt: string,
  modifiedAt: string,
}

export type CommentItemType = {
  id: string,
  name: string,
  password: string,
  content: string,
  reply: string,
  createdAt: string,
  postTitle: string,
  status: number,
}