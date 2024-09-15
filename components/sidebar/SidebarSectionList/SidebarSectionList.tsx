"use client";
import Loader from "@/components/shared/Loader/Loader";
import SidebarSection from "@/components/sidebar/SidebarSection/SidebarSection";
import { ISection } from "@/domain/interfaces/ISection";
import { fetchPaginatedSections } from "@/external/API";
import { useEffect, useRef, useState } from "react";
import styles from "./css/default.module.css";
import { ISidebarSectionListProps, ISidebarSectionListState } from "./domain/Props";

export default function SidebarSectionList({
  currentPage: CurrentPage,
  sections: Elements,
  groupingSize: GroupBy,
  numberOfPages: TotalPages,
}: Readonly<ISidebarSectionListProps>): JSX.Element {
  const [state, setState] = useState<ISidebarSectionListState>({
    pageToLoad: CurrentPage,
    sections: Elements,
    showLoader: false,
  });

  const isScrollShowed = useRef<boolean>(false);
  const ulContainer = useRef<HTMLUListElement | null>(null);

  function scrollWasMoved(): void {
    if (ulContainer.current) {
      const FINAL_POSITION = (ulContainer.current?.scrollHeight ?? 0) - (ulContainer.current?.clientHeight ?? 0);
      const POSITION_DISTANCE =
        FINAL_POSITION - ulContainer.current.scrollTop < 0
          ? (FINAL_POSITION - ulContainer.current.scrollTop) * -1
          : FINAL_POSITION - ulContainer.current.scrollTop;

      if (POSITION_DISTANCE <= 1) {
        isScrollShowed.current = false;
        ulContainer.current?.removeEventListener("scroll", scrollWasMoved);

        if (state.pageToLoad < TotalPages) {
          setState((prev) => ({ ...prev, showLoader: true, pageToLoad: prev.pageToLoad + 1 }));
        }
      }
    }
  }

  useEffect(() => {
    if (state.showLoader) {
      fetchPaginatedSections(GroupBy, state.pageToLoad)
        .then((response) => {
          setState((prev) => ({ ...prev, sections: [...prev.sections, ...response.Elements], showLoader: false }));
        })
        .catch((error: unknown) => {
          console.warn(error);
          setState((prev) => ({ ...prev, showLoader: false }));
        });
    } else if (ulContainer.current) {
      if (!state.showLoader) {
        if (ulContainer.current.scrollHeight > ulContainer.current.clientHeight) {
          isScrollShowed.current = true;
        } else if (state.pageToLoad < TotalPages) {
          setState((prev) => ({ ...prev, showLoader: true, pageToLoad: prev.pageToLoad + 1 }));
        }
      }
    }

    const cleanUpHandlers: (() => void)[] = [];

    if (isScrollShowed.current && ulContainer.current) {
      const ulElement = ulContainer.current;
      ulElement.addEventListener("scroll", scrollWasMoved);

      cleanUpHandlers.push(() => ulElement.removeEventListener("scroll", scrollWasMoved));
    }

    return (): void => {
      cleanUpHandlers.forEach((clean) => clean());
    };
  }, [state.showLoader, state.pageToLoad]);

  return (
    <ul className={styles.container} ref={ulContainer}>
      {state.sections.map(({ title, pages, id }: ISection) => (
        <li key={`${id}section-${crypto.randomUUID}`} className={styles.list}>
          <SidebarSection title={title} pages={pages} id={id} />
        </li>
      ))}
      {state.showLoader && <Loader />}
    </ul>
  );
}
