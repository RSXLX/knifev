"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { VideoCard } from "@/components/video-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCatalog } from "@/components/catalog-provider";
import { track } from "@/lib/track";
import { categories, filterVideos } from "@/lib/videos";

export function LibraryView({ initialQuery = "", initialCat = "全部", initialSort = "new" }: { initialQuery?: string; initialCat?: string; initialSort?: string }) {
  const router = useRouter();
  const catalog = useCatalog();
  const [query, setQuery] = useState(initialQuery);
  const [cat, setCat] = useState(initialCat || "全部");
  const [sort, setSort] = useState(initialSort === "title" ? "title" : "new");

  useEffect(() => {
    setQuery(initialQuery);
    setCat(initialCat || "全部");
    setSort(initialSort === "title" ? "title" : "new");
  }, [initialQuery, initialCat, initialSort]);

  const results = useMemo(() => filterVideos({ q: query, cat, sort }, catalog.videos), [query, cat, sort, catalog.videos]);

  const apply = (next: { q?: string; cat?: string; sort?: string }) => {
    const q = next.q ?? query;
    const category = next.cat ?? cat;
    const sorting = next.sort ?? sort;
    const matched = filterVideos({ q, cat: category, sort: sorting }, catalog.videos);
    track("filter", { q, cat: category, sort: sorting, results: matched.length });
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (category && category !== "全部") params.set("cat", category);
    if (sorting === "title") params.set("sort", "title");
    const search = params.toString();
    router.replace(search ? `/library?${search}` : "/library", { scroll: false });
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-28 pb-10">
      <span className="eyebrow">片库</span>
      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <h1 className="title-gradient text-[36px] sm:text-[52px]">全部公开短片</h1>
        <p className="max-w-md text-[15px] leading-7 text-[#b5b5b5]">按分类或几个字筛选。结果会留在地址栏里，刷新也不会丢。</p>
      </div>

      <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
        <form
          className="flex flex-1 gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            apply({});
          }}
        >
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索片名、瀑布、公路…"
            aria-label="筛选片库"
            className="h-11 rounded-full border-white/10 bg-white/4 px-4 text-[#f5f5f5]"
          />
          <Button type="submit" className="h-11 rounded-full bg-[#f2f2f2] px-5 text-black hover:bg-white">
            筛选
          </Button>
        </form>
        <div className="flex rounded-full border border-white/10 p-1">
          <button type="button" className={`h-9 rounded-full px-4 text-sm ${sort === "new" ? "bg-white text-black" : "text-[#cfcfcf]"}`} onClick={() => { setSort("new"); apply({ sort: "new" }); }}>
            新上的在前
          </button>
          <button type="button" className={`h-9 rounded-full px-4 text-sm ${sort === "title" ? "bg-white text-black" : "text-[#cfcfcf]"}`} onClick={() => { setSort("title"); apply({ sort: "title" }); }}>
            按标题
          </button>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {["全部", ...categories].map((item) => (
          <button
            key={item}
            type="button"
            className={`h-9 shrink-0 rounded-full px-4 text-sm ${cat === item ? "bg-white text-black" : "border border-white/10 text-[#d0d0d0]"}`}
            onClick={() => {
              setCat(item);
              apply({ cat: item });
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-[#8d8d8d]">{results.length} 条</p>

      {results.length === 0 ? (
        <div className="panel mt-4 px-6 py-16 text-center">
          <p className="text-xl">没有符合的片子</p>
          <p className="mt-2 text-[#a0a0a0]">换一个词，或者清掉筛选。</p>
          <Button
            type="button"
            className="cta-pill mt-5"
            onClick={() => {
              setQuery("");
              setCat("全部");
              setSort("new");
              router.replace("/library");
            }}
          >
            看全部
          </Button>
        </div>
      ) : (
        <div className="card-grid mt-4">
          {results.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
