"use client";

import Link from "next/link";
import { VideoCard } from "@/components/video-card";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/lib/library";
import { getVideo } from "@/lib/videos";

export function PlaylistView() {
  const { saved, ready, clearSaved, toast } = useLibrary();
  const items = saved.map((id) => getVideo(id)).filter((video) => Boolean(video));

  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-28 pb-10">
      <span className="eyebrow">只存在这台浏览器</span>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="title-gradient text-[36px] sm:text-[52px]">片单</h1>
        {items.length > 0 ? (
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-full border-white/12 bg-transparent"
            onClick={() => {
              clearSaved();
              toast("片单已清空");
            }}
          >
            清空片单
          </Button>
        ) : null}
      </div>
      {!ready ? <p className="mt-8 text-[#9a9a9a]">正在读取本地片单…</p> : null}
      {ready && items.length === 0 ? (
        <div className="panel mt-8 px-6 py-16 text-center">
          <p className="text-xl">片单还是空的</p>
          <p className="mt-2 text-[#a0a0a0]">在卡片上点加号，片子会留在这里。</p>
          <Button render={<Link href="/library" />} className="cta-pill mt-5">
            去片库
          </Button>
        </div>
      ) : null}
      {items.length > 0 ? (
        <div className="card-grid mt-8">
          {items.map((video) => (video ? <VideoCard key={video.id} video={video} /> : null))}
        </div>
      ) : null}
    </div>
  );
}
