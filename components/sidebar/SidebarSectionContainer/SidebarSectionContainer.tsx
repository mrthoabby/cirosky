import { fetchPaginatedSections } from "@/external/API";
import SidebarSectionList from "../SidebarSectionList/SidebarSectionList";

const NUMBER_OF_SECTIONS_PER_GROUP = 10;

export default async function SidebarSectionContainer(): Promise<JSX.Element> {
  const { Elements, CurrentPage, GroupBy, TotalPages } = await fetchPaginatedSections(NUMBER_OF_SECTIONS_PER_GROUP);

  return <SidebarSectionList sections={Elements} currentPage={CurrentPage} groupingSize={GroupBy} numberOfPages={TotalPages} />;
}
