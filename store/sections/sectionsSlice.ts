"use client";
import { ISection } from "@/domain/interfaces/ISection";
import { PageFactory } from "@/domain/page/PageFactory";
import { SectionFactory } from "@/domain/section/SectionFactory";
import { IdGenerator } from "@/helpers/IdGenerator";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

interface SectionSlice {
  sections: ISection[];
  pageToLoad: number;
  isFetchingData: boolean;
  showCreateSectionButtonSwitchInput: boolean;
  events: SectionEvents;
  onActionWas: EnumSectionAction;
}

interface SectionEvents {
  deleteEventIdentifier: string;
  previousDeleteEventIdentifier: string;
}

export enum EnumSectionAction {
  NONE = "NONE",
  DELETED = "SECTION_DELETED",
}

const initialState: SectionSlice = {
  sections: [],
  pageToLoad: 1,
  isFetchingData: false,
  showCreateSectionButtonSwitchInput: true,
  events: {
    deleteEventIdentifier: "",
    previousDeleteEventIdentifier: "",
  },
  onActionWas: EnumSectionAction.NONE,
};

//TODO: CLEAN NOT USED ACTIONS IN THE NEXT RELEASE
const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    updateSections: (state, action: PayloadAction<ISection[]>) => {
      state.sections = action.payload;
    },
    createSection: (state, action: PayloadAction<string>) => {
      state.sections.unshift(SectionFactory.createSection(action.payload));
    },
    addSection: (state, action: PayloadAction<ISection>) => {
      state.sections = [...state.sections, action.payload];
    },
    addSections: (state, action: PayloadAction<ISection[]>) => {
      state.sections = [...state.sections, ...action.payload];
    },
    initializeSections: (state, action: PayloadAction<ISection[]>) => {
      state.sections = action.payload;
    },
    incrementPageOfSections: (state) => {
      state.pageToLoad = state.pageToLoad + 1;
    },
    enableIncrementalFetchingSections: (state) => {
      state.isFetchingData = true;
      state.pageToLoad = state.pageToLoad + 1;
    },
    addIncrementalSections: (state, action: PayloadAction<ISection[]>) => {
      state.sections.push(...action.payload);
      state.isFetchingData = false;
    },
    setFetchingDataSections: (state, action: PayloadAction<boolean>) => {
      state.isFetchingData = action.payload;
    },
    setShowCreateSectionButtonSwitchInput: (state, action: PayloadAction<boolean>) => {
      state.showCreateSectionButtonSwitchInput = action.payload;
    },
    updateSectionTitle: (state, action: PayloadAction<{ title: string; id: string }>) => {
      const { title, id } = action.payload;
      const sectionIndex = state.sections.findIndex((section) => section.id === id);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].title = title;
      }
    },
    removeSection: (state, action: PayloadAction<string>) => {
      state.events.deleteEventIdentifier = IdGenerator.generateFirmedId(EnumSectionAction.DELETED);
      state.onActionWas = EnumSectionAction.DELETED;
      const id = action.payload;
      state.sections = state.sections.filter((section) => section.id !== id);
    },
    synchronizeDeleteSectionEvent: (state) => {
      state.events.previousDeleteEventIdentifier = state.events.deleteEventIdentifier;
    },
    createPageInSection: (state, action: PayloadAction<{ pageTitle: string; sectionId: string }>) => {
      const { pageTitle, sectionId } = action.payload;
      const sectionIndex = state.sections.findIndex((section) => section.id === sectionId);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].pages.unshift(PageFactory.createPage(pageTitle));
      }
    },
    removePageFromSection: (state, action: PayloadAction<{ pageId: string; sectionId: string }>) => {
      const { pageId, sectionId } = action.payload;
      const sectionIndex = state.sections.findIndex((section) => section.id === sectionId);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].pages = state.sections[sectionIndex].pages.filter((page) => page.id !== pageId);
      }
    },
  },
});

//SELECTORS

export function useGetSectionsSelector(): ISection[] {
  return useSelector((state: RootState) => state.sectionsReducer.sections);
}

export function useGetFullSectionsSelector(): SectionSlice {
  return useSelector((state: RootState) => state.sectionsReducer);
}

export function useGetShowCreateSectionButtonSwitchInputSelector(): boolean {
  return useSelector((state: RootState) => state.sectionsReducer.showCreateSectionButtonSwitchInput);
}

export function useGetSectionByIdSelector(): (id: string) => ISection | null {
  const sections = useGetSectionsSelector();

  return (id: string): ISection | null => {
    const section = sections.find((section) => section.id === id);
    return section || null;
  };
}

//DISPATCHERS

export function useUpdateSectionsReducer(): (sections: ISection[]) => void {
  const dispatch = useDispatch();

  return (sections: ISection[]): void => {
    dispatch(sectionsSlice.actions.updateSections(sections));
  };
}

export function useAddSectionReducer(): (section: ISection) => void {
  const dispatch = useDispatch();

  return (title: ISection): void => {
    dispatch(sectionsSlice.actions.addSection(title));
  };
}

export function useAddSectionsReducer(): (sections: ISection[]) => void {
  const dispatch = useDispatch();

  return (sections: ISection[]): void => {
    dispatch(sectionsSlice.actions.addSections(sections));
  };
}

export function useInitializeSectionsReducer(): (sections: ISection[]) => void {
  const dispatch = useDispatch();

  return (sections: ISection[]): void => {
    dispatch(sectionsSlice.actions.initializeSections(sections));
  };
}

export function useIncrementPageReducer(): () => void {
  const dispatch = useDispatch();

  return (): void => {
    dispatch(sectionsSlice.actions.incrementPageOfSections());
  };
}

export function useEnableIncrementalFetchingReducer(): () => void {
  const dispatch = useDispatch();

  return (): void => {
    dispatch(sectionsSlice.actions.enableIncrementalFetchingSections());
  };
}

export function useAddIncrementalSectionsReducer(): (sections: ISection[]) => void {
  const dispatch = useDispatch();

  return (sections: ISection[]): void => {
    dispatch(sectionsSlice.actions.addIncrementalSections(sections));
  };
}

export function useSetFetchingDataReducer(): (isFetchingData: boolean) => void {
  const dispatch = useDispatch();

  return (isFetchingData: boolean): void => {
    dispatch(sectionsSlice.actions.setFetchingDataSections(isFetchingData));
  };
}

export function useCreateSectionReducer(): (title: string) => void {
  const dispatch = useDispatch();

  return (title: string): void => {
    dispatch(sectionsSlice.actions.createSection(title));
  };
}

export function useSetShowCreateSectionButtonSwitchInputReducer(): (showCreateSectionButtonSwitchInput: boolean) => void {
  const dispatch = useDispatch();

  return (showCreateSectionButtonSwitchInput: boolean): void => {
    dispatch(sectionsSlice.actions.setShowCreateSectionButtonSwitchInput(showCreateSectionButtonSwitchInput));
  };
}

export function useUpdateSectionTitleReducer(): (title: string, id: string) => void {
  const dispatch = useDispatch();

  return (title: string, id: string): void => {
    dispatch(sectionsSlice.actions.updateSectionTitle({ title, id }));
  };
}

export function useRemoveSectionReducer(): (id: string) => void {
  const dispatch = useDispatch();

  return (id: string): void => {
    dispatch(sectionsSlice.actions.removeSection(id));
  };
}

export function useSynchronizeDeleteSectionEventReducer(): () => void {
  const dispatch = useDispatch();

  return (): void => {
    dispatch(sectionsSlice.actions.synchronizeDeleteSectionEvent());
  };
}

export function useAddPageToSectionReducer(): (pageTitle: string, sectionId: string) => void {
  const dispatch = useDispatch();

  return (pageTitle: string, sectionId: string): void => {
    dispatch(sectionsSlice.actions.createPageInSection({ pageTitle, sectionId }));
  };
}

export function useRemovePageFromSectionReducer(): (pageId: string, sectionId: string) => void {
  const dispatch = useDispatch();

  return (pageId: string, sectionId: string): void => {
    dispatch(sectionsSlice.actions.removePageFromSection({ pageId, sectionId }));
  };
}

export const sectionsReducer = sectionsSlice.reducer;
