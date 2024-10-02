import { Editor } from "@tiptap/react";
import { EnumDefaultGrouper } from "./Props";

function bulletLis(editor: Editor) {
  editor.chain().focus().toggleBulletList().run();
}

function link(editor: Editor, url: string) {
  editor.chain().focus().setLink({ href: url }).run();
}

interface Actions {
  toggleBulletLis: VoidFunction;
  setLink: (url: string) => void;
}

export function getActions(editor: Editor): Actions {
  return {
    toggleBulletLis: () => bulletLis(editor),
    setLink: (url: string) => link(editor, url),
  };
}

export function isBulletListActive(editor: Editor) {
  return editor.isActive(EnumDefaultGrouper.BulletedList);
}
