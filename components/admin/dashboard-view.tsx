"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { eventLabels, type AnalyticsEvent, type EventName } from "@/lib/events";

type Summary = {
  total: number;
  byName: Record<EventName, number>;
  days: { day: string; page_view: number; play: number }[];
  topVideos: { id: string; title: string; plays: number }[];
  recent: AnalyticsEvent[];
};

export function DashboardView() {
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void fetch("/api/admin/events", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("读取失败");
        setData((await response.json()) as Summary);
      })
      .catch(() => setError("埋点还没读出来。"));
  }, []);

  const max = Math.max(1, ...(data?.days.flatMap((day) => [day.page_view, day.play]) ?? [1]));

  return (
    <div>
      <h1 className="title-gradient text-[36px]">概览</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#a6a6a6]">
        数字来自这台机器上的本地记录。没有接到第三方统计账户，邮箱也不会出现在这里。
      </p>
      {error ? <p className="mt-4 text-sm text-[#ffb4b4]">{error}</p> : null}
      {!data ? <p className="mt-6 text-[#9a9a9a]">正在汇总…</p> : null}
      {data ? (
        <>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {[
              ["浏览", data.byName.page_view],
              ["播放", data.byName.play],
              ["搜索", data.byName.search],
              ["片单", data.byName.save],
            ].map(([label, value]) => (
              <article key={String(label)} className="panel p-4">
                <p className="text-sm text-[#8d8d8d]">{label}</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-4xl font-light text-[#d7f5df]">{value}</p>
              </article>
            ))}
          </div>
          <section className="panel mt-4 p-5">
            <h2 className="text-lg">近 7 天</h2>
            <p className="mt-1 text-xs text-[#8d8d8d]">按上海时区。浅色是打开页面，亮色是播放。</p>
            <div className="mt-4 grid grid-cols-7 gap-2">
              {data.days.map((day) => (
                <div key={day.day} className="flex flex-col items-center gap-2">
                  <div className="flex h-28 items-end gap-1">
                    <span className="w-2 rounded-full bg-white/25" style={{ height: `${(day.page_view / max) * 100}%`, minHeight: day.page_view ? 4 : 0 }} />
                    <span className="w-2 rounded-full bg-[#d7f5df]" style={{ height: `${(day.play / max) * 100}%`, minHeight: day.play ? 4 : 0 }} />
                  </div>
                  <span className="text-[11px] text-[#8d8d8d]">{day.day.slice(5)}</span>
                </div>
              ))}
            </div>
          </section>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <section className="panel p-5">
              <h2 className="text-lg">播放最多</h2>
              {data.topVideos.length === 0 ? <p className="mt-3 text-sm text-[#8d8d8d]">还没有播放。</p> : null}
              <ul className="mt-3 space-y-2">
                {data.topVideos.map((video) => (
                  <li key={video.id} className="flex items-center justify-between gap-3 text-sm">
                    <Link href={`/watch/${video.id}`} className="truncate hover:underline">{video.title}</Link>
                    <span className="text-[#d7f5df]">{video.plays}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="panel p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg">最近</h2>
                <Link href="/admin/events" className="text-sm text-[#a6a6a6] hover:text-white">全部</Link>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {data.recent.slice(0, 8).map((event) => (
                  <li key={event.id} className="flex justify-between gap-3">
                    <span>{eventLabels[event.name]}</span>
                    <span className="truncate text-[#8d8d8d]">{event.path}</span>
                  </li>
                ))}
              </ul>
              {data.total === 0 ? <p className="mt-3 text-sm text-[#8d8d8d]">去前台点一次播放或搜索，这里就会出现记录。</p> : null}
            </section>
          </div>
        </>
      ) : null}
    </div>
  );
}
