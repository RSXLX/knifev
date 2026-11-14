"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { videos, type VideoItem } from "@/lib/videos";

type CatalogValue = {
  videos: VideoItem[];
  ready: boolean;
  refresh: () => Promise<void>;
};

const CatalogContext = createContext<CatalogValue | null>(null);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<VideoItem[]>(videos);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/catalog", { cache: "no-store" });
      if (response.ok) {
        const data = (await response.json()) as { videos?: VideoItem[] };
        if (Array.isArray(data.videos)) setList(data.videos);
      }
    } catch {
      /* 接口暂时不可用时继续用内置片单 */
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(() => ({ videos: list, ready, refresh }), [list, ready, refresh]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const value = useContext(CatalogContext);
  if (!value) throw new Error("useCatalog 必须放在 CatalogProvider 里");
  return value;
}
