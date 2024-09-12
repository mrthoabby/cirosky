import logo from "@/public/cirosky.svg";

import styles from "./css/board.module.css";

import Loader from "@/components/shared/Loader/Loader";
import SidebarButton from "@/components/sidebar/SideBarButton/SidebarButton";
import SidebarSectionList from "@/components/sidebar/SidebarSectionList/SidebarSectionList";
import Image from "next/image";
import { Suspense } from "react";

export default async function SidebarBoard(): Promise<JSX.Element> {
  return (
    <aside className={styles.container}>
      <header className={styles.header}>
        <Image src={logo} alt="Cirosky" />
        <h1 className={styles.title}>Cirosky</h1>
      </header>
      <section style={{ marginBottom: 30, paddingLeft: 30 }}>[DELVELOPING... AQUI SEARCHER]</section>
      <nav>
        <SidebarButton text="Crear sección" />
        <Suspense fallback={<Loader />}>
          <SidebarSectionList />
        </Suspense>
      </nav>
    </aside>
  );
}
