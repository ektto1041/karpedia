import { PostItemDto } from "@/types/post";
import styles from './PostList.module.css';
import PostItem from "./PostItem";
import Icon from '@mdi/react';
import { mdiPlusCircle } from '@mdi/js';
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import Link from "next/link";

type PostListProps = {
  postItems: PostItemDto[],
};

export default function PostList({
  postItems,
}: PostListProps) {
  console.log(postItems);
  const session = useSession();
  const isAdmin = Boolean(session.status === 'authenticated');

  return (
    <>
      {isAdmin ? (
        <div className={styles['add-button-container']}>
          <Link className={styles['add-button']} href='/posts/new' >
            <Icon path={mdiPlusCircle} size='40px' />
          </Link>
        </div>
      ) : (<></>)}
      {postItems.map(postItem => (
        <PostItem key={postItem.id} postItem={postItem} />
      ))}
    </>
  );
};