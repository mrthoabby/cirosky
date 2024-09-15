import { ISection } from "@/domain/interfaces/ISection";

export interface ISidebarSectionListProps {
  sections: ISection[];
  groupingSize: number;
  currentPage: number;
  numberOfPages: number;
}

export interface ISidebarSectionListState {
  pageToLoad: number;
  sections: ISection[];
  showLoader: boolean;
}
