import Link from "next/link";
import style from "./LayoutHeader.module.scss";
import "../../app/reset.scss";
import "../../app/globals.scss";

export function LayoutHeader({
  showProfilePicture = true,
}: {
  showProfilePicture?: boolean;
}) {
  return (
    <header className={style.header}>
      <div className={style.profileContainer}>
        {showProfilePicture ? (
          <img
            className={style.profileImage}
            src="https://avatars3.githubusercontent.com/u/7375457?s=460&v=4"
          />
        ) : null}
        <h1 className={style.heading}>Ajay Poshak</h1>
      </div>
      <nav>
        <ul className={style.nav}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/rss.xml">RSS</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
