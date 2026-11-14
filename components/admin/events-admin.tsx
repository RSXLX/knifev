"use client";

import { useEffect, useState } from "react";
import { eventLabels, eventNames, type AnalyticsEvent, type EventName } from "@/lib/events";
import { Button } from "@/components/ui/button";

type Summary = {
  total: number;
  byName: Record<EventName, number>;
  recent: AnalyticsEvent[];
};

export function EventsAdmin() {
  const [data, setData] = useState<Summary | null>(null);
  const [name, setName] = useState<EventName | "全部">("全部");

  const load = async () => {
    const response = await fetch("/api/admin/events", { cache: "no-store" });
    if (response.ok) setData((await response.json()) as Summary);
  };

  useEffect(() => {
    void load();
  }, []);

  const rows = (data?.recent ?? []).filter((event) => name === "全部" || event.name === name);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="title-gradient text-[36px]">埋点</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#a6a6a6]">
            记录打开页面、搜索词、筛选、播放、暂停、拖动、片单和探索片架。订阅只记「有人点过」，不记邮箱。
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-full border-white/12 bg-transparent"
          onClick={async () => {
            await fetch("/api/admin/events", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ action: "clear" }),
            });
            await load();
          }}
        >
          清空记录
        </Button>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto">
        <button type="button" className={`h-9 shrink-0 rounded-full px-3 text-sm ${name === "全部" ? "bg-white text-black" : "border border-white/10"}`} onClick={() => setName("全部")}>
          全部 {data?.total ?? 0}
        </button>
        {eventNames.map((item) => (
          <button key={item} type="button" className={`h-9 shrink-0 rounded-full px-3 text-sm ${name === item ? "bg-white text-black" : "border border-white/10"}`} onClick={() => setName(item)}>
            {eventLabels[item]} {data?.byName[item] ?? 0}
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="text-[#8d8d8d]">
            <tr>
              <th className="py-2 font-normal">时间</th>
              <th className="font-normal">事件</th>
              <th className="font-normal">页面</th>
              <th className="font-normal">内容</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((event) => (
              <tr key={event.id} className="border-t border-white/8">
                <td className="py-3 whitespace-nowrap text-[#cfcfcf]">
                  {new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(event.at)}
                </td>
                <td>{eventLabels[event.name]}</td>
                <td className="text-[#a6a6a6]">{event.path}</td>
                <td className="text-[#d0d0d0]">{Object.entries(event.props).map(([key, value]) => `${key}=${String(value)}`).join(" · ") || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? <p className="py-8 text-sm text-[#8d8d8d]">这个筛选下还没有记录。</p> : null}
      </div>
    </div>
  );
}
