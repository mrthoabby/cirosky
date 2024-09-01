import { EnumSidebarButtonType } from "./Enums";

export default interface ISidebarButtonProps {
  readonly text: string;
  readonly type: EnumSidebarButtonType;
  readonly href: string;
}
