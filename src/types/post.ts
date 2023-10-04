import { ChaptersTitleDto } from "./chapter";

export type PostsDto = {
  id: number;
  title: string;
  content: string;
  orders: number;
  status: number;
  viewCount: number;
  createdAt: string;
  modifiedAt: string;
};

export type PostsWithChaptersIdDto = {
  id: number;
  title: string;
  content: string;
  orders: number;
  chaptersId: number;
}

export type NewPostsDto = {
  title: string;
  content: string;
  chapterId: number;
};

export type NewPostsUpdateDto = {
  chapterId: number;
  id: number;
  title: string;
  content: string;
};

export type UpdatePostsDto = {
  chaptersList: ChaptersTitleDto[];
  posts: PostsWithChaptersIdDto;
};