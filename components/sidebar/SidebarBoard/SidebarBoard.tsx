import logo from "@/assets/cirosky.svg";
import Loader from "@/components/shared/Loader/Loader";
import SidebarSectionContainer from "@/components/sidebar/SidebarSectionContainer/SidebarSectionContainer";
import Image from "next/image";
import { Suspense } from "react";
import SidebarSectionActions from "../SidebarSectionActions/SidebarSectionActions";
import styles from "./css/board.module.css";

export default async function SidebarBoard(): Promise<JSX.Element> {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <Image src={logo} alt="Cirosky" />
        <h1 className={styles.title}>Cirosky</h1>
      </header>
      <SidebarSectionActions />
      <Suspense fallback={<Loader />}>
        <SidebarSectionContainer />
      </Suspense>
    </section>
  );
}
