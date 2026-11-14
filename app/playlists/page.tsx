import { PlaylistView } from "@/components/playlist-view";

export const metadata = {
  title: "片单 — Lumora",
  description: "保存在这台浏览器里的短片。",
};

export default function PlaylistsPage() {
  return <PlaylistView />;
}
