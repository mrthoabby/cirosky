import { IdGenerator } from "@/helpers/IdGenerator";
import { ISection } from "../interfaces/ISection";

export class SectionFactory {
  static createSection(title: string): ISection {
    return {
      id: IdGenerator.generateId(),
      title,
    };
  }
}
