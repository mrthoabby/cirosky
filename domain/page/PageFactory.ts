import { IdGenerator } from "@/helpers/IdGenerator";
import { IPage } from "../interfaces/IPage";

export class PageFactory {
  static createPage(title: string): IPage {
    return {
      id: IdGenerator.generateFirmedId("page"),
      title,
    };
  }
}
