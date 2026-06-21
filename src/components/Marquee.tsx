import { profile } from "@/data/profile";

/**
 * 跑马灯条 — 章节过渡装饰
 * 设计原则:用编辑级排版填充章节间隙,强化"作品序列"节奏感
 */
export default function Marquee() {
  const items = [
    "独立开发者",
    "★",
    "PHP × Java",
    "★",
    "全栈工程",
    "★",
    "7 个线上站点",
    "★",
    profile.slogan,
    "★",
  ];
  // 重复两遍以实现无缝循环
  const loop = [...items, ...items];

  return (
    <div className="relative py-6 lg:py-8 bg-ink-950 border-y border-bone-50/5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {loop.map((t, i) => (
          <span
            key={i}
            className={`mx-6 lg:mx-10 font-display text-3xl lg:text-5xl font-medium ${
              t === "★" ? "text-acid" : "text-bone-50/70"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
