import { NewPostType } from "@/types/post";
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
  createPost: async (newPost: NewPostType) => {
    return await ax.post('/api/posts', newPost);
  },
}