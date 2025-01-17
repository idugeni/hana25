"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";

interface MetadataContextProps {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
}

const MetadataContext = createContext<MetadataContextProps>({
  setTitle: () => { },
  setDescription: () => { },
});

export function MetadataProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.title = "HANA25 | Happy 25th Birthday, Rikhanatun Ni'mah!";
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", "Celebrate cherished memories with HANA25!");
    }
  }, []);

  const setTitle = (title: string) => {
    document.title = `${title} - HANA25`;
  };

  const setDescription = (description: string) => {
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      (metaDescription as HTMLMetaElement).name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);
  };

  return (
    <MetadataContext.Provider value={{ setTitle, setDescription }}>
      {children}
    </MetadataContext.Provider>
  );
}

export function useMetadata(title: string, description?: string) {
  const { setTitle, setDescription } = useContext(MetadataContext);

  useEffect(() => {
    setTitle(title);
    if (description) {
      setDescription(description);
    }
  }, [title, description, setTitle, setDescription]);
}
