import { Suspense } from "react";
import { LibraryView } from "@/components/library-view";

export const metadata = {
  title: "片库 — Lumora",
  description: "按分类和关键词筛选可播放的公开短片。",
};

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string; sort?: string }>;
}) {
  const params = await searchParams;
  return (
    <Suspense fallback={<p className="px-4 pt-28 text-[#9a9a9a]">正在整理片库…</p>}>
      <LibraryView initialQuery={params.q ?? ""} initialCat={params.cat ?? "全部"} initialSort={params.sort ?? "new"} />
    </Suspense>
  );
}
