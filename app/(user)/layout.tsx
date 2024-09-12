import SidebarBoard from "@/components/sidebar/SidebarBoard/SidebarBoard";
import React from "react";
import styles from "./styles.module.css";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <main className={styles.container}>
      <header className={styles.header}>[Developing...]</header>
      <aside className={styles.sidebar}>
        <SidebarBoard />
      </aside>
      <section className={styles.main}>{children}</section>
    </main>
  );
}
