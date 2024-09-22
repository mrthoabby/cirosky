import { Editor } from "@tiptap/react";
import { isBulletListActive } from "../../GrouperMenu/domain/Actions";

function blockQuote(editor: Editor) {
  if (isBulletListActive(editor)) {
    editor.chain().focus().toggleBulletList().run();
  }
  editor.chain().focus().toggleBlockquote().run();
}

function blockCode(editor: Editor) {
  editor.chain().focus().toggleCodeBlock().run();
}

interface Actions {
  toggleBlockQuote: VoidFunction;
  toggleBlockCode: VoidFunction;
}

export function getActions(editor: Editor): Actions {
  return {
    toggleBlockQuote: () => blockQuote(editor),
    toggleBlockCode: () => blockCode(editor),
  };
}
