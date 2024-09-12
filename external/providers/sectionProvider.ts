import jsonData from "@/config/dev-data/sections.json";
import { ISection } from "@/domain/interfaces/ISection";
import { createServerError } from "@/error_handler/errorHandler";

export async function GetSections(): Promise<ISection[]> {
  try {
    const sections: ISection[] = jsonData;

    return sections;
  } catch (error: unknown) {
    createServerError(error as Error);

    return [];
  }
}
