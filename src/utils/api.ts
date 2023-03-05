import { CommentType, NewCommentType, NewPostType, PostType } from "@/types/post";
import axios from "axios";

const ax = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
});

export const apis = {
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
}

export const fetcher = (url: string) => ax.get(url).then(res => res.data);