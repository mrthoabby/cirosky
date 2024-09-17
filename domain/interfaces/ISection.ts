import { IPage } from "./IPage";

export interface ISection {
  id: string;
  title: string;
  pages?: IPage[];
}
