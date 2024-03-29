import { CategoriesDto } from "./category";
import { ChaptersDto, ChaptersWithPostsDto } from "./chapter";
import { PostsDto } from "./post";
import { PublicUsersDto } from "./user";

export type NewTopicsDto = {
  categoriesId: number;
  name: string;
  description: string;
};

export type TopicsDto = {
  id: number;
  name: string;
  description: string;
  orders: number;
};

export type TopicsNameDto = {
  id: number;
  name: string;
  orders: number;
};

export type TopicsWithCategoriesIdDto = {
  id: number;
  name: string;
  description: string;
  orders: number;
  categoriesId: number;
};

export type TopicsWithCategoriesNameDto = {
  id: number;
  name: string;
  description: string;
  orders: number;
  categoriesName: string;
};

export type TopicsWithCategoriesResDto = {
  categories: CategoriesDto[],
  topics: TopicsWithCategoriesIdDto[],
}

export type TopicsWithChaptersDto = {
  id: number;
  name: string;
  description: string;
  orders: number;
  chaptersList: ChaptersDto[];
  users: PublicUsersDto;
};

export type TopicsWithChaptersWithPostsDto = {
  id: number;
  name: string;
  description: string;
  orders: number;
  chaptersList: ChaptersWithPostsDto[];
  users: PublicUsersDto;
};

export type TopicsWithOneChaptersDto = {
  id: number;
  name: string;
  description: string;
  orders: number;
  chapters: ChaptersDto | null;
}

export type TopicsWithOneChaptersWithOnePostsDto = {
  id: number;
  name: string;
  description: string;
  orders: number;
  chapters: ChaptersDto;
  posts: PostsDto;
}

export type SubscribeTopicsResultDto = {
  subscribed: boolean;
}

export type SubscribedTopicsResultDto = {
  isSubscribedTopicsAlarmAllowed: boolean;
  topics: TopicsWithCategoriesNameDto[];
}