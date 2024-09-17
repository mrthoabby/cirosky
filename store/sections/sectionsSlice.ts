"use client";
import { ISection } from "@/domain/interfaces/ISection";
import { SectionFactory } from "@/domain/section/SectionFactory";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

interface SectionSlice {
  sections: ISection[];
  pageToLoad: number;
  isFetchingData: boolean;
  showCreateSectionButtonSwitchInput: boolean;
}

const initialState: SectionSlice = {
  sections: [],
  pageToLoad: 1,
  isFetchingData: false,
  showCreateSectionButtonSwitchInput: true,
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
    incrementPage: (state) => {
      state.pageToLoad = state.pageToLoad + 1;
    },
    enableIncrementalFetching: (state) => {
      state.isFetchingData = true;
      state.pageToLoad = state.pageToLoad + 1;
    },
    addIncrementalSections: (state, action: PayloadAction<ISection[]>) => {
      state.sections.push(...action.payload);
      state.isFetchingData = false;
    },
    setFetchingData: (state, action: PayloadAction<boolean>) => {
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
    dispatch(sectionsSlice.actions.incrementPage());
  };
}

export function useEnableIncrementalFetchingReducer(): () => void {
  const dispatch = useDispatch();

  return (): void => {
    dispatch(sectionsSlice.actions.enableIncrementalFetching());
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
    dispatch(sectionsSlice.actions.setFetchingData(isFetchingData));
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
export const sectionsReducer = sectionsSlice.reducer;
