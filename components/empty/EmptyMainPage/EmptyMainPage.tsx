import Image from "next/image";

import defaultStyles from "@/components/empty/EmptyMainPage/css/default.module.css";

import arrow from "@/public/arrow.webp";

export default function EmptyMainPage(): JSX.Element {
  return (
    <section className={defaultStyles.container}>
      <Image src={arrow} className={defaultStyles.image} alt="Flecha señalando barra de opciones" />
      <h6 className={defaultStyles.title}>&quot;Está un poco vacío aquí... ¡Agrega tu primer proyecto para llenar este espacio!&quot;</h6>
    </section>
  );
}
