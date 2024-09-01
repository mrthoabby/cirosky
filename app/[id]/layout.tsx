import Board from "@/components/sidebar/board/Board";
import styles from "./styles.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={styles.container}>
      <header className={styles.header}>[Developing...]</header>
      <aside className={styles.sidebar}>
        <Board />
      </aside>
      <section className={styles.main}>{children}</section>
    </main>
  );
}
