"use client";

import SidebarButton from "@/components/sidebar/SideBarButton/SidebarButton";
import SidebarInput from "@/components/sidebar/SidebarInput/SidebarInput";
import { SectionFactory } from "@/domain/section/SectionFactory";
import { createSection } from "@/external/API";
import { useCreateSectionReducer } from "@/store/sections/sectionsSlice";
import { useState } from "react";

export default function SidebarAddSection(): JSX.Element {
  const [showInput, setShowInput] = useState(false);
  const propagateSection = useCreateSectionReducer();

  function saveSectionName(sectionName: string): void {
    propagateSection(sectionName);
    createSection(SectionFactory.createSection(sectionName))
      .then((response) => {
        //TODO: handle response
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return showInput ? (
    <SidebarInput
      placeholder="Nombre de la sección"
      onSave={saveSectionName}
      onClose={() => {
        setShowInput(false);
      }}
    />
  ) : (
    <SidebarButton text="Crear sección" onClick={() => setShowInput(true)} />
  );
}
