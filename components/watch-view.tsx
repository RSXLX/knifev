"use client";

import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { Player } from "@/components/player";
import { VideoCard } from "@/components/video-card";
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/components/catalog-provider";
import { useLibrary } from "@/lib/library";
import { getVideo, relatedVideos } from "@/lib/videos";

export function WatchView({ id }: { id: string }) {
  const catalog = useCatalog();
  const video = getVideo(id, catalog.videos);
  const { isSaved, toggleSave, toast } = useLibrary();
  if (!video) return catalog.ready ? null : <p className="px-4 pt-28 text-[#9a9a9a]">正在读取片库…</p>;
  const saved = isSaved(video.id);
  const related = relatedVideos(video.id, 4, catalog.videos);

  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-28 pb-8">
      <Link href="/library" className="arrow-link">← 返回片库</Link>
      <div className="mt-4">
        <Player video={video} />
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-[#8d8d8d]">{video.category} · {video.mood}</p>
          <h1 className="title-gradient mt-2 text-[32px] sm:text-[44px]">{video.title}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            className="h-11 rounded-full bg-[#f2f2f2] px-4 text-black hover:bg-white"
            onClick={() => {
              toggleSave(video.id);
              toast(saved ? "已从片单移除" : "已收入片单");
            }}
          >
            {saved ? <Check /> : <Plus />}
            {saved ? "已在片单" : "收入片单"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-full border-white/12 bg-transparent text-[#f5f5f5]"
            onClick={async () => {
              const url = window.location.href;
              try {
                await navigator.clipboard.writeText(url);
                toast("链接已复制");
              } catch {
                toast(url);
              }
            }}
          >
            复制链接
          </Button>
        </div>
      </div>
      <p className="mt-4 max-w-3xl text-[16px] leading-8 text-[#d0d0d0]">{video.blurb}</p>
      <p className="mt-3 text-sm leading-6 text-[#9a9a9a]">
        {video.credit} · {video.license} ·{" "}
        <a className="underline underline-offset-4 hover:text-white" href={video.source} target="_blank" rel="noreferrer">
          查看来源
        </a>
      </p>
      <h2 className="title-gradient mt-12 text-[30px]">接着看</h2>
      <div className="card-grid mt-5">
        {related.map((item) => (
          <VideoCard key={item.id} video={item} />
        ))}
      </div>
    </div>
  );
}
