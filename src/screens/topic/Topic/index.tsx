
import { PostsDto } from '@/types/post';
import ChapterList from './ChapterList/ChapterList';
import Content from './Content';
import styles from './Topic.module.css';
import { TopicsWithChaptersDto } from "@/types/topic";
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import ChapterOptions from './ChapterList/ChapterOptions';
import { ChaptersWithPostsDto } from '@/types/chapter';
import { TopicProps } from '@/pages/topic/[...id]';

const findPost = (topic: TopicsWithChaptersDto, chapterId: number, postId: number): PostsDto | ChaptersWithPostsDto => {
  const chapter: ChaptersWithPostsDto = topic.chaptersList.find(c => c.id === chapterId)!;
  if(postId > -1) {
    const post: PostsDto = chapter.postsList.find(p => p.id === postId)!;

    return post;
  }

  return chapter;
}

const findChapterIdByPostId = (topic: TopicsWithChaptersDto, postId: number): number => {
  for(const chapter of topic.chaptersList) {
    for(const post of chapter.postsList) {
      if(post.id === postId) return chapter.id;
    }
  }

  return -1;
}

export default function TopicScreen({
  topic,
  chapterId,
  postId,
}: TopicProps) {
  const {id, name, description, chaptersList, users} = topic
  const post = chapterId !== -1 ? findPost(topic, chapterId, postId) : null;
  const [isOwner, setOwner] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setOwner(getCookie('uid') === String(users.id));
  }, []);

  const onClickChapter = (chapterId: number) => {
    router.push(`/topic/${topic.id}/${chapterId}`);
  };

  const onClickPost = (postId: number) => {
    router.push(`/topic/${topic.id}/${findChapterIdByPostId(topic, postId)}/${postId}`);
  };

  return (
    <div className={styles.container}>
      { post ? (
        <>
          <ChapterList chapterList={chaptersList} onClickChapter={onClickChapter} onClickPost={onClickPost} isOwner={isOwner} topicId={id} />
          <Content post={post} />  
        </>
      ) : (
        <div className={styles.warning}>
          <div className={styles.message}>
            작성된 포스트가 없습니다.
          </div>
          
          {isOwner && (<ChapterOptions topicId={id} />)}
        </div>
      )}
    </div>
  );
};