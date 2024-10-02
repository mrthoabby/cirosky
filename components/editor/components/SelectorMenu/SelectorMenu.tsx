import { BubbleMenu, isTextSelection } from "@tiptap/react";
import GrouperMenu from "./components/ConverterMenu/ConverterMenu";
import TypographyMenu from "./components/TypographyMenu/TypographyMenu";
import style from "./css/default.module.css";
import { ISelectorMenuProps } from "./domain/Props";

export default function SelectorMenu({ editor }: Readonly<ISelectorMenuProps>): JSX.Element {
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      shouldShow={({ editor, view, state, oldState, from, to }) => {
        const { doc, selection } = state;
        const { empty } = selection;
        const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(state.selection);

        const hasEditorFocus = view.hasFocus() || editor.isFocused;

        if (!hasEditorFocus || empty || isEmptyTextBlock || editor.isActive("image")) {
          return false;
        }

        return true;
      }}
      className={style.container}
    >
      <TypographyMenu editor={editor} />
      <span className={style.line}></span>
      <GrouperMenu editor={editor} />
      <span className={style.line}></span>
      <GrouperMenu editor={editor} />
    </BubbleMenu>
  );
}
