import ClientWrapper from "@/components/shared/ClientWrapper/ClientWrapper";
import { fetchPaginatedSections } from "@/external/API";
import SidebarSectionList from "../SidebarSectionList/SidebarSectionList";

const NUMBER_OF_SECTIONS_PER_GROUP = 2;

export default async function SidebarSectionContainer(): Promise<JSX.Element> {
  const { Elements, GroupBy, TotalPages } = await fetchPaginatedSections(NUMBER_OF_SECTIONS_PER_GROUP);

  return (
    <ClientWrapper>
      <SidebarSectionList firstSections={Elements} groupBy={GroupBy} totalPages={TotalPages} />
    </ClientWrapper>
  );
}
