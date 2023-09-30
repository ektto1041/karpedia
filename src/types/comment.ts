import { Timestamp } from "firebase/firestore";

export type CommentsDto = {
  id: number;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
}

export type NewCommentsDto = {
  content: string;
  postsId: number;
  replyToId?: number;
}