import SidebarSection from "@/components/sidebar/SidebarSection/SidebarSection";
import { ISection } from "@/domain/interfaces/ISection";
import { GetSections } from "@/external/providers/sectionProvider";
import styles from "./css/default.module.css";

export default async function SidebarSectionList(): Promise<JSX.Element> {
  const sections = await GetSections();

  return (
    <ul>
      {sections.map(({ title, pages, id }: ISection) => (
        <li key={`${id}section-${crypto.randomUUID}`} className={styles.list}>
          <SidebarSection title={title} pages={pages} id={id} />
        </li>
      ))}
    </ul>
  );
}
