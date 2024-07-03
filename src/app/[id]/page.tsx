import Markdown from "react-markdown";
import fs from "node:fs";
import path from "node:path";
import styles from "./page.module.scss";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { notFound } from "next/navigation";
import { extractMetadata } from "../utils";
import { DateTime } from "@/components/DateTime";

export default function Article({ params }: { params: { id: string } }) {
  let content = "";
  try {
    content = fs.readFileSync(
      path.resolve(`src/articles/${params.id}.md`),
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
          {metadata?.publishedAt ? (
            <DateTime>{metadata.publishedAt}</DateTime>
          ) : null}
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
