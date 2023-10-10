import { apis } from "@/utils/api";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type PostId = {
  id: number;
};

type ChapterId = {
  id: number;
  posts: PostId[]
};

type TopicId = {
  id: number;
  chapters: ChapterId[];
};

export default function SiteMap() {}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const topics = (await apis.getAllTopicWithChaptersWithPosts()).data;
  const allTopic: TopicId[] = topics.map(topic => (
    {
      id: topic.id,
      chapters: topic.chaptersList.map(chapter => (
        {
          id: chapter.id,
          posts: chapter.postsList.map(post => (
            {
              id: post.id,
            }
          )),
        }
      )),
    }
  ));

  const urls = generateUrls(allTopic);

  res.setHeader('Content-Type', 'text/xml');
  res.write(generateSiteMap(urls));
  res.end();

  return {
    props: {},
  };
};

function generateUrls(allTopic: TopicId[]): string[] {
  const result: string[] = [];
  for(const topic of allTopic) {
    result.push(`
      <url>
        <loc>${`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}topic/${topic.id}`}</loc>
      </url>
    `);

    for(const chapter of topic.chapters) {
      result.push(`
        <url>
          <loc>${`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}topic/${topic.id}/${chapter.id}`}</loc>
        </url>
      `);

      for(const post of chapter.posts) {
        result.push(`
          <url>
            <loc>${`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}topic/${topic.id}/${chapter.id}/${post.id}`}</loc>
          </url>
        `);
      }
    }
  }

  return result;
};

function generateSiteMap(urls: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.karpedia.site</loc>
      </url>
      <url>
        <loc>https://www.karpedia.site/topic</loc>
      </url>
      <url>
        <loc>https://www.karpedia.site/portfolio</loc>
      </url>
      ${urls.join('')}
    </urlset>
  `;
}