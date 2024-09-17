"use client";
import { appGlobalStateStore } from "@/store/store";
import { Provider } from "react-redux";
import SidebarAddSection from "../SidebarAddSection/SidebarAddSection";

export default function SidebarSectionActions(): JSX.Element {
  return (
    <Provider store={appGlobalStateStore}>
      <section style={{ marginBottom: 30, paddingLeft: 30 }}>[DELVELOPING... AQUÍ SEARCHER]</section>
      <SidebarAddSection />
    </Provider>
  );
}
