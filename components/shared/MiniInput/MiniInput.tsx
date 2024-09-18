import { useEffect, useRef } from "react";
import styles from "./css/default.module.css";
import { IMiniInputProps } from "./domain/Props";

export function MiniInput({
  placeholder,
  initialValue,
  isSubButton = false,
  showSaveButton,
  onClose,
  onSave,
}: Readonly<IMiniInputProps>): JSX.Element {
  const editInputRef = useRef<HTMLInputElement>(null);

  function hideInputWithSpecialKeys(event: React.KeyboardEvent<HTMLInputElement>): void {
    const specialKeys = ["Enter", "Escape"];

    if (specialKeys.includes(event.key) && editInputRef.current) {
      const currentValue = editInputRef.current.value;
      if (event.key === "Enter" && currentValue.trim() !== "") {
        onSave(currentValue);
      }
      onClose();
    }
  }

  function saveValue() {
    if (editInputRef.current) {
      const currentValue = editInputRef.current.value;
      if (currentValue.trim() !== "") {
        onSave(currentValue);
      }
      onClose();
    }
  }

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.select();
    }
  }, []);
  return (
    <>
      <input
        type="text"
        className={`${styles.input} ${isSubButton && styles.subButton}`}
        ref={editInputRef}
        defaultValue={initialValue}
        placeholder={placeholder}
        onKeyUp={hideInputWithSpecialKeys}
      />
      {showSaveButton && (
        <button title={placeholder} className={styles.icon} onClick={saveValue}>
          {placeholder[0].toUpperCase()}
        </button>
      )}
    </>
  );
}
