"use server";

import FakeApi from "@/config/dev-implementations/FakeApi";
import { ISection } from "@/domain/interfaces/ISection";
import IPaginated from "./domain/ports/IPaginated";

export async function fetchPaginatedSections(groupBy: number, currentPage: number = 1): Promise<IPaginated<ISection>> {
  //TODO: Implement real API call for real case, now is an example with a fake API while the backend is not ready
  return (await FakeApi.GetInstance().FetchPaginatedSectionsWhenOkStatus(groupBy, currentPage)).Data!;
}
export async function createSection(section: ISection): Promise<ISection> {
  //TODO: Implement real API call for real case, now is an example with a fake API while the backend is not ready
  console.info("Creating section:", section);

  return section;
}
