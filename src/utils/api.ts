import { CommentType, NewCommentType, NewPostType, PostType } from "@/types/post";
import axios, { AxiosResponse } from "axios";

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