"use client";

import SidebarButton from "@/components/sidebar/SideBarButton/SidebarButton";
import SidebarInput from "@/components/sidebar/SidebarInput/SidebarInput";
import { useEffect, useRef, useState } from "react";

export default function SidebarAddSection(): JSX.Element {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const runShowInput = (): void => {
    setShowInput(true);
  };
  const hideInputOnBlur = (): void => {
    if (inputValue.trim() === "") {
      setShowInput(false);
    }
  };

  const hideInputOnCloseClick = (): void => {
    setShowInput(false);
  };

  const hideInputIfEvents = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      //Do save action
      setShowInput(false);
    } else if (event.key === "Escape") {
      setShowInput(false);
    }
  };

  const updateInputValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  return showInput ? (
    <SidebarInput
      onCloseClick={hideInputOnCloseClick}
      onChange={updateInputValue}
      inputRef={inputRef}
      placeholder="Nombre de la sección"
      onBlur={hideInputOnBlur}
      onKeyUp={hideInputIfEvents}
    />
  ) : (
    <SidebarButton text="Crear sección" onClick={runShowInput} />
  );
}
