"use client";
import ListIcon from "@/components/editor/components/SelectorMenu/components/GrouperMenu/icons/ListIcon";
import style from "./css/default.module.css";
import { getActions } from "./domain/Actions";
import { IGrouperMenuProps } from "./domain/Props";

export default function GrouperMenu({ editor }: Readonly<IGrouperMenuProps>): JSX.Element {
  const execute = getActions(editor);
  return (
    <div className={style.container}>
      <button title="Lista" className={style.button} onClick={execute.toggleBulletLis}>
        <ListIcon />
      </button>
    </div>
  );
}
