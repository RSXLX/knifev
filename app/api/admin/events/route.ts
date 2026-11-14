import { NextResponse } from "next/server";
import { eventNames, type EventName } from "@/lib/events";
import { clearEvents, publicVideos, readEvents, shanghaiDay } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const events = readEvents();
  const byName = Object.fromEntries(eventNames.map((name) => [name, 0])) as Record<EventName, number>;
  for (const event of events) byName[event.name] += 1;

  const days: { day: string; page_view: number; play: number }[] = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const day = shanghaiDay(Date.now() - offset * 24 * 60 * 60 * 1000);
    days.push({ day, page_view: 0, play: 0 });
  }
  const dayIndex = new Map(days.map((item, index) => [item.day, index]));
  for (const event of events) {
    const index = dayIndex.get(shanghaiDay(event.at));
    if (index === undefined) continue;
    if (event.name === "page_view" || event.name === "play") days[index][event.name] += 1;
  }

  const titles = new Map(publicVideos().map((video) => [video.id, video.title]));
  const plays = new Map<string, number>();
  for (const event of events) {
    if (event.name !== "play" || typeof event.props.videoId !== "string") continue;
    plays.set(event.props.videoId, (plays.get(event.props.videoId) || 0) + 1);
  }
  const topVideos = [...plays.entries()]
    .map(([id, count]) => ({ id, title: titles.get(id) || String(events.find((event) => event.props.videoId === id)?.props.title || id), plays: count }))
    .sort((a, b) => b.plays - a.plays)
    .slice(0, 6);

  return NextResponse.json({
    total: events.length,
    byName,
    days,
    topVideos,
    recent: events.slice(-120).reverse(),
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { action?: string };
  if (body.action === "clear") {
    await clearEvents();
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "不认识的操作" }, { status: 400 });
}
