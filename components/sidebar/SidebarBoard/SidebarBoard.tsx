import logo from "@/public/cirosky.svg";

import styles from "./css/board.module.css";

import Loader from "@/components/shared/Loader/Loader";
import SidebarAddSection from "@/components/sidebar/SidebarAddSection/SidebarAddSection";
import SidebarSectionContainer from "@/components/sidebar/SidebarSectionContainer/SidebarSectionContainer";
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
        <SidebarAddSection />
        <Suspense fallback={<Loader />}>
          <SidebarSectionContainer />
        </Suspense>
      </nav>
    </aside>
  );
}
