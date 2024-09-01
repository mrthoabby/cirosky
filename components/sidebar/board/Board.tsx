import Link from "next/link";
import SidebarButton from "../SideBarButton/SidebarButton";

import logo from "@/public/cirosky.svg";

import boardStyles from "./css/board.module.css";

import { EnumSidebarButtonType } from "../SideBarButton/types/Enums";
import Image from "next/image";

export default function Board(): JSX.Element {
  return (
    <aside className={boardStyles.container}>
      <header className={boardStyles.header}>
        <Image src={logo} alt="Cirosky" />
        <h1 className={boardStyles.title}>Cirosky</h1>
      </header>
      <nav>
        <ul className={boardStyles.list}>
          <li>
            <Link href="/board">
              <SidebarButton
                text="Crear sección"
                type={EnumSidebarButtonType.SECTION_CREATE}
                href={""}
              />
            </Link>
          </li>
          <li>
            <Link href="/board">
              <SidebarButton
                text="Mis CVs"
                type={EnumSidebarButtonType.SECTION_VIEWER_TITLE}
                href={""}
              />
            </Link>
          </li>
          <li>
            <Link href="/board">
              <SidebarButton
                text="Full Stack 💻 [EN]"
                type={EnumSidebarButtonType.PAGE_VIEWER}
                href={""}
              />
            </Link>
          </li>
          <li>
            <Link href="/board">
              <SidebarButton
                text="Full Stack 💻 [ES]"
                type={EnumSidebarButtonType.PAGE_VIEWER}
                href={""}
              />
            </Link>
          </li>
          <li>
            <Link href="/board">
              <SidebarButton
                text="Backend Go 🖥️ [ES]"
                type={EnumSidebarButtonType.PAGE_VIEWER}
                href={""}
              />
            </Link>
          </li>
          <li>
            <Link href="/board">
              <SidebarButton
                text="Backend Java 😎💥 [ES]"
                type={EnumSidebarButtonType.PAGE_VIEWER}
                href={""}
              />
            </Link>
          </li>
          <li>
            <Link href="/board">
              <SidebarButton
                text="Añadir pagina"
                type={EnumSidebarButtonType.PAGE_CREATE}
                href={""}
              />
            </Link>
          </li>
          <li>
            <Link href="/board">
              <SidebarButton
                text="Proyectos 🧠 😎💥"
                type={EnumSidebarButtonType.SECTION_VIEWER_TITLE}
                href={""}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
