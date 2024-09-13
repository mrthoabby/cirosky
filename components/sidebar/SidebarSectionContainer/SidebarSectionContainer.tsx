import { GetSections } from "@/external/providers/sectionProvider";
import SidebarSectionList from "../SidebarSectionList/SidebarSectionList";

export default async function SidebarSectionContainer(): Promise<JSX.Element> {
  const sections = await GetSections();

  return <SidebarSectionList sections={sections} />;
}
