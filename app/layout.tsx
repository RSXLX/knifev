import type { Metadata } from "next";
import { Onest, Outfit } from "next/font/google";
import { CatalogProvider } from "@/components/catalog-provider";
import { Shell } from "@/components/shell";
import { LibraryProvider } from "@/lib/library";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "knifeV — 电影感影像，随手开播",
  description: "一个独立的视频浏览演示。公开短片可以搜索、筛选、加入本地片单并直接播放。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`dark ${onest.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-[#060606] text-[#f5f5f5] antialiased">
        <LibraryProvider>
          <CatalogProvider>
            <Shell>{children}</Shell>
          </CatalogProvider>
        </LibraryProvider>
      </body>
    </html>
  );
}
