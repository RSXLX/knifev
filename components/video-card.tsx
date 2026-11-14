"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { Poster } from "@/components/poster";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/lib/library";
import type { VideoItem } from "@/lib/videos";

export function VideoCard({ video }: { video: VideoItem }) {
  const { isSaved, toggleSave, toast } = useLibrary();
  const [hot, setHot] = useState(false);
  const saved = isSaved(video.id);

  return (
    <article
      className="group min-w-0"
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      onFocus={() => setHot(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHot(false);
      }}
    >
      <div className="thumb">
        <Link href={`/watch/${video.id}`} className="absolute inset-0 z-10" aria-label={`播放 ${video.title}`}>
          <Poster video={video} active={hot} />
        </Link>
        <div className="pointer-events-none absolute inset-0 z-20">
          {video.fresh ? <span className="new-badge absolute top-2.5 left-2.5">New</span> : null}
          <span
            className={`absolute inset-0 grid place-items-center transition-opacity duration-300 ${hot ? "opacity-100" : "opacity-0"}`}
          >
            <span className="grid size-11 place-items-center rounded-full bg-white text-black shadow-lg">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5 3.2v9.6L13 8 5 3.2Z" fill="currentColor" />
              </svg>
            </span>
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-pressed={saved}
          aria-label={saved ? `从片单移除 ${video.title}` : `把 ${video.title} 收入片单`}
          className="save-fab absolute right-2.5 bottom-2.5 z-30 size-8 rounded-full bg-black/55 text-white backdrop-blur-md hover:bg-black/75"
          onClick={() => {
            toggleSave(video.id);
            toast(saved ? `已从片单拿下「${video.title}」` : `「${video.title}」已收进这台浏览器的片单`);
          }}
        >
          {saved ? <Check /> : <Plus />}
        </Button>
      </div>
      <div className="mt-2.5 flex items-baseline justify-between gap-3">
        <Link
          href={`/watch/${video.id}`}
          className="truncate font-[family-name:var(--font-display)] text-[14.5px] font-medium tracking-[-0.01em] text-[#f5f5f5]"
        >
          {video.title}
        </Link>
        <span className="shrink-0 text-[13px] text-[#8d8d8d]">{video.mood}</span>
      </div>
    </article>
  );
}
