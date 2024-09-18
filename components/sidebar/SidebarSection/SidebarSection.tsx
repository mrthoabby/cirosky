import MiniCloseButton from "@/components/shared/MiniCloseButton/MiniCloseButton";
import { MiniInput } from "@/components/shared/MiniInput/MiniInput";
import { IPage } from "@/domain/interfaces/IPage";
import { duplicateNamePagesCategorizer } from "@/domain/page/utils";
import { deleteSection, updateSectionTitle } from "@/external/API";
import {
  useAddPageToSectionReducer,
  useGetSectionByIdSelector,
  useRemovePageFromSectionReducer,
  useRemoveSectionReducer,
  useUpdateSectionTitleReducer,
} from "@/store/sections/sectionsSlice";
import { useState } from "react";
import SidebarButton from "../SideBarButton/SidebarButton";
import SidebarPageNav from "../SidebarNav/SidebarPageNav";
import styles from "./css/default.module.css";
import { ISectionProps } from "./domain/Props";

export default function SidebarSection({ title, pages, id: sectionId }: Readonly<ISectionProps>): JSX.Element {
  const [showEditSectionTitleInput, setShowEditSectionTitleInput] = useState(false);
  const [showAddPageInput, setShowAddPageInput] = useState(false);

  const propagateNewTitle = useUpdateSectionTitleReducer();
  const propagateRemoveSection = useRemoveSectionReducer();
  const propagateAddPageToSection = useAddPageToSectionReducer();
  const propagateRemovePageFromSection = useRemovePageFromSectionReducer();

  const getSectionById = useGetSectionByIdSelector();

  function saveNewTitle(title: string) {
    updateSectionTitle(title, sectionId)
      .then((response) => {
        //TODO: handle response
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    propagateNewTitle(title, sectionId);
    setShowEditSectionTitleInput(false);
  }

  function removeSection() {
    const section = getSectionById(sectionId) as ISectionProps;

    if (!section) {
      alert("La sección no existe");
      return;
    }

    if (section.pages && section.pages.length > 0) {
      //TODO: show modal with warning
      alert("Alerta por que la sección tiene páginas");
    }

    deleteSection(sectionId)
      .then((response) => {
        //TODO: handle response
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    propagateRemoveSection(sectionId);
  }

  function addPageToSection(title: string) {
    propagateAddPageToSection(title, sectionId);
  }

  function removePageFromSection(pageId: string) {
    propagateRemovePageFromSection(pageId, sectionId);
  }

  return (
    <details className={styles.container} open>
      <summary className={styles.title}>
        {showEditSectionTitleInput ? (
          <MiniInput
            placeholder="Guardar"
            initialValue={title}
            onClose={() => setShowEditSectionTitleInput(false)}
            showSaveButton
            onSave={saveNewTitle}
          />
        ) : (
          <>
            <p className={styles.titleText}>{title}</p>
            <button title="Editar" className={styles.icon} onClick={() => setShowEditSectionTitleInput(true)}>
              E
            </button>
          </>
        )}
        <span className={styles.hooverHidden}>
          <MiniCloseButton title="Eliminar sección" right="8px" onClick={removeSection} />
        </span>
      </summary>

      <ul>
        <li>
          {showAddPageInput ? (
            <MiniInput placeholder="Nueva pagina" onClose={() => setShowAddPageInput(false)} onSave={addPageToSection} isSubButton />
          ) : (
            <SidebarButton text="Agregar página" onClick={() => setShowAddPageInput(true)} />
          )}
        </li>
        {duplicateNamePagesCategorizer(pages).map(({ title, id }: IPage) => (
          <SidebarPageNav
            text={title}
            href={`/section/${sectionId}/page/${id}`}
            key={`${id}page-${crypto.randomUUID}`}
            onClick={() => {
              removePageFromSection(id);
            }}
          />
        ))}
      </ul>
    </details>
  );
}
