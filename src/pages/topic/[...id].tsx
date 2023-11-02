import TopicScreen from "@/screens/topic/Topic";
import { ChaptersDto } from "@/types/chapter";
import { PostsDto } from "@/types/post";
import { TopicsWithChaptersWithPostsDto } from "@/types/topic";
import { apis } from "@/utils/api";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useMemo } from "react";

export type TopicProps = {
  post: PostsDto | ChaptersDto | null;
  topicId: number;
  chapterId: number;
  postId: number;
};

export default function Topic({
  post,
  topicId,
  chapterId,
  postId,
}: TopicProps) {
  const title = post ? (post.title) : ('빈 토픽');
  const description = useMemo(() => {
    return post ? post.content?.replace(/(<([^>]+)>)/ig, '').substring(0, 160) : '';
  }, [post]);

  return (
    <>
      <Head>
        <title>{title}</title>
        {post ? (<meta name="description" content={description} />) : (<meta name="robots" content="noindex, nofollow" />)}
      </Head>
      <TopicScreen post={post} topicId={topicId} chapterId={chapterId} postId={postId} />
    </>
  );
};

type Path = {
  params: { id: string[] };
};

export async function getStaticPaths() {
  const allTopics: TopicsWithChaptersWithPostsDto[] = (await apis.getAllTopicWithChaptersWithPosts()).data;

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
  let chapterId: number = ids[1] ? parseInt(ids[1]) : -1; 
  const postId: number = ids[2] ? parseInt(ids[2]) : -1;

  let post: PostsDto | ChaptersDto | null = null;

  const notFoundPage = { notFound: true }

  // 1. 챕터가 지정되지 않았으면 토픽의 첫 챕터를 가져온다.
  if(chapterId === -1) {
    const response = await apis.getTopicWithFirstChapter(topicId);
    if(response.status < 300) {
      if(response.data) {
        chapterId = response.data.chapters?.id || -1;
        post = response.data.chapters;
      }
    } else if(response.status === 404) {
      return notFoundPage;
    }
  // 2. 포스트가 지정되지 않았으면 해당 챕터를 가져온다.
  } else if(postId === -1) {
    const response = await apis.getTopicWithChapter(topicId, chapterId);
    if(response.status < 300) {
      post = response.data.chapters!;
    } else if(response.status === 404) {
      return notFoundPage;
    }
  // 3. 포스트가 지정되어 있으면 포스트를 가져온다.
  } else {
    const response = await apis.getTopicWithChapterWithPost(topicId, chapterId, postId);
    if(response.status < 300) {
      post = response.data.posts;
    } else if(response.status === 404) {
      return notFoundPage;
    }
  }

  if(chapterId !== -1) {
    const content = post!.content;

    const regex = /<(h1|h2|h3)>(.*?)<\/\1>/g;
    const modifiedContent = content.replace(regex, (match, p1, p2) => {
      if (!/<\/?[a-z][\s\S]*>/i.test(p2)) {
          return `<${p1} id="${encodeURIComponent(p2.replace(/\s/g, '-'))}">${p2}</${p1}>`;
      } else {
          return match;
      }
    });
    post!.content = modifiedContent;
  }

  return {
    props: {
      post: chapterId === -1 ? null : post,
      topicId,
      chapterId,
      postId,
    },
    revalidate: 10,
  };
};