import MiniCloseButton from "@/components/shared/MiniCloseButton/MiniCloseButton";
import Link from "next/link";
import styles from "./css/default.module.css";
import { ISidebarNavProps } from "./domain/Props";

export default function SidebarPageNav({ text, icon = <>• </>, href, isActive, onClick }: Readonly<ISidebarNavProps>): JSX.Element {
  return (
    <li className={`${styles.nav} ${isActive && styles.isActive}`}>
      <Link href={href} className={styles.title}>
        {icon} {text}
      </Link>
      <span className={styles.hooverHidden}>
        <MiniCloseButton title="Eliminar pagina" right="8px" top="3px" onClick={onClick} />
      </span>
    </li>
  );
}
