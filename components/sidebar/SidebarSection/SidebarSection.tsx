import { IPage } from "@/domain/interfaces/IPage";
import SidebarButton from "../SideBarButton/SidebarButton";
import SidebarNav from "../SidebarNav/SidebarNav";
import styles from "./css/default.module.css";
import { ISectionProps } from "./domain/Props";

export default function SidebarSection({ title, pages, id: sectionId }: Readonly<ISectionProps>): JSX.Element {
  return (
    <details className={styles.container} open>
      <summary className={styles.title}>{title}</summary>
      <ul>
        <li>
          <SidebarButton text="Nueva pagina" isSubButton />
        </li>
        {pages?.map(({ title, id }: IPage) => (
          <SidebarNav text={title} href={`/section/${sectionId}/page/${id}`} key={`${id}page-${crypto.randomUUID}`} />
        ))}
      </ul>
    </details>
  );
}
