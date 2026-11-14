"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { useLibrary } from "@/lib/library";
import { track } from "@/lib/track";
import { categories } from "@/lib/videos";

export function SiteFooter() {
  const { subscribe, digest, toast } = useLibrary();
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  return (
    <footer className="mt-20 border-t border-white/6 px-4 pt-14 pb-8">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#c8c8c8]">
            在浏览器里看公开短片。几分钟就能从片库开播，片单留在本地。
          </p>
          <p className="mt-6 text-sm text-[#8d8d8d]">每周五，演示站不会真的发信。</p>
          <form
            className="mt-3 flex max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              const error = subscribe(email);
              if (error) {
                setNote(error);
                return;
              }
              setNote("邮箱只留在这台浏览器。后台只记一条「有人点了订阅」，不保存地址。");
              toast("订阅只保存在本地");
              track("subscribe_local");
              setEmail("");
            }}
          >
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={digest ? `已记下 ${digest}` : "邮箱，仅保存在本地"}
              aria-label="本地订阅邮箱"
              className="h-11 rounded-full border-white/10 bg-white/4 px-4 text-[#f5f5f5] placeholder:text-[#8a8a8a]"
            />
            <Button type="submit" className="h-11 rounded-full bg-[#f2f2f2] px-5 text-black hover:bg-white">
              记下
            </Button>
          </form>
          <p className="mt-2 text-xs leading-5 text-[#7d7d7d]">{note || "点下去只是写入 localStorage。"}</p>
        </div>
        <div>
          <p className="text-sm text-[#8d8d8d]">片库</p>
          <ul className="mt-3 space-y-2 text-[15px]">
            <li><Link className="text-[#d5d5d5] hover:text-white" href="/library">全部短片</Link></li>
            {categories.map((category) => (
              <li key={category}>
                <Link className="text-[#d5d5d5] hover:text-white" href={`/library?cat=${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-[#8d8d8d]">站点</p>
          <ul className="mt-3 space-y-2 text-[15px]">
            <li><Link className="text-[#d5d5d5] hover:text-white" href="/about">关于这个演示</Link></li>
            <li><Link className="text-[#d5d5d5] hover:text-white" href="/playlists">片单</Link></li>
            <li><Link className="text-[#d5d5d5] hover:text-white" href="/watch/sintel">从序幕开始看</Link></li>
            <li><Link className="text-[#d5d5d5] hover:text-white" href="/about#sources">片源说明</Link></li>
            <li><Link className="text-[#d5d5d5] hover:text-white" href="/admin">后台</Link></li>
          </ul>
        </div>
        <div id="contact">
          <p className="text-sm text-[#8d8d8d]">说明</p>
          <p className="mt-3 text-[15px] leading-7 text-[#c8c8c8]">
            这是独立的前端演示，不是任何模板商店或素材站的官方产品。影像来自 Blender Foundation、MDN 与维基共享资源。
          </p>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1440px] flex-col gap-2 border-t border-white/6 pt-5 text-sm text-[#7a7a7a] sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Lumora 演示</p>
        <p>公开示例片 · 本地片单 · 无账户</p>
      </div>
    </footer>
  );
}
