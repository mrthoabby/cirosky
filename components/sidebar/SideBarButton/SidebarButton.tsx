import React from "react";
import ISidebarButtonProps from "./types/ISidebarButtonProps";

import defaultStyles from "./css/default.module.css";
import sectionStyles from "./css/section.module.css";
import pageStyles from "./css/page.module.css";

import { getButtonTypeSymbolIcon } from "@/components/sidebar/SideBarButton/helpers/helpers";
import { EnumSidebarButtonType } from "@/components/sidebar/SideBarButton/types/Enums";

const stylesClassMap: { [key in EnumSidebarButtonType]: string } = {
  [EnumSidebarButtonType.SECTION_CREATE]: [sectionStyles.create].join(" "),
  [EnumSidebarButtonType.SECTION_VIEWER_TITLE]: [sectionStyles.viewer].join(
    " "
  ),
  [EnumSidebarButtonType.PAGE_CREATE]: [pageStyles.create].join(" "),
  [EnumSidebarButtonType.PAGE_VIEWER]: [pageStyles.view].join(" "),
};

export default function SidebarButton({
  text,
  type,
}: Readonly<ISidebarButtonProps>): JSX.Element {
  return (
    <button className={`${defaultStyles.button} ${stylesClassMap[type]}`}>
      {getButtonTypeSymbolIcon(type)}
      {text}
    </button>
  );
}
