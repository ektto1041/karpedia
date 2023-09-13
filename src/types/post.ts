export type PostsDto = {
  id: number;
  title: string;
  content: string;
  status: number;
  viewCount: number;
  createdAt: string;
  modifiedAt: string;
};

export type newPostsDto = {
  title: string;
  content: string;
  chapterId: number;
};