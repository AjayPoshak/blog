import RSS from "rss";
import { buildMetadata } from "@/app/utils";

export async function GET() {
  const feed = new RSS({
    title: "Ajay Poshak's Blog",
    description: "Ajay Poshak's Blog",
    feed_url: "https://www.ajayposhak.in/rss.xml",
    site_url: "https://www.ajayposhak.in/",
    copyright: `Copyright ${new Date().getFullYear().toString()}, Ajay Poshak`,
    language: "en-US",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const articlesMetadata = buildMetadata();
  articlesMetadata.forEach((article) => {
    feed.item({
      title: article.metadata.title,
      description: article.metadata.subtitle || '',
      url: `https://www.ajayposhak.in/articles/${article.fileNameWithoutExtension.toLowerCase()}`,
      author: "Ajay Poshak",
      date: article.metadata.publishedAt,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
