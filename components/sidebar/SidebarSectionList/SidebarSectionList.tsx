"use client";
import SidebarSection from "@/components/sidebar/SidebarSection/SidebarSection";
import { ISection } from "@/domain/interfaces/ISection";
import styles from "./css/default.module.css";
import { ISidebarSectionListProps } from "./domain/Props";

export default function SidebarSectionList({ sections }: ISidebarSectionListProps): JSX.Element {
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
