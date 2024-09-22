import { BubbleMenu } from "@tiptap/react";
import ConverterMenu from "./components/ConverterMenu/ConverterMenu";
import GrouperMenu from "./components/GrouperMenu/GrouperMenu";
import TypographyMenu from "./components/TypographyMenu/TypographyMenu";
import style from "./css/default.module.css";
import { ISelectorMenuProps } from "./domain/Props";

export default function SelectorMenu({ editor }: Readonly<ISelectorMenuProps>): JSX.Element {
  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className={style.container}>
      <TypographyMenu editor={editor} />
      <span className={style.line}></span>
      <GrouperMenu editor={editor} />
      <span className={style.line}></span>
      <ConverterMenu editor={editor} />
    </BubbleMenu>
  );
}
