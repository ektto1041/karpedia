import { Timestamp } from "firebase/firestore";

export type CreateCommentsDto = {
  postId: number,
  name: string,
  password: string,
  content: string,
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