export const eventNames = [
  "page_view",
  "search",
  "search_open",
  "filter",
  "play",
  "pause",
  "seek",
  "ended",
  "save",
  "cta_watch",
  "explore",
  "subscribe_local",
  "menu_open",
] as const;

export type EventName = (typeof eventNames)[number];

export const eventLabels: Record<EventName, string> = {
  page_view: "打开页面",
  search: "搜索",
  search_open: "打开搜索",
  filter: "筛选片库",
  play: "播放",
  pause: "暂停",
  seek: "拖动进度",
  ended: "播放结束",
  save: "片单",
  cta_watch: "开始观看",
  explore: "探索片架",
  subscribe_local: "本地订阅",
  menu_open: "打开菜单",
};

export type EventProps = Record<string, string | number | boolean>;

export type AnalyticsEvent = {
  id: string;
  name: EventName;
  at: number;
  path: string;
  props: EventProps;
};

const allowed = new Set<string>(eventNames);

export function sanitizeEvent(input: unknown): Omit<AnalyticsEvent, "id" | "at"> | null {
  if (!input || typeof input !== "object") return null;
  const body = input as { name?: unknown; path?: unknown; props?: unknown };
  if (typeof body.name !== "string" || !allowed.has(body.name)) return null;
  const path = typeof body.path === "string" ? body.path.slice(0, 120) : "/";
  const props: EventProps = {};
  if (body.props && typeof body.props === "object") {
    for (const [key, value] of Object.entries(body.props).slice(0, 8)) {
      if (!/^[a-zA-Z][a-zA-Z0-9_]{0,24}$/.test(key)) continue;
      if (typeof value === "string") props[key] = value.slice(0, 80);
      else if (typeof value === "number" && Number.isFinite(value)) props[key] = Math.round(value * 100) / 100;
      else if (typeof value === "boolean") props[key] = value;
    }
  }
  return { name: body.name as EventName, path, props };
}
