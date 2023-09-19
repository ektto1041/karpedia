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

export type newPostsDto = {
  title: string;
  content: string;
  chapterId: number;
};