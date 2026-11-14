"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { track } from "@/lib/track";

type LibraryContextValue = {
  ready: boolean;
  guest: boolean;
  guestOpen: boolean;
  setGuestOpen: (open: boolean) => void;
  becomeGuest: () => void;
  saved: string[];
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
  clearSaved: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  toast: (message: string) => void;
  message: string | null;
  digest: string | null;
  subscribe: (email: string) => string;
};

const LibraryContext = createContext<LibraryContextValue | null>(null);

const guestKey = "lumora-guest";
const savedKey = "lumora-playlist";
const digestKey = "lumora-digest";

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [guest, setGuest] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [digest, setDigest] = useState<string | null>(null);

  useEffect(() => {
    try {
      setGuest(localStorage.getItem(guestKey) === "1");
      const stored = localStorage.getItem(savedKey);
      setSaved(stored ? (JSON.parse(stored) as string[]) : []);
      setDigest(localStorage.getItem(digestKey));
    } catch {
      setSaved([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toast = useCallback((next: string) => {
    setMessage(next);
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [message]);

  const becomeGuest = useCallback(() => {
    localStorage.setItem(guestKey, "1");
    setGuest(true);
    setGuestOpen(false);
    setMessage("已用访客身份继续。没有账户，也不会收集登录信息。");
  }, []);

  const toggleSave = useCallback((id: string) => {
    setSaved((current) => {
      const savedNow = !current.includes(id);
      const next = savedNow ? [id, ...current] : current.filter((item) => item !== id);
      localStorage.setItem(savedKey, JSON.stringify(next));
      track("save", { videoId: id, saved: savedNow });
      return next;
    });
  }, []);

  const clearSaved = useCallback(() => {
    setSaved([]);
    localStorage.setItem(savedKey, "[]");
  }, []);

  const subscribe = useCallback((email: string) => {
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "请填写一个看起来像邮箱的地址。";
    localStorage.setItem(digestKey, value);
    setDigest(value);
    return "";
  }, []);

  const value = useMemo<LibraryContextValue>(
    () => ({
      ready,
      guest,
      guestOpen,
      setGuestOpen,
      becomeGuest,
      saved,
      isSaved: (id) => saved.includes(id),
      toggleSave,
      clearSaved,
      searchOpen,
      setSearchOpen,
      toast,
      message,
      digest,
      subscribe,
    }),
    [ready, guest, guestOpen, becomeGuest, saved, toggleSave, clearSaved, searchOpen, toast, message, digest, subscribe]
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const value = useContext(LibraryContext);
  if (!value) throw new Error("useLibrary 必须放在 LibraryProvider 里");
  return value;
}
