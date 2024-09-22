import { Editor } from "@tiptap/react";

function bold(editor: Editor) {
  editor.chain().focus().toggleBold().run();
}

function italic(editor: Editor) {
  editor.chain().focus().toggleItalic().run();
}

function headingTitle(editor: Editor) {
  editor.chain().focus().toggleHeading({ level: 1 }).run();
}

interface Actions {
  toggleBold: VoidFunction;
  toggleItalic: VoidFunction;
  toggleHeadingTitle: VoidFunction;
}

export function getActions(editor: Editor): Actions {
  return {
    toggleBold: () => bold(editor),
    toggleItalic: () => italic(editor),
    toggleHeadingTitle: () => headingTitle(editor),
  };
}
