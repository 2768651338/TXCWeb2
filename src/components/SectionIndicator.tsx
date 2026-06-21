import { useEffect, useState } from "react";
import { navSections } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * 侧边章节指示器 — 桌面端右侧固定,显示当前章节
 * 设计原则:提供始终可见的章节定位,不干扰内容
 */
export default function SectionIndicator() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let current = "hero";
      for (const s of navSections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          current = s.id;
          break;
        }
        if (rect.top < mid) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3">
      {navSections.map((s) => (
        <button
          key={s.id}
          onClick={() => handleClick(s.id)}
          data-cursor-hover
          aria-label={`跳转到${s.label}`}
          className="group relative flex items-center justify-center w-4 h-4"
        >
          {/* tooltip */}
          <span
            className={cn(
              "absolute right-6 whitespace-nowrap text-[10px] font-mono uppercase tracking-widest px-2 py-1 bg-ink-800 border border-bone-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
              active === s.id ? "text-acid" : "text-bone-50"
            )}
          >
            {s.index} {s.label}
          </span>
          {/* dot */}
          <span
            className={cn(
              "block rounded-full transition-all duration-300",
              active === s.id
                ? "w-2 h-2 bg-acid scale-100"
                : "w-1 h-1 bg-bone-50/30 group-hover:bg-bone-50/60 scale-100"
            )}
          />
          {/* active ring */}
          {active === s.id && (
            <span className="absolute inset-0 rounded-full border border-acid/40 animate-ping" />
          )}
        </button>
      ))}
    </div>
  );
}
