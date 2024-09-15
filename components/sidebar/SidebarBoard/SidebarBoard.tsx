import logo from "@/public/cirosky.svg";

import styles from "./css/board.module.css";

import Loader from "@/components/shared/Loader/Loader";
import SidebarSectionContainer from "@/components/sidebar/SidebarSectionContainer/SidebarSectionContainer";
import Image from "next/image";
import { Suspense } from "react";
import SidebarAddSection from "../SidebarAddSection/SidebarAddSection";

export default async function SidebarBoard(): Promise<JSX.Element> {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <Image src={logo} alt="Cirosky" />
        <h1 className={styles.title}>Cirosky</h1>
      </header>
      <section style={{ marginBottom: 30, paddingLeft: 30 }}>[DELVELOPING... AQUÍ SEARCHER]</section>
      <SidebarAddSection />
      <Suspense fallback={<Loader />}>
        <SidebarSectionContainer />
      </Suspense>
    </section>
  );
}
