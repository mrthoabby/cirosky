import { IdGenerator } from "@/helpers/IdGenerator";
import { IPage } from "../interfaces/IPage";
import { IPageContent } from "./IPageContent";

export class PageFactory {
  static createPage(title: string): IPage {
    return {
      id: IdGenerator.generateFirmedId("page"),
      title,
    };
  }
  static createContentPage(id: string, content: string): IPageContent {
    return {
      id,
      content,
    };
  }
}
