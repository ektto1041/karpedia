import { CommentsEntity } from "@/types/post";
import { fetcher } from "@/utils/api";
import useSWR from 'swr';

export default function useComment(postId: number) {
  const { data, error, isLoading, mutate } = useSWR<CommentsEntity[]>(`/comments/posts/${postId}`, fetcher);

  return {
    commentList: data || [],
    error,
    isLoading,
    mutate,
  }
}