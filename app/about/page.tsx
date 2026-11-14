import Link from "next/link";
import { videos } from "@/lib/videos";

export const metadata = {
  title: "关于 — knifeV",
  description: "这个演示站是什么，片子从哪来。",
};

export default function AboutPage() {
  const sources = Array.from(new Map(videos.map((video) => [video.source, video])).values());
  return (
    <div className="mx-auto max-w-[860px] px-4 pt-28 pb-16">
      <span className="eyebrow">独立演示</span>
      <h1 className="title-gradient mt-4 text-[36px] sm:text-[52px]">关于 knifeV</h1>
      <div className="mt-6 space-y-4 text-[16px] leading-8 text-[#d0d0d0]">
        <p>
          knifeV 是一个可以实际播放的视频浏览页。布局、深色底、玻璃导航和渐变标题参考了电影感模板库的视觉节奏，内容全部换成短片。
        </p>
        <p>它不是那个站点的官方产品，也没有接入它的账户、定价或素材接口。这里的按钮会搜索、筛选、播放、把片子记在本地，不会假装已经登录。</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/library" className="explore-btn">打开片库</Link>
        <Link href="/watch/sintel" className="explore-btn">播放序幕</Link>
      </div>
      <h2 id="sources" className="title-gradient mt-14 text-[32px]">片源</h2>
      <ul className="mt-5 divide-y divide-white/8 border-y border-white/8">
        {sources.map((video) => (
          <li key={video.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
            <span>
              {video.title}
              <span className="ml-2 text-sm text-[#8d8d8d]">{video.credit} · {video.license}</span>
            </span>
            <a className="text-sm text-[#d0d0d0] underline underline-offset-4" href={video.source} target="_blank" rel="noreferrer">
              来源
            </a>
          </li>
        ))}
      </ul>
      <h2 id="contact" className="title-gradient mt-14 text-[32px]">联络</h2>
      <p className="mt-4 text-[16px] leading-8 text-[#d0d0d0]">
        这个演示没有收件邮箱。页脚里的地址只会写进浏览器本地存储，用来表明「订阅」这个动作是真的发生了，但信不会发出去。
      </p>
    </div>
  );
}
