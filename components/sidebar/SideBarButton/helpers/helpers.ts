import { EnumSidebarButtonType } from "../types/Enums";
function getButtonTypeSymbolIcon(type: EnumSidebarButtonType): string {
  switch (type) {
    case EnumSidebarButtonType.PAGE_CREATE:
    case EnumSidebarButtonType.SECTION_CREATE:
      return "+ ";
    case EnumSidebarButtonType.SECTION_VIEWER_TITLE:
      return "# ";
    case EnumSidebarButtonType.PAGE_VIEWER:
      return "•  ";
  }
}

export { getButtonTypeSymbolIcon };
