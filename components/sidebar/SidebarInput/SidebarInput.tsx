import styles from "./css/default.module.css";
import { ISidebarAddSectionInputProps } from "./domain/Props";

export default function SidebarInput({
  placeholder,
  inputRef,
  onBlur,
  onKeyUp,
  onChange,
  onCloseClick,
}: ISidebarAddSectionInputProps): JSX.Element {
  return (
    <aside className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
        ref={inputRef}
        onChange={onChange}
      />
      <span className={styles.close} onClick={onCloseClick}>
        X
      </span>
    </aside>
  );
}
