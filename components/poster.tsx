"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { VideoItem } from "@/lib/videos";

export function Poster({
  video,
  active = false,
  className = "",
}: {
  video: VideoItem;
  active?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !armed) return;
    if (active) {
      const play = node.play();
      if (play) play.catch(() => undefined);
    } else {
      node.pause();
      try {
        node.currentTime = 0;
      } catch {
        /* 有些浏览器在元数据回来之前不允许回零 */
      }
    }
  }, [active, armed]);

  useEffect(() => {
    if (active) setArmed(true);
  }, [active]);

  return (
    <div className={`thumb-media ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(90% 80% at 12% 8%, ${video.palette[0]}, transparent 55%), radial-gradient(80% 70% at 92% 100%, ${video.palette[1]}, transparent 52%), linear-gradient(165deg, ${video.palette[2]}, #070707)`,
        }}
      />
      <Image src={`/posters/${video.id}.jpg`} alt="" fill sizes="(min-width: 1024px) 25vw, 46vw" className="object-cover" />
      {armed ? (
        <video
          ref={ref}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}
          src={video.src}
          muted
          playsInline
          loop
          preload="metadata"
        />
      ) : null}
    </div>
  );
}
