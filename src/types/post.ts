import { Timestamp } from "firebase/firestore";

export type PostsProps = {
  topics: string[],
  postItems: PostItemType[],
};

export type PostDoc = {
  emoji: string,
  title: string,
  content: string,
  topics: string[],
  viewCount: number,
  comments: any[],  // TODO: 댓글 collection 계획 전까지는 any[]
  createdAt: Timestamp,
  modifiedAt: Timestamp,
}

export type PostItemType = {
  emoji: string,
  title: string,
  modifiedAt: string,
}