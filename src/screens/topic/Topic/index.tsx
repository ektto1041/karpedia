
import { PostsDto } from '@/types/post';
import ChapterList from './ChapterList/ChapterList';
import Content from './Content';
import styles from './Topic.module.css';
import { ChaptersWithPostsDto, TopicProps, TopicsWithChaptersDto } from "@/types/topic";
import { useRouter } from 'next/router';

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
  const {id, name, description, chaptersList} = topic
  const post = findPost(topic, chapterId, postId);

  const router = useRouter();

  const onClickChapter = (chapterId: number) => {
    router.push(`/topic/${topic.id}/${chapterId}`);
  };

  const onClickPost = (postId: number) => {
    router.push(`/topic/${topic.id}/${findChapterIdByPostId(topic, postId)}/${postId}`);
  };

  return (
    <div className={styles.container}>
      <ChapterList chapterList={chaptersList} onClickChapter={onClickChapter} onClickPost={onClickPost} />
      <Content post={post} />
    </div>
  );
};