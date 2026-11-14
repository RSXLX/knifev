"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clapperboard, ListVideo, Search, Sparkles } from "lucide-react";
import { VideoCard } from "@/components/video-card";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/lib/library";
import { useCatalog } from "@/components/catalog-provider";
import { track } from "@/lib/track";
import { featuredId, getVideo, moods, rails, videosByIds } from "@/lib/videos";

const steps = [
  {
    title: "找片",
    body: "一次搜索覆盖动画、自然、夜色、城市、驾驶和实验。也可以按「航拍」「烛火」这种感觉找。",
  },
  {
    title: "收入片单",
    body: "卡片右下角的加号会把片子记在这台浏览器里。换一台设备就没有了，因为没有账户。",
  },
  {
    title: "开播",
    body: "播放器可以暂停、拖动进度、调音量和全屏。片子来自公开地址，加载失败时可以重试。",
  },
  {
    title: "接着看",
    body: "播完或看腻了，页面下方按同一类再给四条。不必回到首页重新找。",
  },
];

const faqs = [
  {
    q: "这些片子需要登录吗？",
    a: "不需要。点「登录」只会说明这里没有账户，你可以选择以访客继续。访客标记也只写在本地。",
  },
  {
    q: "片源从哪来？",
    a: "动画预告来自 Blender Foundation 的公开示例，花朵来自 MDN 的 CC0 样片，其余来自维基共享资源。每条播放页都有来源链接。",
  },
  {
    q: "片单存在哪里？",
    a: "存在这台浏览器的 localStorage。清除站点数据就会消失。这个演示没有后端。",
  },
  {
    q: "搜索能找到什么？",
    a: "片名、分类、感觉词和简介。比如「瀑布」「公路」「辛特尔」。没有结果时会直接告诉你，并让你回到片库。",
  },
  {
    q: "这是参考站的官方产品吗？",
    a: "不是。knifeV 只借用了相近的深色排版和玻璃控件，内容换成了视频浏览。它和任何模板商业站点没有从属关系。",
  },
  {
    q: "手机上能看吗？",
    a: "能。导航会收成搜索条和菜单，片子排成两列。播放器的进度、音量和全屏在窄屏上仍然可用。",
  },
];

export function HomeView() {
  const { setSearchOpen } = useLibrary();
  const catalog = useCatalog();
  const list = catalog.videos;
  const [step, setStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const moodRef = useRef<HTMLDivElement>(null);
  const preview = getVideo(step === 2 ? "flower" : featuredId, list);

  return (
    <div>
      <section className="px-4 pt-[84px] pb-4 lg:pt-3.5">
        <div className="hero-stage rise mx-auto flex min-h-[460px] max-w-[1440px] flex-col items-center justify-center px-6 pt-10 pb-10 text-center lg:min-h-[430px] lg:pt-[92px]">
          <span className="eyebrow">公开演示片 · 浏览器里就能看</span>
          <h1 className="title-gradient mt-5 max-w-[16ch] text-[30px] sm:text-[48px] lg:whitespace-nowrap lg:max-w-none">
            电影感影像，随手开播
          </h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-7 text-[#c8c8c8] sm:text-base">
            从公开短片里挑一条，立刻播放。搜索、分类和片单都留在这台浏览器，不需要账户。
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
            <Button render={<Link href={`/watch/${featuredId}`} onClick={() => track("cta_watch", { videoId: featuredId })} />} className="cta-pill">
              开始观看
              <span className="spark"><Sparkles className="size-3.5" /></span>
            </Button>
            <Button type="button" variant="ghost" className="h-11 rounded-full px-4 text-[#cfcfcf] hover:bg-white/6 hover:text-white" onClick={() => setSearchOpen(true)}>
              <Search />
              先搜一下
            </Button>
          </div>
        </div>
      </section>

      {rails.map((rail) => {
        const items = videosByIds(rail.ids, list);
        const clipped = items.length > 8;
        return (
          <section key={rail.id} className="mx-auto mt-16 max-w-[1440px] px-4 lg:mt-20">
            <div className="mb-3">
              <span className="eyebrow">{rail.eyebrow}</span>
            </div>
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="title-gradient text-[30px] sm:text-[48px]">{rail.title}</h2>
              <Link href={rail.href} className="arrow-link shrink-0" onClick={() => track("explore", { rail: rail.id })}>
                {rail.more} →
              </Link>
            </div>
            <div className={clipped ? "rail-clip" : ""}>
              <div className="card-grid">
                {items.map((video) => (
                  <VideoCard key={`${rail.id}-${video.id}`} video={video} />
                ))}
              </div>
              {clipped ? (
                <div className="rail-fade">
                  <Link href={rail.href} className="explore-btn" onClick={() => track("explore", { rail: rail.id })}>{rail.cta}</Link>
                </div>
              ) : (
                <div className="mt-8 flex justify-center">
                  <Link href={rail.href} className="explore-btn" onClick={() => track("explore", { rail: rail.id })}>{rail.cta}</Link>
                </div>
              )}
            </div>
          </section>
        );
      })}

      <section className="mx-auto mt-20 max-w-[1440px] px-4">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">每月多一种看法</span>
            <h2 className="title-gradient mt-3 text-[30px] sm:text-[48px]">按感觉看</h2>
            <p className="mt-2 max-w-xl text-[15px] leading-7 text-[#bdbdbd]">
              先选一种气氛，再进入对应的片子。卡片会带着筛选条件打开片库。
            </p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <Button type="button" variant="ghost" size="icon" className="glass size-10 rounded-full" aria-label="向左" onClick={() => moodRef.current?.scrollBy({ left: -240, behavior: "smooth" })}>
              <ChevronLeft />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="glass size-10 rounded-full" aria-label="向右" onClick={() => moodRef.current?.scrollBy({ left: 240, behavior: "smooth" })}>
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div ref={moodRef} className="mood-row mt-6">
          {moods.map((mood) => (
            <Link key={mood.title} href={mood.href} className="w-[210px] shrink-0 snap-start">
              <span className="relative block aspect-[3/4] overflow-hidden rounded-[12px] border border-white/8 bg-[#141414]">
                <Image src={`/posters/${mood.cover}.jpg`} alt="" fill sizes="210px" className="object-cover" />
              </span>
              <span className="mt-2.5 flex items-baseline justify-between gap-3">
                <span className="font-[family-name:var(--font-display)] text-[14.5px]">{mood.title}</span>
                <span className="text-[13px] text-[#8d8d8d]">{mood.note}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-4 flex justify-end sm:hidden">
          <Button type="button" variant="outline" className="h-10 rounded-full border-white/10 bg-transparent" onClick={() => moodRef.current?.scrollBy({ left: 220, behavior: "smooth" })}>
            再看几张
          </Button>
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-[1440px] items-start gap-8 px-4 lg:mt-24 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <span className="eyebrow">怎么看</span>
          <h2 className="title-gradient mt-4 text-[32px] sm:text-[46px]">从一条片子到下一条</h2>
          <p className="mt-3 max-w-md text-[15px] leading-7 text-[#bdbdbd]">看一部公开短片需要的四步，都在这个页面里。</p>
          <div className="mt-6 space-y-2">
            {steps.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={`flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left ${step === index ? "step-on" : ""}`}
                onClick={() => setStep(index)}
                aria-pressed={step === index}
              >
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-white/6 text-[#f5f5f5]">
                  {index === 0 ? <Search className="size-4" /> : index === 1 ? <ListVideo className="size-4" /> : index === 2 ? <Clapperboard className="size-4" /> : <Sparkles className="size-4" />}
                </span>
                <span>
                  <span className="block text-[16px] text-[#f5f5f5]">{item.title}</span>
                  {step === index ? <span className="mt-1 block text-sm leading-6 text-[#b5b5b5]">{item.body}</span> : null}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="panel min-h-[420px] overflow-hidden p-3 sm:p-4">
          {step === 0 ? (
            <div className="flex h-full min-h-[390px] flex-col rounded-2xl bg-[#0c0c0c] p-5">
              <p className="text-sm text-[#8d8d8d]">搜索</p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-light">夜色、航拍、辛特尔</p>
              <div className="mt-5 grid flex-1 grid-cols-3 gap-2">
                {["harbor", "canyon", "sintel", "bunny", "falls", "candle"].map((id) => {
                  const item = getVideo(id, list);
                  return (
                    <Link key={id} href={`/watch/${id}`} className="relative h-full min-h-24 overflow-hidden rounded-xl bg-[#141414]">
                      <Image src={`/posters/${id}.jpg`} alt="" fill sizes="180px" className="object-cover" />
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pt-6 pb-2 text-xs">{item?.title}</span>
                    </Link>
                  );
                })}
              </div>
              <Button type="button" className="cta-pill mt-4 w-fit" onClick={() => setSearchOpen(true)}>
                打开搜索
                <span className="spark"><Search className="size-3.5" /></span>
              </Button>
            </div>
          ) : null}
          {step === 1 ? (
            <div className="flex h-full min-h-[390px] flex-col justify-between rounded-2xl bg-[#0c0c0c] p-5">
              <div>
                <p className="text-sm text-[#8d8d8d]">片单</p>
                <ul className="mt-4 space-y-3">
                  {list.slice(0, 4).map((video) => (
                    <li key={video.id} className="flex items-center gap-3 border-b border-white/6 pb-3">
                      <Image src={`/posters/${video.id}.jpg`} alt="" width={56} height={56} className="size-14 shrink-0 rounded-lg object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{video.title}</span>
                        <span className="text-sm text-[#8d8d8d]">{video.category}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button render={<Link href="/playlists" />} className="cta-pill w-fit">
                查看片单
              </Button>
            </div>
          ) : null}
          {step === 2 && preview ? (
            <div className="overflow-hidden rounded-2xl bg-black">
              <video className="aspect-video w-full object-cover" src={preview.src} controls playsInline preload="metadata" />
              <div className="flex items-center justify-between gap-3 bg-[#0c0c0c] px-4 py-3">
                <div>
                  <p className="text-sm text-[#8d8d8d]">正在预览</p>
                  <p>{preview.title}</p>
                </div>
                <Button render={<Link href={`/watch/${preview.id}`} />} className="h-10 rounded-full bg-white px-4 text-black hover:bg-[#f2f2f2]">
                  去播放页
                </Button>
              </div>
            </div>
          ) : null}
          {step === 3 ? (
            <div className="grid min-h-[390px] content-between rounded-2xl bg-[#0c0c0c] p-5">
              <div>
                <p className="text-sm text-[#8d8d8d]">接着看</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {list.slice(2, 6).map((video) => (
                    <Link key={video.id} href={`/watch/${video.id}`} className="overflow-hidden rounded-xl border border-white/8 hover:bg-white/5">
                      <Image src={`/posters/${video.id}.jpg`} alt="" width={480} height={342} className="aspect-[960/684] h-auto w-full object-cover" />
                      <span className="block px-3 py-2">
                        <span className="block text-sm text-[#8d8d8d]">{video.category}</span>
                        <span className="mt-1 block">{video.title}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[1440px] px-4">
        <span className="eyebrow">看之前</span>
        <h2 className="title-gradient mt-4 text-[32px] sm:text-[46px]">找得到，播得了，也能收起来</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <article className="panel p-6">
            <p className="text-sm text-[#8d8d8d]">片库规模</p>
            <p className="mt-6 font-[family-name:var(--font-display)] text-6xl font-light text-[#d7f5df]">{list.length}</p>
            <p className="mt-2 text-sm text-[#9a9a9a]">条可播放的公开短片</p>
            <h3 className="mt-8 text-xl">都在这个前端里</h3>
            <p className="mt-2 text-[15px] leading-7 text-[#b5b5b5]">没有付费接口，也没有假装接上的账户。点进去就是 HTML 视频。</p>
          </article>
          <article className="panel grid grid-cols-2 gap-3 p-6">
            {[
              ["6", "个分类"],
              ["本地", "片单"],
              ["公开", "来源可点开"],
              ["重试", "加载失败时"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-white/4 p-4">
                <p className="font-[family-name:var(--font-display)] text-3xl font-light text-[#d7f5df]">{value}</p>
                <p className="mt-2 text-sm text-[#9a9a9a]">{label}</p>
              </div>
            ))}
          </article>
          <article className="panel p-6">
            <h3 className="text-xl">桌面和手机各自排</h3>
            <p className="mt-3 text-[15px] leading-7 text-[#b5b5b5]">宽屏一行四张，窄屏两张。导航在手机上收成搜索和菜单，播放器控件不会被藏起来。</p>
            <div className="mt-6 flex gap-3">
              <div className="h-28 flex-1 rounded-xl border border-white/10 bg-[#0c0c0c] p-3">
                <div className="h-2 w-16 rounded-full bg-white/20" />
                <div className="mt-3 grid grid-cols-4 gap-1">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <span key={index} className="aspect-[4/3] rounded bg-white/10" />
                  ))}
                </div>
              </div>
              <div className="h-28 w-16 rounded-xl border border-white/10 bg-[#0c0c0c] p-2">
                <div className="mx-auto h-2 w-8 rounded-full bg-white/20" />
                <div className="mt-2 grid grid-cols-2 gap-1">
                  <span className="aspect-[3/4] rounded bg-white/10" />
                  <span className="aspect-[3/4] rounded bg-white/10" />
                </div>
              </div>
            </div>
          </article>
          <article className="panel flex flex-col justify-between p-6">
            <div>
              <h3 className="text-xl">来源写在播放页上</h3>
              <p className="mt-3 text-[15px] leading-7 text-[#b5b5b5]">Blender、MDN、维基共享资源。许可信息不在这里编造，看不准的就链到来源页。</p>
            </div>
            <Button render={<Link href="/about#sources" />} className="mt-6 h-11 w-fit rounded-full bg-[#f2f2f2] px-5 text-black hover:bg-white">
              查看来源
            </Button>
          </article>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-[1440px] items-center gap-8 px-4 lg:grid-cols-2">
        <div>
          <span className="eyebrow">片单</span>
          <h2 className="title-gradient mt-4 text-[32px] sm:text-[46px]">片子先放在这台浏览器</h2>
          <p className="mt-3 max-w-md text-[15px] leading-7 text-[#bdbdbd]">加进片单、拿下来、清空，都是本地动作。页面会告诉你它没有上传。</p>
          <Button render={<Link href="/playlists" />} className="cta-pill mt-6">
            打开片单
            <span className="spark"><ListVideo className="size-3.5" /></span>
          </Button>
        </div>
        <div className="panel overflow-hidden">
          <video className="aspect-video w-full object-cover" src={getVideo("canyon", list)?.src} poster="/posters/canyon.jpg" muted loop playsInline autoPlay preload="metadata" />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[860px] px-4">
        <h2 className="title-gradient text-center text-[32px] sm:text-[46px]">常见问题</h2>
        <div className="mt-8 divide-y divide-white/8 border-y border-white/8">
          {faqs.map((item, index) => {
            const open = openFaq === index;
            return (
              <div key={item.q}>
                <button type="button" className="flex w-full items-center justify-between gap-4 py-5 text-left text-[17px]" aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : index)}>
                  {item.q}
                  <span className="text-[#8d8d8d]">{open ? "–" : "+"}</span>
                </button>
                {open ? <p className="pb-5 text-[15px] leading-7 text-[#b5b5b5]">{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
