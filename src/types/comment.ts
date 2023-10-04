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

export type NewCommentsUpdateDto = {
  id: number;
  content: string;
}

export type CommentsWithPublicUsersWithReplyToDto = {
  id: number;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  users: PublicUsersDto;
  replyTo: CommentsWithPublicUsersDto | null;
}

export type CommentsWithPublicUsersDto = {
  id: number;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  users: PublicUsersDto;
}