import type { EventName, EventProps } from "@/lib/events";

export function track(name: EventName, props: EventProps = {}) {
  if (typeof window === "undefined") return;
  const body = JSON.stringify({ name, path: window.location.pathname, props });
  void fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}
