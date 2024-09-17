import { IPage } from "@/domain/interfaces/IPage";
import { updateSectionTitle } from "@/external/API";
import { useUpdateSectionTitleReducer } from "@/store/sections/sectionsSlice";
import { useEffect, useRef, useState } from "react";
import SidebarButton from "../SideBarButton/SidebarButton";
import SidebarNav from "../SidebarNav/SidebarNav";
import styles from "./css/default.module.css";
import { ISectionProps } from "./domain/Props";

export default function SidebarSection({ title, pages, id: sectionId }: Readonly<ISectionProps>): JSX.Element {
  const [showEditInput, setShowEditInput] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  const propagateNewTitle = useUpdateSectionTitleReducer();

  function onBlurEditInput() {
    setShowEditInput(false);
  }

  function saveNewTitle() {
    if (editInputRef.current) {
      const newTitle = editInputRef.current.value;
      updateSectionTitle(newTitle, sectionId)
        .then((response) => {
          //TODO: handle response
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      propagateNewTitle(newTitle, sectionId);
      setShowEditInput(false);
    }
  }

  function hideInputWithSpecialKeys(event: React.KeyboardEvent<HTMLInputElement>): void {
    const specialKeys = ["Enter", "Escape"];

    if (specialKeys.includes(event.key) && editInputRef.current) {
      const newTitle = editInputRef.current.value;
      if (event.key === "Enter" && newTitle.trim() !== "") {
        saveNewTitle();
      }
      setShowEditInput(false);
    }
  }

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
      editInputRef.current.value = title;
    }
  }, [showEditInput]);
  return (
    <details className={styles.container} open>
      <summary className={styles.title}>
        {showEditInput ? (
          <>
            <input type="text" className={styles.input} ref={editInputRef} onBlur={onBlurEditInput} onKeyUp={hideInputWithSpecialKeys} />
            <button title="Guardar" className={styles.icon} onClick={saveNewTitle}>
              G
            </button>
          </>
        ) : (
          <>
            <p className={styles.titleText}>{title}</p>
            <button title="Editar" className={styles.icon} onClick={() => setShowEditInput(true)}>
              E
            </button>
          </>
        )}
      </summary>

      <ul>
        <li>
          <SidebarButton text="Nueva pagina" isSubButton />
        </li>
        {pages?.map(({ title, id }: IPage) => (
          <SidebarNav text={title} href={`/section/${sectionId}/page/${id}`} key={`${id}page-${crypto.randomUUID}`} />
        ))}
      </ul>
    </details>
  );
}
