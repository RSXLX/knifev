import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<p className="px-4 pt-24 text-[#9a9a9a]">正在打开登录…</p>}>
      <LoginForm />
    </Suspense>
  );
}
