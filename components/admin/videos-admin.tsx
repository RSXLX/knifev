"use client";

import { useEffect, useState } from "react";
import { categories, type Category } from "@/lib/videos";
import type { AdminVideo, VideoPatch } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCatalog } from "@/components/catalog-provider";

export function VideosAdmin() {
  const catalog = useCatalog();
  const [rows, setRows] = useState<AdminVideo[]>([]);
  const [editing, setEditing] = useState<AdminVideo | null>(null);
  const [draft, setDraft] = useState<VideoPatch>({});
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState({ id: "", title: "", src: "", category: "自然" as Category, blurb: "" });

  const load = async () => {
    const response = await fetch("/api/admin/videos", { cache: "no-store" });
    if (!response.ok) return;
    const data = (await response.json()) as { videos: AdminVideo[] };
    setRows(data.videos);
    await catalog.refresh();
  };

  useEffect(() => {
    void load();
    // 只在进入页面时拉一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = async (body: unknown) => {
    const response = await fetch("/api/admin/videos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as { error?: string };
    setMessage(data.error || "已保存，前台会读到这次修改。");
    await load();
  };

  return (
    <div>
      <h1 className="title-gradient text-[36px]">片子</h1>
      <p className="mt-2 text-sm leading-6 text-[#a6a6a6]">内置片子可以改文案或先从前台藏起来。后台添加的片子可以删。改完前台片库会跟着变。</p>
      {message ? <p className="mt-3 text-sm text-[#d7f5df]">{message}</p> : null}

      <form
        className="panel mt-5 grid gap-3 p-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          void send({ action: "create", video: creating });
        }}
      >
        <p className="md:col-span-2 text-sm text-[#cfcfcf]">添加一条</p>
        <Input value={creating.id} onChange={(event) => setCreating({ ...creating, id: event.target.value })} placeholder="编号，如 night-ferry" className="h-10 rounded-full border-white/10 bg-white/4 px-4" />
        <Input value={creating.title} onChange={(event) => setCreating({ ...creating, title: event.target.value })} placeholder="标题" className="h-10 rounded-full border-white/10 bg-white/4 px-4" />
        <Input value={creating.src} onChange={(event) => setCreating({ ...creating, src: event.target.value })} placeholder="https:// 视频地址" className="h-10 rounded-full border-white/10 bg-white/4 px-4 md:col-span-2" />
        <select value={creating.category} onChange={(event) => setCreating({ ...creating, category: event.target.value as Category })} className="h-10 rounded-full border border-white/10 bg-[#101010] px-4 text-sm">
          {categories.map((category) => <option key={category}>{category}</option>)}
        </select>
        <Input value={creating.blurb} onChange={(event) => setCreating({ ...creating, blurb: event.target.value })} placeholder="一句介绍" className="h-10 rounded-full border-white/10 bg-white/4 px-4" />
        <Button type="submit" className="h-10 w-fit rounded-full bg-[#f2f2f2] px-4 text-black hover:bg-white">添加</Button>
      </form>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-[#8d8d8d]">
            <tr>
              <th className="py-2 font-normal">标题</th>
              <th className="font-normal">分类</th>
              <th className="font-normal">来源</th>
              <th className="font-normal">状态</th>
              <th className="font-normal">操作</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((video) => (
              <tr key={video.id} className="border-t border-white/8">
                <td className="py-3">
                  <span className="block">{video.title}</span>
                  <span className="text-xs text-[#8d8d8d]">{video.id}</span>
                </td>
                <td>{video.category}</td>
                <td>{video.builtin ? "内置" : "后台添加"}</td>
                <td>{video.hidden ? "已隐藏" : "前台可见"}</td>
                <td className="space-x-2">
                  <button type="button" className="text-[#d7f5df]" onClick={() => { setEditing(video); setDraft({ title: video.title, blurb: video.blurb, category: video.category, mood: video.mood, fresh: Boolean(video.fresh), src: video.src }); }}>编辑</button>
                  <button type="button" className="text-[#d0d0d0]" onClick={() => void send({ action: "hide", id: video.id, hidden: !video.hidden })}>{video.hidden ? "显示" : "隐藏"}</button>
                  {!video.builtin ? <button type="button" className="text-[#ffb4b4]" onClick={() => void send({ action: "remove", id: video.id })}>删除</button> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing ? (
        <form
          className="panel mt-4 grid gap-3 p-4"
          onSubmit={(event) => {
            event.preventDefault();
            void send({ action: "patch", id: editing.id, patch: draft });
            setEditing(null);
          }}
        >
          <p className="text-sm">编辑 {editing.id}</p>
          <Input value={draft.title || ""} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="h-10 rounded-full border-white/10 bg-white/4 px-4" />
          <Input value={draft.blurb || ""} onChange={(event) => setDraft({ ...draft, blurb: event.target.value })} className="h-10 rounded-full border-white/10 bg-white/4 px-4" />
          <div className="flex flex-wrap gap-3">
            <select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as Category })} className="h-10 rounded-full border border-white/10 bg-[#101010] px-4 text-sm">
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            <Input value={draft.mood || ""} onChange={(event) => setDraft({ ...draft, mood: event.target.value })} placeholder="感觉词" className="h-10 w-40 rounded-full border-white/10 bg-white/4 px-4" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={Boolean(draft.fresh)} onChange={(event) => setDraft({ ...draft, fresh: event.target.checked })} />
              显示 New
            </label>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="h-10 rounded-full bg-[#f2f2f2] px-4 text-black">保存</Button>
            <Button type="button" variant="outline" className="h-10 rounded-full border-white/12 bg-transparent" onClick={() => setEditing(null)}>取消</Button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
