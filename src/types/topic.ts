import { PostsDto } from "./post";

export type CategoriesDto = {
  id: number;
  name: string;
};

export type NewCategoriesDto = {
  name: string;
};

export type NewTopicsDto = {
  categoriesId: number;
  name: string;
  description: string;
};

export type TopicsDto = {
  id: number;
  name: string;
  description: string;
};

export type TopicsWithCategoriesDto = {
  id: number;
  name: string;
  description: string;
  categoriesId: number;
};

export type TopicsWithCategoriesResDto = {
  categories: CategoriesDto[],
  topics: TopicsWithCategoriesDto[],
}

export type ChaptersWithPostsDto = {
  id: number;
  title: string;
  content: string;
  postsList: PostsDto[];
}

export type TopicsWithChaptersDto = {
  id: number;
  name: string;
  description: string;
  chaptersList: ChaptersWithPostsDto[];
}

export type TopicsByCategory = {
  topics: TopicsWithCategoriesDto[];
  id: number;
  name: string;
}

export type TopicsProps = {
  categoriesWithTopics: TopicsByCategory[];
};

export type TopicProps = {
  topic: TopicsWithChaptersDto;
  chapterId: number,
  postId: number,
};

export type CategoryItemProps = {
  name: string;
  topics: TopicsWithCategoriesDto[];
}

export type TopicItemProps = {
  topic: TopicsWithCategoriesDto;
};

export type ChapterListProps = {
  chapterList: ChaptersWithPostsDto[];
  onClickChapter: (chapterId: number) => void;
  onClickPost: (postId: number) => void;
};

export type ChapterItemProps = {
  chapter: ChaptersWithPostsDto;
  onClickChapter: (chapterId: number) => void;
  onClickPost: (postId: number) => void;
};