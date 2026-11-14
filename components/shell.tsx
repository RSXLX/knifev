"use client";

import { usePathname } from "next/navigation";
import { GuestDialog } from "@/components/guest-dialog";
import { SearchDialog } from "@/components/search-dialog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrackPage } from "@/components/track-page";
import { useLibrary } from "@/lib/library";

export function Shell({ children }: { children: React.ReactNode }) {
  const { message } = useLibrary();
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <SearchDialog />
      <GuestDialog />
      <TrackPage />
      {message ? (
        <div className="glass fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full px-4 py-2 text-sm text-[#f5f5f5]" role="status">
          {message}
        </div>
      ) : null}
    </>
  );
}
