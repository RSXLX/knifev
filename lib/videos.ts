export const categories = ["动画", "自然", "夜色", "城市", "驾驶", "实验"] as const;

export type Category = (typeof categories)[number];

export type VideoItem = {
  id: string;
  title: string;
  category: Category;
  blurb: string;
  src: string;
  source: string;
  credit: string;
  license: string;
  fresh?: boolean;
  mood: string;
  palette: [string, string, string];
};

export const videos: VideoItem[] = [
  {
    id: "sintel",
    title: "辛特尔：序幕",
    category: "动画",
    blurb: "Blender 基金会短片《Sintel》的预告。山风、龙和一盏灯，适合作为开场。",
    src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    source: "https://durian.blender.org/",
    credit: "Blender Foundation",
    license: "CC BY 3.0",
    fresh: true,
    mood: "动画",
    palette: ["#8ea2c4", "#1c2433", "#0c1018"],
  },
  {
    id: "bunny",
    title: "大耳兔：草地",
    category: "动画",
    blurb: "《Big Buck Bunny》预告。晴天、草地和一只不肯让路的兔子。",
    src: "https://media.w3.org/2010/05/bunny/trailer.mp4",
    source: "https://peach.blender.org/",
    credit: "Blender Foundation",
    license: "CC BY 3.0",
    fresh: true,
    mood: "动画",
    palette: ["#b7d36a", "#2c4a28", "#10160e"],
  },
  {
    id: "meadow",
    title: "午后的影子",
    category: "动画",
    blurb: "同一部兔子短片的一小段，节奏更短，适合先看一眼再决定要不要看长预告。",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    source: "https://peach.blender.org/",
    credit: "Blender Foundation",
    license: "CC BY 3.0",
    mood: "动画",
    palette: ["#e7c27a", "#5a4630", "#16120e"],
  },
  {
    id: "flower",
    title: "花期",
    category: "自然",
    blurb: "MDN 提供的 CC0 花朵镜头。颜色干净，适合静音循环着看。",
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    source: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video",
    credit: "MDN / CC0",
    license: "CC0",
    fresh: true,
    mood: "海岸",
    palette: ["#f3b7c8", "#6d4b73", "#1a1218"],
  },
  {
    id: "canyon",
    title: "峡谷之上",
    category: "自然",
    blurb: "大峡谷上空的航拍。岩层一条一条铺开，几乎没有对白。",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/eb/2010_08_18_Grand_Canyon_Video_Aerial_%284908347418%29.webm",
    source: "https://commons.wikimedia.org/wiki/File:2010_08_18_Grand_Canyon_Video_Aerial_(4908347418).webm",
    credit: "维基共享资源",
    license: "见来源页",
    fresh: true,
    mood: "航拍",
    palette: ["#e39a62", "#6a3d32", "#140e0c"],
  },
  {
    id: "blackfoot",
    title: "黑脚河",
    category: "自然",
    blurb: "河面贴着树影走。无人机镜头平稳，适合当背景看完一整段。",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/29/Blackfoot-River-Drone-Shot.webm",
    source: "https://commons.wikimedia.org/wiki/File:Blackfoot-River-Drone-Shot.webm",
    credit: "维基共享资源",
    license: "见来源页",
    mood: "航拍",
    palette: ["#7ea7b8", "#1d3a44", "#0c1416"],
  },
  {
    id: "falls",
    title: "卡克卢夫瀑布",
    category: "自然",
    blurb: "一挂白水从岩壁上落下来。声音大，画面简单。",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/df/Karkloof_Falls_%2853460015297%29.webm",
    source: "https://commons.wikimedia.org/wiki/File:Karkloof_Falls_(53460015297).webm",
    credit: "维基共享资源",
    license: "见来源页",
    mood: "海岸",
    palette: ["#d9efe8", "#3d6d62", "#101816"],
  },
  {
    id: "sipi",
    title: "锡皮瀑布",
    category: "自然",
    blurb: "多层瀑布叠在绿林里。适合和卡克卢夫对照着看。",
    src: "https://upload.wikimedia.org/wikipedia/commons/1/11/Sipi_Falls.webm",
    source: "https://commons.wikimedia.org/wiki/File:Sipi_Falls.webm",
    credit: "维基共享资源",
    license: "见来源页",
    mood: "航拍",
    palette: ["#9dbe7a", "#24503a", "#101610"],
  },
  {
    id: "brook",
    title: "山涧白练",
    category: "自然",
    blurb: "一段很短的山涧。水声比画面先到。",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/52/Video_%C5%A0%C3%BAtovsk%C3%BD_vodop%C3%A1d.webm",
    source: "https://commons.wikimedia.org/wiki/File:Video_%C5%A0%C3%BAtovsk%C3%BD_vodop%C3%A1d.webm",
    credit: "维基共享资源",
    license: "见来源页",
    mood: "海岸",
    palette: ["#c9d7e4", "#4d6270", "#12161a"],
  },
  {
    id: "shore",
    title: "丁格尔岸石",
    category: "自然",
    blurb: "爱尔兰丁格尔半岛的岸石和风。海是灰绿色的。",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Boulders-1280598%2C_Dingle_Peninsula%2C_Co._Kerry%2C_Ireland.webm",
    source: "https://commons.wikimedia.org/wiki/File:Boulders-1280598,_Dingle_Peninsula,_Co._Kerry,_Ireland.webm",
    credit: "维基共享资源",
    license: "见来源页",
    fresh: true,
    mood: "海岸",
    palette: ["#9eb4c4", "#314656", "#101418"],
  },
  {
    id: "harbor",
    title: "海港黄昏",
    category: "夜色",
    blurb: "巴统港的船和落日。天色从橙走到深蓝。",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Batumi2025ship-and-sunset.webm",
    source: "https://commons.wikimedia.org/wiki/File:Batumi2025ship-and-sunset.webm",
    credit: "维基共享资源",
    license: "见来源页",
    fresh: true,
    mood: "夜色",
    palette: ["#f0a06a", "#5a2e4a", "#140e14"],
  },
  {
    id: "mojave",
    title: "莫哈韦落日",
    category: "夜色",
    blurb: "沙漠把最后一点光摊平。地平线几乎不动。",
    src: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Mojave_Desert_Sunset_%2840480403760%29.webm",
    source: "https://commons.wikimedia.org/wiki/File:Mojave_Desert_Sunset_(40480403760).webm",
    credit: "维基共享资源",
    license: "见来源页",
    fresh: true,
    mood: "夜色",
    palette: ["#f2b56a", "#8a3d2a", "#1a100e"],
  },
  {
    id: "clouds",
    title: "云过公路",
    category: "夜色",
    blurb: "特内里费的云贴着路面走。像一条会呼吸的灰带子。",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Clouds_moving_over_a_road_in_Tenerife.webm",
    source: "https://commons.wikimedia.org/wiki/File:Clouds_moving_over_a_road_in_Tenerife.webm",
    credit: "维基共享资源",
    license: "见来源页",
    mood: "公路",
    palette: ["#d5dbe4", "#5d6878", "#121418"],
  },
  {
    id: "moon",
    title: "窗前的月亮",
    category: "夜色",
    blurb: "卢布尔雅那的月。画面小，光很集中。",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/56/2022-06-11_LJUBLJANA_Galevica_LUNA_2.webm",
    source: "https://commons.wikimedia.org/wiki/File:2022-06-11_LJUBLJANA_Galevica_LUNA_2.webm",
    credit: "维基共享资源",
    license: "见来源页",
    mood: "夜色",
    palette: ["#f4f1e4", "#6d6a78", "#121218"],
  },
  {
    id: "lightning",
    title: "电离层闪电",
    category: "实验",
    blurb: "GOES 卫星看到的闪电。不像地面雷雨，更像一张会闪的地图。",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a8/GOESLightning130622.webm",
    source: "https://commons.wikimedia.org/wiki/File:GOESLightning130622.webm",
    credit: "维基共享资源",
    license: "见来源页",
    fresh: true,
    mood: "烛火",
    palette: ["#d7e26a", "#2a3a28", "#10120e"],
  },
  {
    id: "pass",
    title: "康诺尔山口",
    category: "驾驶",
    blurb: "丁格尔的山路。弯很多，天很低。",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Conor_Pass-1012864%2C_Dingle_Peninsula%2C_Co._Kerry%2C_Ireland.webm",
    source: "https://commons.wikimedia.org/wiki/File:Conor_Pass-1012864,_Dingle_Peninsula,_Co._Kerry,_Ireland.webm",
    credit: "维基共享资源",
    license: "见来源页",
    fresh: true,
    mood: "公路",
    palette: ["#8ea888", "#3c4634", "#121410"],
  },
  {
    id: "snow",
    title: "雪中的门",
    category: "城市",
    blurb: "勃兰登堡门前的雪。城市被压得很安静。",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/52/20260126_154741887_Schnee_Brandenburger_Tor.webm",
    source: "https://commons.wikimedia.org/wiki/File:20260126_154741887_Schnee_Brandenburger_Tor.webm",
    credit: "维基共享资源",
    license: "见来源页",
    fresh: true,
    mood: "夜色",
    palette: ["#e7eef4", "#7f8b98", "#14181c"],
  },
  {
    id: "station",
    title: "湖区列车",
    category: "城市",
    blurb: "Léman Express 进站。月台、车门和很短的停留。",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Arriv%C3%A9e_en_gare_du_L%C3%A9man_Express_pour_Coppet_%282019-12-16%29.webm",
    source: "https://commons.wikimedia.org/wiki/File:Arriv%C3%A9e_en_gare_du_L%C3%A9man_Express_pour_Coppet_(2019-12-16).webm",
    credit: "维基共享资源",
    license: "见来源页",
    mood: "公路",
    palette: ["#c5ccd4", "#3e4a58", "#121416"],
  },
  {
    id: "candle",
    title: "蓝烛",
    category: "实验",
    blurb: "一支蓝色蜡烛。几乎没有景别变化，光自己在动。",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Blue_candle_burning.webm",
    source: "https://commons.wikimedia.org/wiki/File:Blue_candle_burning.webm",
    credit: "维基共享资源",
    license: "见来源页",
    mood: "烛火",
    palette: ["#8eb7ff", "#243056", "#101018"],
  },
  {
    id: "rain",
    title: "雨中的岸",
    category: "城市",
    blurb: "亨利·皮蒂尔国家公园边上的雨。叶子和水面一起响。",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/23/Caracolera_en_la_lluvia_a_orillas_del_parque_nacional_Henri_Pittier.webm",
    source: "https://commons.wikimedia.org/wiki/File:Caracolera_en_la_lluvia_a_orillas_del_parque_nacional_Henri_Pittier.webm",
    credit: "维基共享资源",
    license: "见来源页",
    mood: "海岸",
    palette: ["#9ec4b0", "#2a4038", "#101412"],
  },
  {
    id: "window",
    title: "小窗样片",
    category: "实验",
    blurb: "W3C 媒体示例里的小尺寸样片，用来确认播放器在短文件上也能拖动进度。",
    src: "https://media.w3.org/2010/05/video/movie_300.mp4",
    source: "https://www.w3.org/2010/05/video/mediaevents.html",
    credit: "W3C 媒体示例",
    license: "示例用途",
    mood: "烛火",
    palette: ["#d0b48a", "#5a4030", "#16120e"],
  },
];

export const featuredId = "sintel";

export function getVideo(id: string, list: VideoItem[] = videos) {
  return list.find((video) => video.id === id);
}

export function relatedVideos(id: string, count = 4, list: VideoItem[] = videos) {
  const current = getVideo(id, list);
  if (!current) return list.slice(0, count);
  const same = list.filter((video) => video.id !== id && video.category === current.category);
  const rest = list.filter((video) => video.id !== id && video.category !== current.category);
  return [...same, ...rest].slice(0, count);
}

export type Rail = {
  id: string;
  eyebrow: string;
  title: string;
  more: string;
  href: string;
  cta: string;
  ids: string[];
};

export const rails: Rail[] = [
  {
    id: "immersive",
    eyebrow: "本周放上的公开短片",
    title: "沉浸式影像",
    more: "全部短片",
    href: "/library",
    cta: "探索短片",
    ids: ["sintel", "bunny", "canyon", "harbor", "pass", "snow", "flower", "mojave", "meadow", "lightning", "moon", "candle"],
  },
  {
    id: "terrain",
    eyebrow: "水、岸和从上面看下去",
    title: "地貌与水",
    more: "全部自然",
    href: "/library?cat=自然",
    cta: "探索自然",
    ids: ["canyon", "blackfoot", "falls", "sipi", "brook", "shore", "rain", "flower", "mojave", "clouds", "pass", "harbor"],
  },
  {
    id: "night",
    eyebrow: "天暗下来之后",
    title: "夜色与余晖",
    more: "全部夜色",
    href: "/library?cat=夜色",
    cta: "探索夜色",
    ids: ["harbor", "mojave", "clouds", "moon", "snow", "candle", "lightning", "station", "rain", "flower", "sintel", "pass"],
  },
  {
    id: "roads",
    eyebrow: "跟着路走一段",
    title: "路途",
    more: "全部驾驶",
    href: "/library?cat=驾驶",
    cta: "探索路途",
    ids: ["pass", "clouds", "station", "snow", "rain", "shore", "blackfoot", "bunny", "canyon", "meadow", "harbor", "falls"],
  },
  {
    id: "light",
    eyebrow: "光自己在动的那些",
    title: "光与实验",
    more: "全部实验",
    href: "/library?cat=实验",
    cta: "探索实验",
    ids: ["candle", "lightning", "flower", "window", "moon", "mojave", "harbor", "sintel", "brook", "falls", "meadow", "clouds"],
  },
];

export function videosByIds(ids: string[], list: VideoItem[] = videos) {
  return ids.map((id) => getVideo(id, list)).filter((video): video is VideoItem => Boolean(video));
}

export function filterVideos(options: { q?: string; cat?: string; sort?: string }, source: VideoItem[] = videos) {
  const q = options.q?.trim().toLowerCase() ?? "";
  const cat = options.cat && options.cat !== "全部" ? options.cat : "";
  let list = source.filter((video) => {
    if (cat && video.category !== cat && video.mood !== cat) return false;
    if (!q) return true;
    const haystack = [video.title, video.category, video.mood, video.blurb, video.credit].join(" ").toLowerCase();
    return haystack.includes(q);
  });
  if (options.sort === "title") {
    list = [...list].sort((a, b) => a.title.localeCompare(b.title, "zh"));
  } else {
    list = [...list].sort((a, b) => Number(Boolean(b.fresh)) - Number(Boolean(a.fresh)));
  }
  return list;
}

export const moods = [
  { title: "静下来看", note: "夜色", href: "/library?cat=夜色", cover: "harbor" },
  { title: "从天上看", note: "航拍", href: "/library?q=航拍", cover: "canyon" },
  { title: "跟着路走", note: "公路", href: "/library?cat=驾驶", cover: "pass" },
  { title: "只看动画", note: "动画", href: "/library?cat=动画", cover: "bunny" },
  { title: "水与岸", note: "海岸", href: "/library?q=海岸", cover: "shore" },
  { title: "一小簇光", note: "烛火", href: "/library?q=烛火", cover: "candle" },
];
