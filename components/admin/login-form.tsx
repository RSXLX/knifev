"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  return (
    <div className="grid min-h-screen place-items-center bg-[#060606] px-4">
      <form
        className="panel w-full max-w-md p-6"
        onSubmit={async (event) => {
          event.preventDefault();
          setPending(true);
          setError("");
          const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ password }),
          });
          setPending(false);
          if (!response.ok) {
            setError("口令不对。默认是 README 里的本地演示口令。");
            return;
          }
          const next = params.get("next") || "/admin";
          router.replace(next.startsWith("/admin") ? next : "/admin");
          router.refresh();
        }}
      >
        <Logo />
        <h1 className="title-gradient mt-5 text-[32px]">进入后台</h1>
        <p className="mt-3 text-sm leading-6 text-[#b5b5b5]">
          这只是这台机器上的演示锁，用来挡住管理页。没有用户库，也不会把口令发到别处。
        </p>
        <label className="mt-5 block text-sm text-[#cfcfcf]" htmlFor="admin-password">
          口令
        </label>
        <Input
          id="admin-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          className="mt-2 h-11 rounded-full border-white/10 bg-white/4 px-4 text-[#f5f5f5]"
        />
        {error ? <p className="mt-3 text-sm text-[#ffb4b4]">{error}</p> : null}
        <Button type="submit" disabled={pending} className="cta-pill mt-5">
          {pending ? "正在核对" : "进入"}
        </Button>
      </form>
    </div>
  );
}
