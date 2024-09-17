import { IPage } from "@/domain/interfaces/IPage";

export interface ISectionProps {
  title: string;
  id: string;
  pages?: IPage[];
}
