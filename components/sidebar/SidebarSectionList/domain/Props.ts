import { ISection } from "@/domain/interfaces/ISection";

export interface ISidebarSectionListProps {
  firstSections: ISection[];
  groupBy: number;
  totalPages: number;
}
