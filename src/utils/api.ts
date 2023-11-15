import { CategoriesDto, NewCategoriesDto } from "@/types/category";
import { ChaptersDto, NewChaptersDto, NewChaptersUpdateDto, UpdateChaptersDto } from "@/types/chapter";
import { CommentsDto, CommentsWithPublicUsersWithReplyToDto, NewCommentsDto, NewCommentsUpdateDto } from "@/types/comment";
import { Error, IdDto } from "@/types/common";
import { NewPostsUpdateDto, PostsDto, UpdatePostsDto, NewPostsDto } from "@/types/post";
import { NewTopicsDto, TopicsDto, TopicsWithCategoriesResDto, TopicsWithChaptersDto, TopicsWithChaptersWithPostsDto, TopicsWithOneChaptersDto, TopicsWithOneChaptersWithOnePostsDto, SubscribeTopicsResultDto } from "@/types/topic";
import { PublicUsersDto, UpdateNameDto, UpdateProfileImageDto } from "@/types/user";
import axios, { Axios, AxiosResponse } from "axios";

const ax = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  withCredentials: true,
  validateStatus: () => true,
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
    return ax.get('/auths/check');
  },

  googleLogin: (): Promise<AxiosResponse<any>> => {
    return ax.get(`/auths/google`, { headers: {"Cache-control": "no-cache"}});
  },

  logout: () => {
    return ax.get(`/auths/logout`);
  },

  /**
   * Users
   */
  // 현재 로그인한 유저가 유저 정보를 가져오는 API
  getSelfUsers: (): Promise<AxiosResponse<PublicUsersDto>> => {
    return ax.get(`/users/self`);
  },

  // 현재 로그인한 유저의 구독 토픽을 가져오는 API
  getSubscribedTopics: (): Promise<AxiosResponse<IdDto[]>> => {
    return ax.get(`/users/subscribed/topics`);
  },

  // 프로필 이미지를 업데이트하는 API
  updateProfileImage: (newProfileImage: UpdateProfileImageDto): Promise<AxiosResponse<UpdateProfileImageDto>> => {
    return ax.patch(`/users/image`, newProfileImage);
  },

  // 이름을 업데이트하는 API
  updateName: (newName: UpdateNameDto): Promise<AxiosResponse<UpdateNameDto | Error>> => {
    return ax.patch(`/users/name`, newName);
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
  getAllTopicWithChaptersWithPosts: (): Promise<AxiosResponse<TopicsWithChaptersWithPostsDto[]>> => {
    return ax.get(`/topics/posts`);
  },
  
  // 한 토픽의 정보와 모든 챕터를 가져오는 API
  getTopicWithChapters: (topicId: number): Promise<AxiosResponse<TopicsWithChaptersDto>> => {
    return ax.get(`/topics/${topicId}/chapters`);
  },

  // 한 토픽과 토픽의 첫 챕터를 포함하여 가져오는 API (챕터는 null이 될 수 있음)
  getTopicWithFirstChapter: (topicId: number): Promise<AxiosResponse<TopicsWithOneChaptersDto>> => {
    return ax.get(`/topics/${topicId}/chapters/first`);
  },

  // 한 토픽과 해당 토픽의 한 챕터를 가져오는 API
  getTopicWithChapter: (topicId: number, chapterId: number): Promise<AxiosResponse<TopicsWithOneChaptersDto>> => {
    return ax.get(`/topics/${topicId}/chapters/${chapterId}`);
  },

  // 한 토픽과 해당 토픽의 한 챕터를 가져오는 API
  getTopicWithChapterWithPost: (topicId: number, chapterId: number, postsId: number): Promise<AxiosResponse<TopicsWithOneChaptersWithOnePostsDto>> => {
    return ax.get(`/topics/${topicId}/chapters/${chapterId}/posts/${postsId}`);
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

  // 토픽을 구독하는 API
  subscribeTopic: (topicId: number): Promise<AxiosResponse<SubscribeTopicsResultDto>> => {
    return ax.patch(`/topics/subscribe/${topicId}`);
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

  getOneChapterById: (chapterId: number): Promise<AxiosResponse<ChaptersDto>> => {
    return ax.get(`/chapters/${chapterId}`);
  },

  getUpdateChapter: (chapterId: number): Promise<AxiosResponse<UpdateChaptersDto>> => {
    return ax.get(`/chapters/update/${chapterId}`);
  },

  /**
   * Posts
   */
  // 포스트를 추가하는 API
  createPost: (newPost: NewPostsDto): Promise<AxiosResponse<PostsDto>> => {
    return ax.post(`/posts`, newPost);
  },

  updatePost: (newPost: NewPostsUpdateDto): Promise<AxiosResponse<PostsDto>> => {
    return ax.put(`/posts`, newPost);
  },

  swapPostOrder: (from: number, to: number): Promise<AxiosResponse<void>> => {
    return ax.patch(`/posts/${from}/${to}`);
  },

  getOnePostById: (postId: number): Promise<AxiosResponse<PostsDto>> => {
    return ax.get(`/posts/${postId}`);
  },

  getUpdatePost: (postId: number): Promise<AxiosResponse<UpdatePostsDto>> => {
    return ax.get(`/posts/update/${postId}`);
  },

  /**
   * Comments
   */
  createComment: (newComment: NewCommentsDto): Promise<AxiosResponse<CommentsDto>> => {
    return ax.post(`/comments`, newComment);
  },

  updateComment: (newComment: NewCommentsUpdateDto): Promise<AxiosResponse<CommentsDto>> => {
    return ax.put(`/comments`, newComment);
  },

  getCommentsWithPublicUser: (postId: number): Promise<AxiosResponse<CommentsWithPublicUsersWithReplyToDto[]>> => {
    return ax.get(`/comments/${postId}`);
  },

  deleteComment: (commentId: number): Promise<AxiosResponse<void>> => {
    return ax.delete(`/comments/${commentId}`);
  },

  /**
   * S3
   */
  uploadImageToS3: (formData: FormData) => {
    return ax.post(`/s3/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export const fetcher = (url: string) => ax.get(url).then(res => res.data);