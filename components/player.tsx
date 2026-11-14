"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VideoItem } from "@/lib/videos";

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function Player({ video }: { video: VideoItem }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [waiting, setWaiting] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const node = mediaRef.current;
    if (!node) return;
    const sync = () => {
      setTime(node.currentTime || 0);
      setDuration(Number.isFinite(node.duration) ? node.duration : 0);
      setPlaying(!node.paused);
      setWaiting(node.readyState < 2);
    };
    sync();
    const onError = () => setError("这条片子没有加载出来。网络可能拦了片源，可以重试或换一条。");
    node.addEventListener("timeupdate", sync);
    node.addEventListener("loadedmetadata", sync);
    node.addEventListener("durationchange", sync);
    node.addEventListener("play", sync);
    node.addEventListener("pause", sync);
    node.addEventListener("waiting", sync);
    node.addEventListener("canplay", sync);
    node.addEventListener("error", onError);
    return () => {
      node.removeEventListener("timeupdate", sync);
      node.removeEventListener("loadedmetadata", sync);
      node.removeEventListener("durationchange", sync);
      node.removeEventListener("play", sync);
      node.removeEventListener("pause", sync);
      node.removeEventListener("waiting", sync);
      node.removeEventListener("canplay", sync);
      node.removeEventListener("error", onError);
    };
  }, [video.id, attempt]);

  const toggle = async () => {
    const node = mediaRef.current;
    if (!node) return;
    setError("");
    if (node.paused) {
      try {
        await node.play();
      } catch {
        setError("浏览器没有允许自动播放。再点一次播放。");
      }
    } else {
      node.pause();
    }
  };

  return (
    <div
      ref={wrapRef}
      tabIndex={0}
      className="overflow-hidden rounded-[20px] border border-white/10 bg-black outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      onKeyDown={(event) => {
        if (event.key === " " || event.key === "k") {
          event.preventDefault();
          void toggle();
        }
      }}
    >
      <div className="relative aspect-video bg-black">
        <video
          key={`${video.id}-${attempt}`}
          ref={mediaRef}
          className="h-full w-full object-contain"
          src={video.src}
          poster={`/posters/${video.id}.jpg`}
          playsInline
          preload="metadata"
          onClick={() => void toggle()}
        />
        <button
          type="button"
          aria-label={playing ? "暂停" : "播放"}
          className={`absolute inset-0 grid place-items-center ${playing ? "opacity-0 hover:opacity-100" : "opacity-100"}`}
          onClick={() => void toggle()}
        >
          <span className="grid size-16 place-items-center rounded-full bg-white text-black">
            {playing ? <Pause /> : <Play className="ml-1" />}
          </span>
        </button>
        {waiting && !error ? (
          <div className="pointer-events-none absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white/80">
            正在缓冲
          </div>
        ) : null}
        {error ? (
          <div className="absolute inset-0 grid place-items-center bg-black/70 px-6 text-center">
            <div>
              <p className="text-[15px] text-[#f5f5f5]">{error}</p>
              <Button
                type="button"
                className="cta-pill mt-4"
                onClick={() => {
                  setError("");
                  setWaiting(true);
                  setAttempt((value) => value + 1);
                }}
              >
                重试
              </Button>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-3 bg-[#0c0c0c] px-3 py-3 sm:px-4">
        <label className="sr-only" htmlFor={`seek-${video.id}`}>进度</label>
        <input
          id={`seek-${video.id}`}
          className="seek"
          type="range"
          min={0}
          max={1000}
          value={duration ? Math.round((time / duration) * 1000) : 0}
          onChange={(event) => {
            const node = mediaRef.current;
            if (!node || !duration) return;
            node.currentTime = (Number(event.target.value) / 1000) * duration;
          }}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10" aria-label={playing ? "暂停" : "播放"} onClick={() => void toggle()}>
            {playing ? <Pause /> : <Play />}
          </Button>
          <span className="text-xs tabular-nums text-[#c8c8c8]">
            {formatTime(time)} / {formatTime(duration)}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-white/10"
            aria-label={muted || volume === 0 ? "取消静音" : "静音"}
            onClick={() => {
              const node = mediaRef.current;
              if (!node) return;
              node.muted = !node.muted;
              setMuted(node.muted);
            }}
          >
            {muted || volume === 0 ? <VolumeX /> : <Volume2 />}
          </Button>
          <label className="sr-only" htmlFor={`vol-${video.id}`}>音量</label>
          <input
            id={`vol-${video.id}`}
            className="seek hidden w-24 sm:block"
            type="range"
            min={0}
            max={100}
            value={Math.round(volume * 100)}
            onChange={(event) => {
              const next = Number(event.target.value) / 100;
              setVolume(next);
              if (mediaRef.current) {
                mediaRef.current.volume = next;
                mediaRef.current.muted = next === 0;
                setMuted(next === 0);
              }
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="ml-auto rounded-full text-white hover:bg-white/10"
            aria-label="全屏"
            onClick={() => {
              const node = wrapRef.current;
              if (!node) return;
              if (document.fullscreenElement) void document.exitFullscreen();
              else void node.requestFullscreen();
            }}
          >
            <Maximize />
          </Button>
        </div>
      </div>
    </div>
  );
}
