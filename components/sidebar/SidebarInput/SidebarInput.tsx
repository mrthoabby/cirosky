"use client";

import MiniCloseButton from "@/components/shared/MiniCloseButton/MiniCloseButton";
import { SectionFactory } from "@/domain/section/SectionFactory";
import { createSection } from "@/external/API";
import {
  useCreateSectionReducer,
  useGetShowCreateSectionButtonSwitchInputSelector,
  useSetShowCreateSectionButtonSwitchInputReducer,
} from "@/store/sections/sectionsSlice";
import { useEffect, useRef, useState } from "react";
import styles from "./css/default.module.css";
import { ISidebarAddSectionInputProps } from "./domain/Props";

export default function SidebarInput({ placeholder }: Readonly<ISidebarAddSectionInputProps>): JSX.Element {
  const [sectionName, setSectionName] = useState("");

  const inputTextRef = useRef<HTMLInputElement | null>(null);

  const showAddSectionButton = useGetShowCreateSectionButtonSwitchInputSelector();

  const propagateSection = useCreateSectionReducer();
  const setAddSectionButtonViability = useSetShowCreateSectionButtonSwitchInputReducer();

  function hideInputOnBlur(): void {
    if (sectionName.trim() === "") {
      setAddSectionButtonViability(true);
    }
  }

  function hideInputWithSpecialKeys(event: React.KeyboardEvent<HTMLInputElement>): void {
    const specialKeys = ["Enter", "Escape"];

    if (specialKeys.includes(event.key) && sectionName.trim() !== "") {
      if (event.key === "Enter") {
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
      setAddSectionButtonViability(true);
    }
  }

  useEffect(() => {
    if (inputTextRef.current && !showAddSectionButton) {
      inputTextRef.current?.focus();
    }
  }, []);

  return (
    <aside className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        onKeyUp={hideInputWithSpecialKeys}
        onBlur={hideInputOnBlur}
        ref={inputTextRef}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSectionName(event.target.value)}
      />
      <MiniCloseButton onClick={() => setAddSectionButtonViability(true)} right="16px" top="4px" />
    </aside>
  );
}
