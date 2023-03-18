import { CommentType, NewCommentType, NewPostType, PostType } from "@/types/post";
import axios, { AxiosResponse } from "axios";
import { ErrorRes } from "./db";

const ax = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
});

export const apis = {
  /**
   * /posts 페이지를 revalidate 해주는 api
   * @returns revalidate 결과
   */
  revalidatePosts: () => {
    return ax.get(`/api/revalidate?secret=${process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY}&page=posts`);
  },

  /**
   * 새 글을 작성하는 api
   * @param newPost 작성할 글의 정보
   * @returns 작성이 완료된 글의 정보
   */
  createPost: (newPost: NewPostType) => {
    return ax.post('/api/posts', newPost);
  },
  /**
   * 글을 수정하는 api
   * @param newPost 작성할 글의 정보
   * @param postId 수정할 글의 id
   * @returns 수정이 완료된 글의 정보
   */
  updatePost: (newPost: NewPostType, postId: string): Promise<AxiosResponse<boolean>> => {
    return ax.put(`/api/posts?postId=${postId}`, newPost);
  },
  /**
   * 글을 삭제하는 API
   * @param postId 삭제하려는 포스트의 id
   */
  deletePost: (postId: string): Promise<AxiosResponse<boolean | ErrorRes>> => {
    return ax.delete(`/api/posts?postId=${postId}`);
  },
  
  /**
   * 글 하나의 정보를 가져오는 api
   * @param postId 가져올 포스트의 id
   * @returns 포스트 정보
   */
  getPostById: (postId: string): Promise<AxiosResponse<PostType>> => {
    return ax.get(`/api/posts?postId=${postId}`);
  },

  /**
   * 새 댓글을 작성하는 api
   * @param newComment 작성할 댓글의 정보
   * @returns 작성이 완료된 댓글의 정보
   */
  createComment: (newComment: NewCommentType) => {
    return ax.post('/api/comments', newComment);
  },
  /**
   * 댓글을 삭제하는 API
   * @param commentId 삭제하려는 댓글의 id
   */
  deleteComment: (commentId: string): Promise<AxiosResponse<CommentType>> => {
    return ax.delete(`/api/comments?commentId=${commentId}`);
  },
}

export const fetcher = (url: string) => ax.get(url).then(res => res.data);