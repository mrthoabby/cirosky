import styles from "./css/default.module.css";
import { IMiniCloseButtonProps } from "./domain/Props";

export default function MiniCloseButton({ onClick, right, top }: IMiniCloseButtonProps): JSX.Element {
  return (
    <button style={{ right, top }} className={styles.button} onClick={onClick} aria-label="Close">
      X
    </button>
  );
}
