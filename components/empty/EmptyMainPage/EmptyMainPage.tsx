"use server";
import styles from "@/components/empty/EmptyMainPage/css/default.module.css";
import Image from "next/image";
import arrow from "./assets/arrow.webp";

export default async function EmptyMainPage(): Promise<JSX.Element> {
  return (
    <section className={styles.container}>
      <Image src={arrow} className={styles.image} alt="Flecha señalando barra de opciones" />
      <h6 className={styles.title}>&quot;Está un poco vacío aquí... ¡Agrega tu primer proyecto para llenar este espacio!&quot;</h6>
    </section>
  );
}
