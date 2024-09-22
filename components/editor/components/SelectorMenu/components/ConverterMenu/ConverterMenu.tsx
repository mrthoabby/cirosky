"use client";
import style from "./css/default.module.css";
import BlockQuoteIcon from "./icons/BlockQuoteIcon";

import { getActions } from "./domain/Actions";
import { ITypographyMenuProps } from "./domain/Props";
export default function ConverterMenu({ editor }: Readonly<ITypographyMenuProps>): JSX.Element {
  const execute = getActions(editor);
  return (
    <div className={style.container}>
      <button title="BlockQuote" className={style.button} onClick={execute.toggleBlockQuote}>
        <BlockQuoteIcon />
      </button>
      <button title="BlockCode" className={style.button} onClick={execute.toggleBlockCode}>
        {"</>"}
      </button>
    </div>
  );
}
