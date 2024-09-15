"use server";

import FakeApi from "@/config/dev-implementations/FakeApi";
import { ISection } from "@/domain/interfaces/ISection";
import IPaginated from "./shared/domain/ports/IPaginated";

export async function fetchPaginatedSections(groupBy: number, currentPage: number = 0): Promise<IPaginated<ISection>> {
  //TODO: Implement real API call for real case, now is an example with a fake API while the backend is not ready
  return (await FakeApi.GetInstance().FetchPaginatedSectionsWhenOkStatus(groupBy, currentPage)).Data!;
}
