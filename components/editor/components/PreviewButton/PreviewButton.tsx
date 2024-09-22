import { useState } from "react";
import styles from "./css/default.module.css";
import { IPreviewButtonProps } from "./domain/Props";
import EditIcon from "./icons/EditIcon";
import PreviewIcon from "./icons/PreviewIcon";

export default function PreviewButton({ editor }: IPreviewButtonProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(editor.isEditable);

  const handleEditing = (status: boolean) => {
    editor.setEditable(status);
    setIsEditing(status);
    if (status) {
      editor.commands.focus(editor.$doc.size - 2, { scrollIntoView: true });
    }
  };
  return (
    <section className={styles.keypad}>
      {isEditing ? (
        <button title="previsualizar" className={styles.button} onClick={() => handleEditing(false)}>
          <PreviewIcon className={styles.icon} />
        </button>
      ) : (
        <button title="editar" className={styles.button} onClick={() => handleEditing(true)}>
          <EditIcon className={styles.icon} />
        </button>
      )}
    </section>
  );
}
