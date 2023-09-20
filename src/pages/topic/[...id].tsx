import TopicScreen from "@/screens/topic/Topic";
import { TopicsWithChaptersWithPostsDto } from "@/types/topic";
import { apis } from "@/utils/api";
import { GetStaticPropsContext } from "next";

export type TopicProps = {
  topic: TopicsWithChaptersWithPostsDto;
  chapterId: number,
  postId: number,
};

export default function Topic({
  topic,
  chapterId,
  postId,
}: TopicProps) {
  return <TopicScreen topic={topic} chapterId={chapterId} postId={postId} />
};

type Path = {
  params: { id: string[] };
};

export async function getStaticPaths() {
  const allTopics: TopicsWithChaptersWithPostsDto[] = (await apis.getAllTopic()).data;

  // topic O, chapter X, post X -> to First Chapter
  // topic O, chapter O, post X -> to Chapter
  // topic O, chapter O, post O -> to Post

  const paths: Path[] = [];
  allTopics.forEach(topic => {
    paths.push({ params: { id: [String(topic.id)] } });

    topic.chaptersList.forEach(chapter => {
      paths.push({ params: { id: [String(topic.id), String(chapter.id)] } });

      chapter.postsList.forEach(post => {
        paths.push({ params: { id: [String(topic.id), String(chapter.id), String(post.id)] } });
      });
    });
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const ids: string[] = context.params!.id as string[];
  
  const topicId: number = parseInt(ids[0]);

  // TODO 한 번의 쿼리로 해당 글 혹은 챕터를 가져오기
  const topic = (await apis.getTopic(topicId)).data;

  // sorting
  topic.chaptersList.sort((a, b) => b.orders - a.orders);
  topic.chaptersList.forEach(chapter => {
    chapter.postsList.sort((a, b) => b.orders - a.orders);
  });

  const chapterId: number = ids[1] ? parseInt(ids[1]) : (topic.chaptersList[0]?.id || -1); 
  const postId: number = ids[2] ? parseInt(ids[2]) : -1;
  
  const hasNoData = !Boolean(topic);
  if(hasNoData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      topic,
      chapterId,
      postId,
    }
  };
};