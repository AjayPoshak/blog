import Link from "next/link";
import styles from "./page.module.scss";
import { buildMetadata } from "@/app/utils";
import { DateTime } from "@/components/DateTime";

export default function Home() {
  const articlesInformation = buildMetadata();
  return (
    <main className={styles.main}>
      <ul className={styles.listingContainer}>
        {articlesInformation.map((value, index) => (
          <li className={styles.listItem} key={index}>
            <div className={styles.subtitleContainer}>
              {value?.metadata?.publishedAt ? (
                <DateTime>{value.metadata.publishedAt}</DateTime>
              ) : null}
              {value?.metadata?.readingTime ? (
                <p>{value.metadata.readingTime}</p>
              ) : null}
            </div>

            {value?.metadata?.title ? (
              <div>
                <Link
                  className={styles.title}
                  href={`/${value?.fileNameWithoutExtension}`}
                >
                  <h2>{value?.metadata.title}</h2>
                </Link>
              </div>
            ) : null}
            {value?.metadata?.subtitle ? (
              <p>{value.metadata.subtitle}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
