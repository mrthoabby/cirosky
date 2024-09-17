"use client";

import { appGlobalStateStore } from "@/store/store";
import { Provider } from "react-redux";

export default function ClientWrapper({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return <Provider store={appGlobalStateStore}>{children}</Provider>;
}
