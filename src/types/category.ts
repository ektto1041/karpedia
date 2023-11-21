import { TopicsWithCategoriesIdDto } from "./topic";

export type CategoriesDto = {
  id: number;
  name: string;
  orders: number;
};

export type NewCategoriesDto = {
  name: string;
};

export type TopicsByCategory = {
  topics: TopicsWithCategoriesIdDto[];
  id: number;
  name: string;
  orders: number;
}