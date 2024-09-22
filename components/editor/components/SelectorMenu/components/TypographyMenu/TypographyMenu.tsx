"use client";
import style from "./css/default.module.css";
import { getActions } from "./domain/Actions";
import { ITypographyMenuProps } from "./domain/Props";

export default function TypographyMenu({ editor }: Readonly<ITypographyMenuProps>): JSX.Element {
  const execute = getActions(editor);
  return (
    <div className={style.container}>
      <button title="Negrita" className={style.button} onClick={execute.toggleHeadingTitle}>
        <b>H</b>
      </button>
      <button title="Negrita" className={style.button} onClick={execute.toggleBold}>
        <b>N</b>
      </button>
      <button title="Cursiva" className={style.button} onClick={execute.toggleItalic}>
        <i>I</i>
      </button>
    </div>
  );
}
