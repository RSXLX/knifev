"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLibrary } from "@/lib/library";
import { filterVideos, moods } from "@/lib/videos";

export function SearchDialog() {
  const router = useRouter();
  const { searchOpen, setSearchOpen } = useLibrary();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => filterVideos({ q: query }).slice(0, 8), [query]);

  useEffect(() => {
    setActive(0);
  }, [query, searchOpen]);

  const openResult = (id: string) => {
    setSearchOpen(false);
    setQuery("");
    router.push(`/watch/${id}`);
  };

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent
        showCloseButton={false}
        className="top-[18vh] max-w-[680px] translate-y-0 gap-0 overflow-hidden rounded-[22px] border border-white/10 bg-[#141414] p-0 text-[#f5f5f5] ring-0 sm:max-w-[680px]"
      >
        <DialogTitle className="sr-only">搜索片库</DialogTitle>
        <DialogDescription className="sr-only">按片名、分类或感觉搜索公开演示片。</DialogDescription>
        <form
          className="flex items-center gap-3 border-b border-white/8 px-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (results[active]) openResult(results[active].id);
            else {
              setSearchOpen(false);
              router.push(query.trim() ? `/library?q=${encodeURIComponent(query.trim())}` : "/library");
            }
          }}
        >
          <Search className="size-4 text-[#a6a6a6]" />
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActive((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActive((index) => Math.max(index - 1, 0));
              }
            }}
            placeholder="按感觉找片，而不是按栏目…"
            className="h-14 border-0 bg-transparent px-0 text-base text-[#f5f5f5] shadow-none ring-0 placeholder:text-[#8a8a8a] focus-visible:border-0 focus-visible:ring-0 md:text-base"
            aria-label="搜索片库"
          />
          <button type="button" className="kbd" onClick={() => setSearchOpen(false)}>
            Esc
          </button>
        </form>

        {query.trim() && results.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-[15px] text-[#f5f5f5]">没有叫「{query.trim()}」的片子</p>
            <p className="mt-2 text-sm text-[#8d8d8d]">试试夜色、航拍、动画，或者直接去片库看全部。</p>
            <button
              type="button"
              className="explore-btn mt-5"
              onClick={() => {
                setSearchOpen(false);
                router.push("/library");
              }}
            >
              打开片库
            </button>
          </div>
        ) : null}

        {results.length > 0 && query.trim() ? (
          <ul className="max-h-[360px] overflow-auto p-2">
            {results.map((video, index) => (
              <li key={video.id}>
                <button
                  type="button"
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left ${index === active ? "bg-white/8" : "hover:bg-white/5"}`}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => openResult(video.id)}
                >
                  <Image src={`/posters/${video.id}.jpg`} alt="" width={48} height={48} className="size-12 shrink-0 rounded-lg object-cover" />
                  <span className="min-w-0">
                    <span className="block truncate text-[15px]">{video.title}</span>
                    <span className="block text-[13px] text-[#8d8d8d]">
                      {video.category} · {video.mood}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {!query.trim() ? (
          <div className="px-6 py-10 text-center">
            <span className="mx-auto grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-[#d0d0d0]">
              <Search className="size-4" />
            </span>
            <p className="mt-4 text-[15px] font-medium">按感觉找，而不是按栏目。</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {moods.map((mood) => (
                <button
                  key={mood.note}
                  type="button"
                  className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-sm text-[#d5d5d5] hover:bg-white/8"
                  onClick={() => setQuery(mood.note)}
                >
                  {mood.note}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3 border-t border-white/8 px-4 py-3 text-[12px] text-[#8d8d8d]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1"><span className="kbd">↑</span><span className="kbd">↓</span> 移动</span>
            <span className="inline-flex items-center gap-1"><span className="kbd">↵</span> 打开</span>
            <span className="inline-flex items-center gap-1"><span className="kbd">esc</span> 关闭</span>
          </div>
          <span className="inline-flex items-center gap-1"><span className="kbd">/</span> 任意处</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
