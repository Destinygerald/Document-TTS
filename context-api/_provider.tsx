"use client";

import { MessageContextProvider } from "./message-queue";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <MessageContextProvider>{children}</MessageContextProvider>;
}
