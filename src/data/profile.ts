// 个人信息数据源 — 单一可信源,所有组件从此读取

export interface Profile {
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  bio: string;
  bioLong: string;
  avatar: string;
  email: string;
  location: string;
  available: boolean;
}

export interface SkillCategory {
  category: string;
  label: string;
  level: number; // 0-100,用于雷达图
}

export interface SkillItem {
  name: string;
  level: number; // 0-100,用于技能条
  category: SkillCategory["category"];
}

export interface Work {
  id: string;
  title: string;
  year: string;
  description: string;
  cover: string;
  tags: string[];
  link: string;
  role: string;
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  organization: string;
  description: string;
  highlight: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // lucide icon name
  handle: string;
}

export const profile: Profile = {
  name: "林深",
  nameEn: "Lin Shen",
  title: "全栈工程师 / 创意开发者",
  titleEn: "Engineer × Creative Developer",
  bio: "在代码与设计的交叉地带工作,用工程思维实现审美表达。",
  bioLong:
    "六年全栈开发经验,专注于交互式 Web 体验、数据可视化与创意编程。相信好的产品诞生于工程严谨性与审美敏感性的对话之中。曾主导多个百万级用户产品的前端架构,作品获 Awwwards SOTD 与 FWA 提名。",
  avatar:
    "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Portrait%20of%20an%20Asian%20male%20developer%2C%20dark%20background%2C%20cinematic%20lighting%2C%20minimal%20style%2C%20high%20contrast%2C%20professional%20headshot&image_size=portrait_4_3",
  email: "linshen@studio.dev",
  location: "上海 · Shanghai",
  available: true,
};

// 雷达图 5 维度
export const skillRadar: SkillCategory[] = [
  { category: "frontend", label: "前端工程", level: 95 },
  { category: "backend", label: "后端架构", level: 82 },
  { category: "design", label: "设计审美", level: 88 },
  { category: "creative", label: "创意编程", level: 90 },
  { category: "system", label: "系统设计", level: 78 },
];

// 技能条列表
export const skillList: SkillItem[] = [
  { name: "React / Next.js", level: 95, category: "frontend" },
  { name: "TypeScript", level: 92, category: "frontend" },
  { name: "Three.js / WebGL", level: 88, category: "creative" },
  { name: "GSAP / Motion", level: 90, category: "creative" },
  { name: "Node.js / Express", level: 82, category: "backend" },
  { name: "PostgreSQL / Redis", level: 78, category: "backend" },
  { name: "Figma / Design System", level: 85, category: "design" },
  { name: "Docker / CI", level: 75, category: "system" },
];

export const works: Work[] = [
  {
    id: "w1",
    title: "Aurora 数据中枢",
    year: "2025",
    role: "Lead Engineer",
    description:
      "为金融科技公司搭建的实时数据可视化平台,处理日均 2 亿条事件流,WebGL 渲染百万级数据点。",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Abstract%20dark%20UI%20dashboard%20with%20glowing%20acid%20green%20data%20visualization%20charts%2C%20cyberpunk%20style%2C%20cinematic%20lighting&image_size=landscape_4_3",
    tags: ["React", "WebGL", "D3", "WebSocket"],
    link: "#",
  },
  {
    id: "w2",
    title: "Monolith 品牌站",
    year: "2024",
    role: "Creative Developer",
    description:
      "独立设计工作室品牌官网,获 Awwwards SOTD。Three.js 实现的几何形态过渡贯穿全站滚动叙事。",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Minimalist%20brand%20website%20with%20geometric%20white%20monolith%20on%20black%20background%2C%20editorial%20design%2C%20dramatic%20lighting&image_size=landscape_4_3",
    tags: ["Three.js", "GSAP", "Lenis", "Brand"],
    link: "#",
  },
  {
    id: "w3",
    title: "Pulse 音乐播放器",
    year: "2024",
    role: "Full-stack",
    description:
      "基于 Web Audio API 的可视化播放器,实时频谱分析与粒子系统联动,支持 50 万曲库。",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Music%20player%20interface%20with%20audio%20waveform%20visualization%20in%20acid%20green%20on%20dark%20background%2C%20modern%20minimal%20design&image_size=landscape_4_3",
    tags: ["Web Audio", "Canvas", "React", "Node"],
    link: "#",
  },
  {
    id: "w4",
    title: "Terra 地图引擎",
    year: "2023",
    role: "Tech Lead",
    description:
      "自研矢量地图渲染引擎,基于 WebGL2 实现瓦片动态加载与样式热更新,性能优于 Mapbox 30%。",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Dark%20themed%20map%20rendering%20with%20glowing%20route%20lines%20and%20city%20grid%2C%20tech%20visualization%2C%20topographic%20style&image_size=landscape_4_3",
    tags: ["WebGL2", "GIS", "Rust/WASM", "Performance"],
    link: "#",
  },
  {
    id: "w5",
    title: "Echo 协作白板",
    year: "2023",
    role: "Frontend Lead",
    description:
      "实时多人协作白板,CRDT 算法保证一致性,支持千人同房间,被三家上市公司采购。",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Collaborative%20whiteboard%20with%20colorful%20sticky%20notes%20and%20connection%20lines%20on%20dark%20canvas%2C%20modern%20UI%2C%20clean%20design&image_size=landscape_4_3",
    tags: ["CRDT", "WebSocket", "Canvas", "React"],
    link: "#",
  },
  {
    id: "w6",
    title: "Lumen 摄影集",
    year: "2022",
    role: "Solo Project",
    description:
      "个人摄影作品集,ScrollTrigger 驱动的视差叙事,被 Codrops 收录为精选案例。",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Photography%20portfolio%20website%20with%20large%20dramatic%20black%20and%20white%20portrait%2C%20editorial%20layout%2C%20minimal%20aesthetic&image_size=landscape_4_3",
    tags: ["GSAP", "Lenis", "Photography", "Solo"],
    link: "#",
  },
];

export const experiences: Experience[] = [
  {
    id: "e1",
    period: "2023 — 至今",
    role: "高级前端架构师",
    organization: "Aurora Labs",
    description: "负责数据可视化产品线架构,带领 8 人前端团队,推动设计系统与工程规范落地。",
    highlight: "主导百万级数据 WebGL 渲染方案,性能提升 4 倍",
  },
  {
    id: "e2",
    period: "2021 — 2023",
    role: "创意开发工程师",
    organization: "Monolith Studio",
    description: "为奢侈品牌与文化机构打造交互式 Web 体验,作品获国际奖项 5 项。",
    highlight: "Awwwards SOTD × 2 / FWA 提名 × 1",
  },
  {
    id: "e3",
    period: "2019 — 2021",
    role: "全栈工程师",
    organization: "Pulse Inc.",
    description: "从 0 到 1 搭建音乐流媒体平台,服务 50 万付费用户,完成 A 轮技术对接。",
    highlight: "架构支持 50 万 DAU,获 A 轮融资技术背书",
  },
  {
    id: "e4",
    period: "2018 — 2019",
    role: "前端工程师",
    organization: "Terra Maps",
    description: "参与矢量地图引擎研发,负责 WebGL 渲染层与样式系统设计。",
    highlight: "自研引擎性能超越 Mapbox 30%",
  },
];

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com", icon: "Github", handle: "@linshen" },
  { platform: "Twitter", url: "https://twitter.com", icon: "Twitter", handle: "@linshen_dev" },
  { platform: "Dribbble", url: "https://dribbble.com", icon: "Dribbble", handle: "@linshen" },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin", handle: "in/linshen" },
];

export const navSections = [
  { id: "hero", label: "首页", index: "01" },
  { id: "about", label: "关于", index: "02" },
  { id: "skills", label: "能力", index: "03" },
  { id: "works", label: "作品", index: "04" },
  { id: "timeline", label: "经历", index: "05" },
  { id: "contact", label: "联系", index: "06" },
] as const;
