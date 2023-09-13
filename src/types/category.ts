import { TopicsWithCategoriesDto } from "./topic";

export type CategoriesDto = {
  id: number;
  name: string;
};

export type NewCategoriesDto = {
  name: string;
};

export type TopicsByCategory = {
  topics: TopicsWithCategoriesDto[];
  id: number;
  name: string;
}