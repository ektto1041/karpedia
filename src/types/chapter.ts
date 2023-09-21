import { PostsDto } from "./post";
import { TopicsNameDto } from "./topic";

export type ChapterTitle = {
  id: number;
  title: string;
};

export type ChaptersDto = {
  id: number;
  title: string;
  content: string;
  orders: number;
};

export type ChaptersTitleDto = {
  id: number;
  title: string;
  orders: number;
};

export type NewChaptersDto = {
  topicId: number;
  title: string;
  content: string;
};

export type NewChaptersUpdateDto = {
  topicId: number;
  id: number;
  title: string;
  content: string;
};

export type UpdateChaptersDto = {
  topicsList: TopicsNameDto[];
  chapters: ChaptersWithTopicsIdDto;
};

export type ChaptersWithPostsDto = {
  id: number;
  title: string;
  content: string;
  orders: number;
  postsList: PostsDto[];
};

export type ChaptersWithTopicsIdDto = {
  id: number;
  title: string;
  content: string;
  orders: number;
  topicsId: number;
};