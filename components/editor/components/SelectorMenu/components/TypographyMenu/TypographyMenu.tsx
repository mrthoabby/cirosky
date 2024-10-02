"use client";
import { Level } from "@tiptap/extension-heading";
import { createElement, useRef } from "react";
import style from "./css/default.module.css";
import { getActions } from "./domain/Actions";
import { ITypographyMenuProps } from "./domain/Props";

export default function TypographyMenu({ editor }: Readonly<ITypographyMenuProps>): JSX.Element {
  const execute = getActions(editor);
  const asideTitles = useRef<HTMLElement>(null);

  function showTitles() {
    if (asideTitles.current) {
      asideTitles.current.style.display = asideTitles.current.style.display === "none" ? "flex" : "none";
    }
  }

  function hideTitles() {
    if (asideTitles.current) {
      asideTitles.current.style.display = "none";
    }
  }

  return (
    <div className={style.container}>
      <aside className={style.titlesType} ref={asideTitles} onBlur={hideTitles}>
        {(() => {
          let headers: Level[] = [1, 2, 3, 4, 5, 6];
          return headers.map((header) => {
            return createElement(
              `h${header}`,
              {
                key: header,
                className: style.hoverTittleType,
                onClick: () => {
                  execute.setHeadingTitle(header);
                },
              },
              `H${header}`
            );
          });
        })()}
      </aside>
      <button title="Encabezado" className={style.button} onClick={showTitles}>
        <strong>E</strong>
      </button>
      <button title="Negrita" className={style.button} onClick={execute.toggleBold}>
        <b>N</b>
      </button>
      <button title="Cursiva" className={style.button} onClick={execute.toggleItalic}>
        <i>I</i>
      </button>
      <button title="Subrayado" className={style.button} onClick={execute.toggleUnderline}>
        <p className={style.underline}>S</p>
      </button>
      <button title="Tachado" className={style.button} onClick={execute.toggleUnderline}>
        <del>T</del>
      </button>
    </div>
  );
}
