import { NextResponse } from "next/server";
import { publicVideos } from "@/lib/store";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ videos: publicVideos() });
}
