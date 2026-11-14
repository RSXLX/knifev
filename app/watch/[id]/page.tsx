import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WatchView } from "@/components/watch-view";
import { getVideo, videos } from "@/lib/videos";

export function generateStaticParams() {
  return videos.map((video) => ({ id: video.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const video = getVideo(id);
  return {
    title: video ? `${video.title} — knifeV` : "找不到这条片子",
    description: video?.blurb,
  };
}

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getVideo(id)) notFound();
  return <WatchView id={id} />;
}
