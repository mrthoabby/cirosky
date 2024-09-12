import ISidebarButtonProps from "./domain/Props";

import defaultStyles from "./css/default.module.css";

export default function SidebarButton({ text, icon = <>+</>, isSubButton = false, onClick }: Readonly<ISidebarButtonProps>): JSX.Element {
  return (
    <button className={`${defaultStyles.button}`} onClick={onClick}>
      <p className={`${defaultStyles.text} ${isSubButton && defaultStyles.subButton}`}>
        {icon} {text}
      </p>
    </button>
  );
}
