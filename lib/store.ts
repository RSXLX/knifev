import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { categories, videos, type Category, type VideoItem } from "@/lib/videos";
import type { AnalyticsEvent } from "@/lib/events";

export type VideoPatch = {
  title?: string;
  blurb?: string;
  category?: Category;
  mood?: string;
  fresh?: boolean;
  src?: string;
  source?: string;
  credit?: string;
  license?: string;
};

type Store = {
  hidden: string[];
  overrides: Record<string, VideoPatch>;
  custom: VideoItem[];
  events: AnalyticsEvent[];
};

export type AdminVideo = VideoItem & { hidden: boolean; builtin: boolean };

const file = path.join(process.cwd(), "data", "store.json");
const empty = (): Store => ({ hidden: [], overrides: {}, custom: [], events: [] });

let queue: Promise<unknown> = Promise.resolve();

function read(): Store {
  try {
    const parsed = JSON.parse(readFileSync(file, "utf8")) as Partial<Store>;
    return {
      hidden: Array.isArray(parsed.hidden) ? parsed.hidden.filter((id) => typeof id === "string") : [],
      overrides: parsed.overrides && typeof parsed.overrides === "object" ? parsed.overrides : {},
      custom: Array.isArray(parsed.custom) ? parsed.custom : [],
      events: Array.isArray(parsed.events) ? parsed.events : [],
    };
  } catch {
    return empty();
  }
}

function write(store: Store) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(store));
}

function update<T>(mutator: (store: Store) => T) {
  const run = queue.then(() => {
    const store = read();
    const result = mutator(store);
    write(store);
    return result;
  });
  queue = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

function apply(video: VideoItem, store: Store): VideoItem {
  const patch = store.overrides[video.id];
  if (!patch) return video;
  return {
    ...video,
    title: patch.title || video.title,
    blurb: patch.blurb ?? video.blurb,
    category: patch.category && categories.includes(patch.category) ? patch.category : video.category,
    mood: patch.mood || video.mood,
    fresh: patch.fresh ?? video.fresh,
    src: patch.src || video.src,
    source: patch.source || video.source,
    credit: patch.credit || video.credit,
    license: patch.license || video.license,
  };
}

export function publicVideos() {
  const store = read();
  const hidden = new Set(store.hidden);
  const builtin = videos.map((video) => apply(video, store)).filter((video) => !hidden.has(video.id));
  const custom = store.custom.map((video) => apply(video, store)).filter((video) => !hidden.has(video.id));
  return [...builtin, ...custom];
}

export function adminVideos(): AdminVideo[] {
  const store = read();
  const hidden = new Set(store.hidden);
  return [
    ...videos.map((video) => ({ ...apply(video, store), hidden: hidden.has(video.id), builtin: true })),
    ...store.custom.map((video) => ({ ...apply(video, store), hidden: hidden.has(video.id), builtin: false })),
  ];
}

function cleanPatch(input: VideoPatch): VideoPatch {
  const patch: VideoPatch = {};
  if (typeof input.title === "string") patch.title = input.title.trim().slice(0, 80);
  if (typeof input.blurb === "string") patch.blurb = input.blurb.trim().slice(0, 400);
  if (input.category && categories.includes(input.category)) patch.category = input.category;
  if (typeof input.mood === "string") patch.mood = input.mood.trim().slice(0, 20);
  if (typeof input.fresh === "boolean") patch.fresh = input.fresh;
  if (typeof input.src === "string" && /^https?:\/\//.test(input.src)) patch.src = input.src.slice(0, 400);
  if (typeof input.source === "string") patch.source = input.source.trim().slice(0, 400);
  if (typeof input.credit === "string") patch.credit = input.credit.trim().slice(0, 80);
  if (typeof input.license === "string") patch.license = input.license.trim().slice(0, 40);
  return patch;
}

export function patchVideo(id: string, patch: VideoPatch) {
  return update((store) => {
    const known = videos.some((video) => video.id === id) || store.custom.some((video) => video.id === id);
    if (!known) return false;
    store.overrides[id] = { ...store.overrides[id], ...cleanPatch(patch) };
    return true;
  });
}

export function setHidden(id: string, hidden: boolean) {
  return update((store) => {
    store.hidden = store.hidden.filter((item) => item !== id);
    if (hidden) store.hidden.push(id);
  });
}

export function createVideo(input: VideoPatch & { id?: string }) {
  return update((store) => {
    const id = (input.id || "").trim().toLowerCase();
    if (!/^[a-z0-9-]{2,40}$/.test(id)) return "编号只能用小写字母、数字和连字符";
    if (videos.some((video) => video.id === id) || store.custom.some((video) => video.id === id)) return "这个编号已经有了";
    const patch = cleanPatch(input);
    if (!patch.title || !patch.src || !patch.category) return "标题、地址和分类都要填";
    store.custom.push({
      id,
      title: patch.title,
      category: patch.category,
      blurb: patch.blurb || "后台添加的片子。",
      src: patch.src,
      source: patch.source || patch.src,
      credit: patch.credit || "后台添加",
      license: patch.license || "见地址",
      fresh: patch.fresh ?? true,
      mood: patch.mood || patch.category,
      palette: ["#9aa4b2", "#2a3038", "#101214"],
    });
    return "";
  });
}

export function removeCustomVideo(id: string) {
  return update((store) => {
    const before = store.custom.length;
    store.custom = store.custom.filter((video) => video.id !== id);
    delete store.overrides[id];
    store.hidden = store.hidden.filter((item) => item !== id);
    return store.custom.length !== before;
  });
}

export function recordEvent(event: AnalyticsEvent) {
  return update((store) => {
    store.events.push(event);
    if (store.events.length > 2000) store.events.splice(0, store.events.length - 2000);
  });
}

export function readEvents() {
  return read().events;
}

export function clearEvents() {
  return update((store) => {
    store.events = [];
  });
}

export function shanghaiDay(at: number) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(at));
}
