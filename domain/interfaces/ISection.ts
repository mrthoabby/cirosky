import { IPage } from "./IPage";

export interface ISection {
  id: string;
  title: string;
  description: string;
  pages: IPage[];
}
