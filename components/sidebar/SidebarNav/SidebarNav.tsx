import Link from "next/link";
import styles from "./css/default.module.css";
import { ISidebarNavProps } from "./domain/Props";

export default function SidebarNav({ text, icon = <>• </>, href }: Readonly<ISidebarNavProps>): JSX.Element {
  return (
    <li className={styles.nav}>
      <Link href={href} className={styles.title}>
        {icon} {text}
      </Link>
    </li>
  );
}
