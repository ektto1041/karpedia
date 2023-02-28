import { Timestamp } from "firebase/firestore";

export type PostsProps = {
  topics: string[],
  postItems: PostItemType[],
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

export type PostItemType = {
  emoji: string,
  title: string,
  modifiedAt: string,
  topics: string[],
}