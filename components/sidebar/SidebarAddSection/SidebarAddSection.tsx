"use client";

import SidebarButton from "@/components/sidebar/SideBarButton/SidebarButton";
import SidebarInput from "@/components/sidebar/SidebarInput/SidebarInput";
import {
  useGetShowCreateSectionButtonSwitchInputSelector,
  useSetShowCreateSectionButtonSwitchInputReducer,
} from "@/store/sections/sectionsSlice";

export default function SidebarAddSection(): JSX.Element {
  const showAddSectionButton = useGetShowCreateSectionButtonSwitchInputSelector();
  const setAddSectionButtonViability = useSetShowCreateSectionButtonSwitchInputReducer();

  return showAddSectionButton ? (
    <SidebarButton text="Crear sección" onClick={() => setAddSectionButtonViability(false)} />
  ) : (
    <SidebarInput placeholder="Nombre de la sección" />
  );
}
