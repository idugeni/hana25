"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";

const MetadataContext = createContext<(title: string) => void>(() => { });

export function MetadataProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.title = "HANA25 | Happy 25th Birthday, Rikhanatun Ni'mah!";
  }, []);

  const setTitle = (title: string) => {
    document.title = `${title} - HANA25`;
  };

  return (
    <MetadataContext.Provider value={setTitle}>
      {children}
    </MetadataContext.Provider>
  );
}

export function useMetadata(title: string) {
  const setTitle = useContext(MetadataContext);

  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);
}
