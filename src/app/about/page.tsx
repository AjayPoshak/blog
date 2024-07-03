import styles from "./page.module.scss";
export default function About() {
  return (
    <section className={styles.aboutContainer}>
      <img
        className={styles.profilePicture}
        src="https://avatars3.githubusercontent.com/u/7375457?s=460&amp;v=4"
        alt="ajay's picture"
      />
      <p>
        Hey, I am Ajay Poshak. I am a Software Engineer with interests in
        building User Interfaces, dev tooling and recently got interested into
        databases. I have worked in BookMyShow, and currently working at
        Hackerrank as Lead Engineer.
      </p>

      <section className={styles.section}>
        <header>
          <h2 className={styles.sectionHeading}>Social Media</h2>
          <ul className={styles.list}>
            <li>
              <a href="mailto:poshakajay@gmail.com">Email</a>
            </li>
            <li>
              <a href="https://x.com/poshakajay">Twitter</a>
            </li>
            <li>
              <a href="https://github.com/ajayposhak">GitHub</a>
            </li>
          </ul>
        </header>
      </section>

      <section className={styles.section}>
        <header>
          <h2 className={styles.sectionHeading}>Books I have read</h2>
          <ul className={styles.list}>
            <li>
              <a href="/books/technical">Technical Books</a>
            </li>
            <li>
              <a href="/books/general">General Books</a>
            </li>
          </ul>
        </header>
      </section>
    </section>
  );
}
