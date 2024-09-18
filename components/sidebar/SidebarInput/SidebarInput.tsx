"use client";

import MiniCloseButton from "@/components/shared/MiniCloseButton/MiniCloseButton";
import { useEffect, useRef } from "react";
import styles from "./css/default.module.css";
import { ISidebarInputProps } from "./domain/Props";

export default function SidebarInput({ placeholder, onSave, onClose }: Readonly<ISidebarInputProps>): JSX.Element {
  const inputTextRef = useRef<HTMLInputElement | null>(null);

  function hideInputOnBlur(event: React.FocusEvent<HTMLInputElement>): void {
    const currentValue = event.currentTarget.value;
    if (currentValue.trim() === "") {
      onClose();
    }
  }

  function hideInputWithSpecialKeys(event: React.KeyboardEvent<HTMLInputElement>): void {
    const specialKeys = ["Enter", "Escape"];
    const currentValue = event.currentTarget.value;
    if (specialKeys.includes(event.key)) {
      if (event.key === "Enter" && currentValue.trim() !== "") {
        onSave(currentValue);
      }
      onClose();
    }
  }

  useEffect(() => {
    if (inputTextRef.current) {
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
      />
      <MiniCloseButton onClick={onClose} right="16px" top="4px" />
    </aside>
  );
}
