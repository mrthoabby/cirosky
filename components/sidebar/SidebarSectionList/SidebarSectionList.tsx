"use client";
import Loader from "@/components/shared/Loader/Loader";
import SidebarSection from "@/components/sidebar/SidebarSection/SidebarSection";
import { ISection } from "@/domain/interfaces/ISection";
import { fetchPaginatedSections } from "@/external/API";
import {
  useAddIncrementalSectionsReducer,
  useEnableIncrementalFetchingReducer,
  useGetFullSectionsSelector,
  useInitializeSectionsReducer,
  useSetFetchingDataReducer,
} from "@/store/sections/sectionsSlice";
import { useEffect, useRef } from "react";
import styles from "./css/default.module.css";
import { ISidebarSectionListProps } from "./domain/Props";

export default function SidebarSectionList({ firstSections, groupBy, totalPages }: Readonly<ISidebarSectionListProps>): JSX.Element {
  const isScrollAtTop = useRef<boolean>(false);
  const listContainer = useRef<HTMLUListElement | null>(null);

  const dataToShow: ISection[] = [];

  const { sections, pageToLoad, isFetchingData } = useGetFullSectionsSelector();

  const initializeSections = useInitializeSectionsReducer();
  const enableIncrementalFetching = useEnableIncrementalFetchingReducer();
  const addIncrementalSections = useAddIncrementalSectionsReducer();
  const setFetchingData = useSetFetchingDataReducer();

  function tryInitializeData(): void {
    if (sections.length === 0 && firstSections.length > 0) {
      dataToShow.push(...firstSections);
      initializeSections(firstSections);
    } else {
      dataToShow.push(...sections);
    }
  }

  function isScrollAtTheEnd(): boolean {
    const { current } = listContainer;
    const { scrollHeight = 0, clientHeight = 0, scrollTop = 0 } = current || {};

    const FINAL_POSITION = scrollHeight - clientHeight;
    const POSITION_DISTANCE = Math.abs(FINAL_POSITION - scrollTop);

    return POSITION_DISTANCE <= 1 && scrollHeight > 0;
  }

  function inactiveScrollEvents(): void {
    isScrollAtTop.current = false;
    listContainer.current?.removeEventListener("scroll", scrollWasMoved);
  }

  function tryEnableModFetchingData(): void {
    if (pageToLoad < totalPages) {
      enableIncrementalFetching();
    }
  }

  function isScrollVisible(): boolean {
    return !!listContainer.current && listContainer.current.scrollHeight > listContainer.current.clientHeight;
  }

  function scrollWasMoved(): void {
    if (isScrollAtTheEnd()) {
      inactiveScrollEvents();

      tryEnableModFetchingData();
    }
  }

  tryInitializeData();

  useEffect(() => {
    if (isFetchingData) {
      fetchPaginatedSections(groupBy, pageToLoad)
        .then((response) => {
          addIncrementalSections(response.Elements);
        })
        .catch((error: unknown) => {
          console.warn(error);
          setFetchingData(false);
        });
    } else if (isScrollVisible()) {
      isScrollAtTop.current = true;
    } else {
      tryEnableModFetchingData();
    }

    const cleanUpHandlers: (() => void)[] = [];

    if (isScrollAtTop.current && listContainer.current) {
      const ulElement = listContainer.current;
      ulElement.addEventListener("scroll", scrollWasMoved);

      cleanUpHandlers.push(() => ulElement.removeEventListener("scroll", scrollWasMoved));
    }

    return (): void => {
      cleanUpHandlers.forEach((clean) => clean());
    };
  }, [isFetchingData, pageToLoad]);

  return (
    <ul className={styles.container} ref={listContainer}>
      {dataToShow.map(({ title, pages, id }: ISection) => (
        <li key={`${id}section-${crypto.randomUUID}`} className={styles.list}>
          <SidebarSection title={title} pages={pages} id={id} />
        </li>
      ))}
      {isFetchingData && <Loader />}
    </ul>
  );
}
