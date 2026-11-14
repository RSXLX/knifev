import { NextResponse } from "next/server";
import { adminVideos, createVideo, patchVideo, removeCustomVideo, setHidden, type VideoPatch } from "@/lib/store";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ videos: adminVideos() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    action?: string;
    id?: string;
    hidden?: boolean;
    patch?: VideoPatch;
    video?: VideoPatch & { id?: string };
  };

  if (body.action === "hide" && body.id) {
    await setHidden(body.id, Boolean(body.hidden));
    return NextResponse.json({ ok: true });
  }

  if (body.action === "patch" && body.id && body.patch) {
    const ok = await patchVideo(body.id, body.patch);
    if (!ok) return NextResponse.json({ error: "没有这条片子" }, { status: 404 });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "create" && body.video) {
    const error = await createVideo(body.video);
    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "remove" && body.id) {
    const ok = await removeCustomVideo(body.id);
    if (!ok) return NextResponse.json({ error: "只能删除后台添加的片子" }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "不认识的操作" }, { status: 400 });
}
