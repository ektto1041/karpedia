import { CommentsEntity, CreateCommentsDto, CreatePostDto, PostItemResDto, PostsEntity, PostsPaging, TopicsEntity } from "@/types/post";
import { CategoriesDto, NewCategoriesDto, NewTopicsDto, TopicsDto, TopicsWithCategoriesResDto, TopicsWithChaptersDto } from "@/types/topic";
import axios, { AxiosResponse } from "axios";

const ax = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  withCredentials: true,
});

export const apis = {
  testat: () => {
    return ax.get('/auths/testat');
  },

  googleLogin: (): Promise<AxiosResponse<any>> => {
    return ax.get(`/auths/google`, { headers: {"Cache-control": "no-cache"}});
  },

  /**
   * /posts 페이지를 revalidate 해주는 api
   * @returns revalidate 결과
   */
  // revalidatePosts: () => {
  //   return ax.get(`/api/revalidate?secret=${}&page=posts`);
  // },
  revalidatePost: (postId: number) => {
    return axios.get(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}api/revalidate?secret=${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}&page=posts/${postId}`);
  },

  /**
   * 새 글을 작성하는 api
   * @param newPost 작성할 글의 정보
   * @returns 작성이 완료된 글의 정보
   */
  createPost: (newPost: CreatePostDto): Promise<AxiosResponse<PostsEntity>> => {
    return ax.post('/posts', newPost);
  },
  /**
   * 글을 수정하는 api
   * @param newPost 작성할 글의 정보
   * @param postId 수정할 글의 id
   * @returns 수정이 완료된 글의 정보
   */
  updatePost: (newPost: CreatePostDto, postId: number): Promise<AxiosResponse<PostsEntity>> => {
    return ax.put(`/posts/${postId}`, newPost);
  },
  /**
   * 글을 삭제하는 API
   * @param postId 삭제하려는 포스트의 id
   * TODO: 반환형 정의
   */
  deletePost: (postId: number): Promise<AxiosResponse<any>> => {
    return ax.delete(`/posts/${postId}`);
  },
  /**
   * 모든 글을 가져오는 api
   */
  getAllPost: (): Promise<AxiosResponse<PostsEntity[]>> => {
    return ax.get(`/posts`);
  },

  getAllPostPaging: ({page, keyword, topics}: PostsPaging): Promise<AxiosResponse<PostItemResDto>> => {
    return ax.get(`/posts/paging?page=${page}${keyword ? `&keyword=${keyword}` : ''}${topics.length > 0 ? `&topics=${topics.join(',')}` : ''}`);
  },
  /**
   * 글 하나의 정보를 가져오는 api
   * @param postId 가져올 포스트의 id
   * @returns 포스트 정보
   */
  getPostById: (postId: number): Promise<AxiosResponse<PostsEntity>> => {
    return ax.get(`/posts/${postId}`);
  },
  viewPost: (postId: number): Promise<AxiosResponse<void>> => {
    return ax.put(`/posts/view/${postId}`);
  },

  /**
   * 글 하나에 속한 모든 댓글을 가져오는 api
   * @param postId 댓글이 포함되어 있는 포스트의 id
   */
  getCommentsByPostId: (postId: number): Promise<AxiosResponse<CommentsEntity[]>> => {
    return ax.get(`/comments/posts/${postId}`);
  },
  /**
   * 새 댓글을 작성하는 api
   * @param newComment 작성할 댓글의 정보
   * @returns 작성이 완료된 댓글의 정보
   */
  createComment: (newComment: CreateCommentsDto) => {
    return ax.post('/comments', newComment);
  },
  /**
   * 댓글 답변을 수정하는 api
   * @param commentId 답변을 수정하려는 댓글의 id
   * @param newReply 답변 내용
   */
  updateReply: (commentId: number, newReply: string) => {
    return ax.put(`/comments/reply/${commentId}`, { reply: newReply });
  },
  /**
   * 댓글을 삭제하는 API
   * @param commentId 삭제하려는 댓글의 id
   */
  deleteComment: (commentId: number): Promise<AxiosResponse<CommentsEntity>> => {
    return ax.delete(`/comments/${commentId}`);
  },
  
  /**
   * 모든 토픽들을 가져오는 API
   */
  getAllTopics: (): Promise<AxiosResponse<TopicsDto[]>> => {
    return ax.get('/topics');
  },

  /**
   * 모든 토픽들을 카테고리로 분류해서 가져오는 API
   */
  getAllTopicsWithCategories: (): Promise<AxiosResponse<TopicsWithCategoriesResDto>> => {
    return ax.get('/topics/categories');
  },

  /**
   * 모든 토픽들을 카테고리로 분류해서 가져오는 API ( 토픽 관리용 어드민 체크 )
   */
  getAllTopicsWithCategoriesForSetting: (): Promise<AxiosResponse<TopicsWithCategoriesResDto>> => {
    return ax.get('/topics/setting');
  },

  /**
   * 한 토픽의 모든 챕터와 글을 가져오는 API
   */
  getTopic: (topicId: number): Promise<AxiosResponse<TopicsWithChaptersDto>> => {
    return ax.get(`/topics/${topicId}`);
  },

  // 모든 토픽의 모든 챕터와 글을 가져오는 API
  getAllTopic: () => {
    return ax.get(`/topics/posts`);
  },

  // 토픽을 추가하는 API
  createTopic: (topic: NewTopicsDto) => {
    return ax.post(`/topics`, topic);
  },

  // 토픽의 이름과 설명을 수정하는 API
  updateTopic: (topic: TopicsDto) => {
    return ax.put(`/topics`, topic);
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

  // 카테고리를 삭제하는 API
  deleteCategory: (categoryId: number) => {
    return ax.delete(`/categories/${categoryId}`);
  },
}

export const fetcher = (url: string) => ax.get(url).then(res => res.data);