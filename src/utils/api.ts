import { CategoriesDto, NewCategoriesDto } from "@/types/category";
import { ChaptersDto, NewChaptersDto, NewChaptersUpdateDto, UpdateChaptersDto } from "@/types/chapter";
import { PostsDto, newPostsDto } from "@/types/post";
import { NewTopicsDto, TopicsDto, TopicsWithCategoriesResDto, TopicsWithChaptersDto, TopicsWithChaptersWithPostsDto } from "@/types/topic";
import axios, { Axios, AxiosResponse } from "axios";

const ax = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  withCredentials: true,
});

export const apis = {
  testat: () => {
    return ax.get('/auths/testat');
  },

  /**
   * Auths
   */
  // 현재 로그인 정보와 어드민인지 검사하는 API
  checkAuths: (): Promise<AxiosResponse<void>> => {
    return ax.get('/auths');
  },

  googleLogin: (): Promise<AxiosResponse<any>> => {
    return ax.get(`/auths/google`, { headers: {"Cache-control": "no-cache"}});
  },

  /**
   * 페이지를 revalidate 해주는 api
   */
  // /topic
  revalidateTopic: () => {
    return axios.get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}api/revalidate?secret=${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}&page=topic`);
  },

  // /topic/[...id]
  revalidateTopicAfterCreate: (topicId: number) => {
    return axios.get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}api/revalidate?secret=${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}&page=topic/${topicId}`);
  },

  /**
   * Topics
   */

  // 모든 토픽들을 가져오는 API
  getAllTopics: (): Promise<AxiosResponse<TopicsDto[]>> => {
    return ax.get('/topics');
  },

  // 모든 토픽들을 카테고리로 분류해서 가져오는 API
  getAllTopicsWithCategories: (): Promise<AxiosResponse<TopicsWithCategoriesResDto>> => {
    return ax.get('/topics/categories');
  },

  // 모든 토픽들을 카테고리로 분류해서 가져오는 API ( 토픽 관리용 어드민 체크 )
  getAllTopicsWithCategoriesForSetting: (): Promise<AxiosResponse<TopicsWithCategoriesResDto>> => {
    return ax.get('/topics/setting');
  },

  // 한 토픽의 모든 챕터와 글을 가져오는 API
  getTopic: (topicId: number): Promise<AxiosResponse<TopicsWithChaptersWithPostsDto>> => {
    return ax.get(`/topics/${topicId}`);
  },
  
  // 모든 토픽의 모든 챕터와 글을 가져오는 API
  getAllTopic: () => {
    return ax.get(`/topics/posts`);
  },
  
  // 한 토픽의 정보와 모든 챕터를 가져오는 API
  getTopicWithChapters: (topicId: number): Promise<AxiosResponse<TopicsWithChaptersDto>> => {
    return ax.get(`/topics/${topicId}/chapters`);
  },

  // 토픽을 추가하는 API
  createTopic: (topic: NewTopicsDto) => {
    return ax.post(`/topics`, topic);
  },

  // 토픽의 이름과 설명을 수정하는 API
  updateTopic: (topic: TopicsDto) => {
    return ax.put(`/topics`, topic);
  },

  // 두 토픽의 순서를 바꾸는 API
  swapTopicOrder: (from: number, to: number) => {
    return ax.patch(`/topics/${from}/${to}`);
  },

  // 토픽을 삭제하는 API
  deleteTopic: (topicId: number) => {
    return ax.delete(`/topics/${topicId}`);
  },

  /**
   * Categories
   */
  // 카테고리를 추가하는 API
  createCategory: (category: NewCategoriesDto) => {
    return ax.post(`/categories`, category);
  },

  // 카테고리의 이름을 수정하는 API
  updateCategory: (category: CategoriesDto) => {
    return ax.put(`/categories`, category);
  },

  // 두 카테고리의 순서를 바꾸는 API
  swapCategoryOrder: (from: number, to: number) => {
    return ax.patch(`/categories/${from}/${to}`);
  },

  // 카테고리를 삭제하는 API
  deleteCategory: (categoryId: number) => {
    return ax.delete(`/categories/${categoryId}`);
  },

  /**
   * Chapters
   */
  // 챕터를 추가하는 API
  createChapter: (newChapter: NewChaptersDto): Promise<AxiosResponse<ChaptersDto>> => {
    return ax.post(`/chapters`, newChapter);
  },

  updateChapter: (newChapter: NewChaptersUpdateDto): Promise<AxiosResponse<ChaptersDto>> => {
    return ax.put(`/chapters`, newChapter);
  },

  swapChapterOrder: (from: number, to: number): Promise<AxiosResponse<void>> => {
    return ax.patch(`/chapters/${from}/${to}`);
  },

  getUpdateChapter: (chapterId: number): Promise<AxiosResponse<UpdateChaptersDto>> => {
    return ax.get(`/chapters/update/${chapterId}`);
  },

  /**
   * Posts
   */
  // 포스트를 추가하는 API
  createPost: (newPost: newPostsDto): Promise<AxiosResponse<PostsDto>> => {
    return ax.post(`/posts`, newPost);
  },
};

export const fetcher = (url: string) => ax.get(url).then(res => res.data);