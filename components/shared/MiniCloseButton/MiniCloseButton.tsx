import styles from "./css/default.module.css";
import { IMiniCloseButtonProps } from "./domain/Props";

export default function MiniCloseButton({ onClick, right, top, title }: IMiniCloseButtonProps): JSX.Element {
  return (
    <button title={title} style={{ right, top }} className={styles.button} onClick={onClick} aria-label="Close">
      X
    </button>
  );
}
