"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/logo";

const links = [
  { href: "/admin", label: "概览" },
  { href: "/admin/videos", label: "片子" },
  { href: "/admin/events", label: "埋点" },
];

export function AdminFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#060606] text-[#f5f5f5]">
      <div className="mx-auto grid max-w-[1200px] gap-6 px-4 py-6 lg:grid-cols-[200px_1fr]">
        <aside className="panel h-fit p-3">
          <Logo />
          <p className="mt-3 px-2 text-xs text-[#8d8d8d]">本地后台 · 不是外部账户</p>
          <nav className="mt-4 grid gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className={`rounded-xl px-3 py-2 text-sm ${active ? "bg-white text-black" : "text-[#d0d0d0] hover:bg-white/6"}`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="mt-4 w-full rounded-xl px-3 py-2 text-left text-sm text-[#a6a6a6] hover:bg-white/6 hover:text-white"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              router.replace("/admin/login");
              router.refresh();
            }}
          >
            退出
          </button>
          <Link href="/" className="mt-1 block rounded-xl px-3 py-2 text-sm text-[#a6a6a6] hover:bg-white/6 hover:text-white">
            回到片库
          </Link>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
