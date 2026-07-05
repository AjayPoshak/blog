import Markdown from "react-markdown";
import fs from "node:fs";
import path from "node:path";
import styles from "./page.module.scss";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { notFound } from "next/navigation";
import { extractMetadata, readingTime } from "@/app/utils";
import { DateTime } from "@/components/DateTime";

export default function Article({ params }: { params: { id: string } }) {
  let content = "";
  try {
    content = fs.readFileSync(
      path.resolve(`src/content/${params.id}.md`),
      "utf-8",
    );
  } catch (err) {
    console.log(err);
    notFound();
  }

  const { content: actualContent, metadata } = extractMetadata(content);
  return (
    <main>
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
