import { NextResponse } from "next/server";
import { sanitizeEvent } from "@/lib/events";
import { recordEvent } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "无法读取" }, { status: 400 });
  }
  const event = sanitizeEvent(json);
  if (!event) return NextResponse.json({ error: "事件不被接受" }, { status: 400 });
  await recordEvent({
    ...event,
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    at: Date.now(),
  });
  return NextResponse.json({ ok: true });
}
