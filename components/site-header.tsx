"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, UserRound, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/lib/library";
import { track } from "@/lib/track";
import { categories } from "@/lib/videos";

const mainLinks = [
  { href: "/library", label: "片库" },
  { href: "/library", label: "分类", menu: true },
  { href: "/about", label: "专题" },
  { href: "/playlists", label: "片单" },
  { href: "/about", label: "关于" },
  { href: "/about#contact", label: "联络" },
];

const sideLinks = [
  { href: "/playlists", label: "合集" },
  { href: "/library?sort=new", label: "动态", fresh: true },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { guest, setGuestOpen, setSearchOpen } = useLibrary();
  const [menu, setMenu] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenu(false);
    setCatOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 px-4 py-3.5 transition-colors ${scrolled ? "bg-[#060606]/80 backdrop-blur-xl" : ""}`}>
      <div className="mx-auto grid max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-3 lg:gap-4">
        <div className="lg:hidden">
          <Logo compact />
        </div>
        <div className="hidden lg:block">
          <Logo />
        </div>

        <div className="flex items-center justify-end gap-2 lg:hidden">
          <button type="button" className="glass flex h-11 min-w-0 flex-1 items-center gap-2 rounded-full px-4 text-left text-[#a6a6a6]" onClick={() => setSearchOpen(true)}>
            <Search className="size-4" />
            <span className="truncate text-[15px]">搜索片库</span>
          </button>
          <Button type="button" variant="ghost" size="icon" className="glass size-11 rounded-full text-[#f5f5f5]" aria-label={menu ? "关闭菜单" : "打开菜单"} aria-expanded={menu} onClick={() => setMenu((value) => { if (!value) track("menu_open"); return !value; })}>
            {menu ? <X /> : <Menu />}
          </Button>
        </div>

        <div className="hidden items-center justify-center gap-2 lg:flex">
          <button type="button" className="glass inline-flex h-[49px] items-center gap-2.5 rounded-full pr-3 pl-4 text-[#a6a6a6]" onClick={() => setSearchOpen(true)} aria-label="搜索片库">
            <Search className="size-4" />
            <span className="kbd">/</span>
          </button>
          <nav className="glass flex h-[49px] items-center rounded-full px-1.5" aria-label="主要">
            {mainLinks.map((link) =>
              link.menu ? (
                <div key={link.label} className="relative">
                  <button type="button" className="nav-link" aria-expanded={catOpen} onClick={() => setCatOpen((value) => !value)}>
                    {link.label}
                  </button>
                  {catOpen ? (
                    <div className="glass absolute top-[46px] left-0 z-50 w-40 rounded-2xl p-1.5">
                      {categories.map((category) => (
                        <Link key={category} href={`/library?cat=${category}`} className="block rounded-xl px-3 py-2 text-sm text-[#d6d6d6] hover:bg-white/6 hover:text-white">
                          {category}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link key={link.label} href={link.href} data-active={pathname === link.href} className="nav-link">
                  {link.label}
                </Link>
              )
            )}
          </nav>
          <nav className="glass flex h-[49px] items-center rounded-full px-1.5" aria-label="更多">
            {sideLinks.map((link) => (
              <Link key={link.label} href={link.href} className="nav-link">
                {link.label}
                {link.fresh ? <span className="new-badge">New</span> : null}
              </Link>
            ))}
          </nav>
        </div>

        <button type="button" className="hidden items-center gap-2 rounded-full px-2 text-[16px] font-medium text-[#a6a6a6] hover:text-[#f5f5f5] lg:inline-flex" onClick={() => setGuestOpen(true)}>
          <UserRound className="size-4" />
          {guest ? "访客" : "登录"}
        </button>
      </div>

      {menu ? (
        <div className="glass mt-3 rounded-3xl p-3 lg:hidden">
          <div className="grid gap-1">
            {[
              ["/library", "片库"],
              ["/playlists", "片单"],
              ["/about", "关于"],
              ["/about#contact", "联络"],
            ].map(([href, label]) => (
              <Link key={label} href={href} className="rounded-2xl px-3 py-3 text-[16px] text-[#f5f5f5] hover:bg-white/6">
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2 px-1 pb-1">
            {categories.map((category) => (
              <Link key={category} href={`/library?cat=${category}`} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-[#d0d0d0]">
                {category}
              </Link>
            ))}
          </div>
          <Button type="button" variant="outline" className="mt-2 h-11 w-full rounded-full border-white/10 bg-transparent text-[#f5f5f5]" onClick={() => setGuestOpen(true)}>
            <UserRound />
            {guest ? "当前是访客" : "以访客继续"}
          </Button>
        </div>
      ) : null}
    </header>
  );
}
