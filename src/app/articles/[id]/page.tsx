import Markdown from "react-markdown";
import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import styles from "./page.module.scss";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { notFound } from "next/navigation";
import {
  buildMetadata,
  excerpt,
  extractMetadata,
  readingTime,
  toISODate,
} from "@/app/utils";
import { DateTime } from "@/components/DateTime";

const SITE_URL = "https://www.ajayposhak.in";

function getArticle(id: string) {
  try {
    const raw = fs.readFileSync(path.resolve(`src/content/${id}.md`), "utf-8");
    return extractMetadata(raw);
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  return buildMetadata().map((article) => ({
    id: article.fileNameWithoutExtension,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) return {};

  const { content, metadata } = article;
  const description = excerpt(content);
  const canonical = `/articles/${id}`;

  return {
    title: metadata.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: metadata.title,
      description,
      url: `${SITE_URL}${canonical}`,
      publishedTime: toISODate(metadata.publishedAt),
      authors: ["Ajay Poshak"],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description,
      creator: "@poshakajay",
    },
  };
}

export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) notFound();

  const { content: actualContent, metadata } = article;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    datePublished: toISODate(metadata.publishedAt),
    description: excerpt(actualContent),
    author: { "@type": "Person", name: "Ajay Poshak", url: SITE_URL },
    url: `${SITE_URL}/articles/${id}`,
    mainEntityOfPage: `${SITE_URL}/articles/${id}`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className={styles.mainContainer}>
        <header className={styles.titleContainer}>
          <div className={styles.meta}>
            {metadata?.publishedAt ? (
              <DateTime>{metadata.publishedAt}</DateTime>
            ) : null}
            <span aria-hidden="true">·</span>
            <span>{readingTime(actualContent)}</span>
          </div>
          {metadata?.title ? (
            <h1 className={styles.title}>{metadata.title}</h1>
          ) : null}
        </header>
        <Markdown
          components={{
            code(props) {
              const { children, className, node, ref, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  language={match[1]}
                  style={oneDark}
                  showLineNumbers
                  customStyle={{
                    margin: "1.75rem 0",
                    borderRadius: "10px",
                    fontSize: "0.88rem",
                    border: "1px solid var(--rule)",
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {actualContent}
        </Markdown>
      </section>
    </main>
  );
}
