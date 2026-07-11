import Link from "next/link";
import styles from "./page.module.scss";
import { buildMetadata } from "@/app/utils";
import { DateTime } from "@/components/DateTime";

export default function Home() {
  const articlesInformation = buildMetadata();
  return (
    <main className={styles.main}>
      <ul className={styles.list}>
        {articlesInformation.map((value, index) => (
          <li className={styles.item} key={index}>
            <Link
              className={styles.link}
              href={`/articles/${value?.fileNameWithoutExtension}`}
            >
              <div className={styles.meta}>
                {value?.metadata?.publishedAt ? (
                  <DateTime>{value.metadata.publishedAt}</DateTime>
                ) : null}
                {value?.metadata?.readingTime ? (
                  <span aria-hidden="true">·</span>
                ) : null}
                {value?.metadata?.readingTime ? (
                  <span>{value.metadata.readingTime}</span>
                ) : null}
              </div>

              {value?.metadata?.title ? (
                <h2 className={styles.title}>{value.metadata.title}</h2>
              ) : null}

              {value?.metadata?.subtitle ? (
                <p className={styles.sub}>{value.metadata.subtitle}</p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
