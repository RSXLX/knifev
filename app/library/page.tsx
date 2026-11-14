import { Suspense } from "react";
import { LibraryView } from "@/components/library-view";

export const metadata = {
  title: "片库 — knifeV",
  description: "按分类和关键词筛选可播放的公开短片。",
};

export default function LibraryPage() {
  return (
    <Suspense fallback={<p className="px-4 pt-28 text-[#9a9a9a]">正在整理片库…</p>}>
      <LibraryView />
    </Suspense>
  );
}
