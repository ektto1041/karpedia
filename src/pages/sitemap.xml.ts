import { apis } from "@/utils/api";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function SiteMap() {}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  // const result = await apis.getAllPost();
  // const allPostId = result.data.map(post => post.id);

  // res.setHeader('Content-Type', 'text/xml');
  // res.write(generateSiteMap(allPostId));
  // res.end();

  return {
    props: {},
  };
};

function generateSiteMap(allPostId: number[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://www.karpedia.site</loc>
    </url>
    ${allPostId.map((postId) => {
        return `
    <url>
        <loc>${`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}posts/${postId}`}</loc>
    </url>`;
      })
      .join('')}
  </urlset>
  `;
}