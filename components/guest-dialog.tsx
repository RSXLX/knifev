"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useLibrary } from "@/lib/library";

export function GuestDialog() {
  const { guestOpen, setGuestOpen, becomeGuest, guest } = useLibrary();

  return (
    <Dialog open={guestOpen} onOpenChange={setGuestOpen}>
      <DialogContent className="max-w-[440px] rounded-[22px] border border-white/10 bg-[#141414] p-6 text-[#f5f5f5] ring-0 sm:max-w-[440px]">
        <DialogTitle className="font-[family-name:var(--font-display)] text-2xl font-light tracking-[-0.03em]">
          {guest ? "你正在以访客观看" : "这里没有登录"}
        </DialogTitle>
        <DialogDescription className="text-[15px] leading-7 text-[#b5b5b5]">
          Lumora 是一个前端演示。片单和订阅只写在这台浏览器的本地存储里，不会提交到服务器，也没有账户可登。
        </DialogDescription>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" className="h-10 rounded-full border-white/12 bg-transparent text-[#f5f5f5]" onClick={() => setGuestOpen(false)}>
            先看看
          </Button>
          <Button type="button" className="cta-pill h-10 px-4" onClick={becomeGuest}>
            {guest ? "知道了" : "以访客继续"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
