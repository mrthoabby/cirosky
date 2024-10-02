import { Level } from "@tiptap/extension-heading";
import { Editor } from "@tiptap/react";

function bold(editor: Editor) {
  editor.chain().focus().toggleBold().run();
}

function italic(editor: Editor) {
  editor.chain().focus().toggleItalic().run();
}

function headingTitle(editor: Editor, level: Level) {
  editor.chain().focus().toggleHeading({ level }).run();
}

function underline(editor: Editor) {
  editor.chain().focus().toggleUnderline().run();
}

interface Actions {
  toggleBold: VoidFunction;
  toggleItalic: VoidFunction;
  setHeadingTitle: (level: Level) => void;
  toggleUnderline: VoidFunction;
}

export function getActions(editor: Editor): Actions {
  return {
    toggleBold: () => bold(editor),
    toggleItalic: () => italic(editor),
    setHeadingTitle: (level: Level) => headingTitle(editor, level),
    toggleUnderline: () => underline(editor),
  };
}
