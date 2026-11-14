import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WatchView } from "@/components/watch-view";
import { publicVideos } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const video = publicVideos().find((item) => item.id === id);
  return {
    title: video ? `${video.title} — Lumora` : "找不到这条片子",
    description: video?.blurb,
  };
}

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!publicVideos().some((item) => item.id === id)) notFound();
  return <WatchView id={id} />;
}
