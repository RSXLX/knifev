import { AdminFrame } from "@/components/admin/admin-frame";

export const metadata = {
  title: "后台 — Lumora",
  description: "本地片子管理和埋点记录。",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminFrame>{children}</AdminFrame>;
}
