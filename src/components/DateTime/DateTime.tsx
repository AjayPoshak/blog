import styles from "./DateTime.module.scss";
export function DateTime({ children }: { children: React.ReactNode }) {
  return <span className={styles.dateTime}>{children}</span>;
}
