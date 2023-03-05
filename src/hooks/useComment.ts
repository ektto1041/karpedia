import { CommentType } from "@/types/post";
import { fetcher } from "@/utils/api";
import useSWR from 'swr';

export default function useComment(postId: string) {
  const { data, error, isLoading, mutate } = useSWR<CommentType[]>(`/api/comments?postId=${postId}`, fetcher);

  return {
    commentList: data || [],
    error,
    isLoading,
    mutate,
  }
}