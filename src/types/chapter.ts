import { PostsDto } from "./post";

export type ChapterTitle = {
  id: number;
  title: string;
};

export type ChaptersDto = {
  id: number;
  title: string;
  content: string;
};

export type NewChaptersDto = {
  topicId: number;
  title: string;
  content: string;
};

export type ChaptersWithPostsDto = {
  id: number;
  title: string;
  content: string;
  postsList: PostsDto[];
}