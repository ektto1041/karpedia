import { PostItemType } from "@/types/post";
import PostItem from "./PostItem";

type PostListProps = {
  postItems: PostItemType[],
};

export default function PostList({
  postItems,
}: PostListProps) {
  return (
    <>
      {postItems.map(postItem => (
        <PostItem key={postItem.title} postItem={postItem} />
      ))}
    </>
  );
};