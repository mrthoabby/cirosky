"use client";
import ListIcon from "@/components/editor/components/SelectorMenu/components/ConverterMenu/icons/ListIcon";
import { useRef } from "react";
import style from "./css/default.module.css";
import { getActions } from "./domain/Actions";
import { IGrouperMenuProps } from "./domain/Props";
import LinkIcon from "./icons/LinkIcon";

export default function ConverterMenu({ editor }: Readonly<IGrouperMenuProps>): JSX.Element {
  const inputLink = useRef<HTMLInputElement>(null);
  const execute = getActions(editor);

  function showInputLink() {
    if (inputLink.current) {
      inputLink.current.style.display = "block";
      const previousUrl = editor.getAttributes("link").href;
      if (previousUrl) {
        inputLink.current.value = previousUrl;
      } else {
        inputLink.current.value = "https://";
      }
      inputLink.current.focus();
    }
  }

  function hideInputLink() {
    if (inputLink.current) {
      inputLink.current.style.display = "none";
    }
  }

  function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      execute.setLink(event.currentTarget.value);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      console.log("Escape key pressed");
    }
  }

  return (
    <>
      <div className={style.container}>
        <button title="Lista" className={style.button} onClick={execute.toggleBulletLis}>
          <ListIcon />
        </button>
        <button title="Url" className={style.button} onClick={showInputLink}>
          <LinkIcon />
        </button>
      </div>
      <input
        ref={inputLink}
        onBlur={hideInputLink}
        className={`${style.inputLink} `}
        type="url"
        placeholder="https://tu.url.com"
        onKeyDown={onKeyPress}
      />
    </>
  );
}
