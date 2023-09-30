import { Timestamp } from "firebase/firestore";
import { PublicUsersDto } from "./user";

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

export type CommentsWithPublicUsersDto = {
  id: number;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  users: PublicUsersDto;
}