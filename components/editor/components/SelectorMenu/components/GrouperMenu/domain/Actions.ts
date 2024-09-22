import { Editor } from "@tiptap/react";
import { EnumDefaultGrouper } from "./Props";

function bulletLis(editor: Editor) {
  editor.chain().focus().toggleBulletList().run();
}

interface Actions {
  toggleBulletLis: VoidFunction;
}

export function getActions(editor: Editor): Actions {
  return {
    toggleBulletLis: () => bulletLis(editor),
  };
}

export function isBulletListActive(editor: Editor) {
  return editor.isActive(EnumDefaultGrouper.BulletedList);
}
