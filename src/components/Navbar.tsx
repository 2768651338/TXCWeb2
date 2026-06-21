import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import { navSections, profile } from "@/data/profile";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [active, setActive] = useState<string>("hero");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ctaRef = useMagnetic<HTMLButtonElement>(0.2);

  useEffect(() => {
    // 滚动进度条
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setScrolled(h.scrollTop > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // 章节高亮
    const triggers = navSections.map((s) =>
      ScrollTrigger.create({
        trigger: `#${s.id}`,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => self.isActive && setActive(s.id),
      })
    );

    return () => {
      window.removeEventListener("scroll", onScroll);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleClick = (id: string) => {
    setOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-ink-950/80 backdrop-blur-xl border-b border-bone-50/5"
            : "bg-transparent"
        )}
      >
        <nav className="container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => handleClick("hero")}
            className="flex items-center gap-2 group"
            aria-label="返回顶部"
          >
            <span className="w-2 h-2 bg-acid rounded-full group-hover:scale-150 transition-transform duration-300" />
            <span className="font-display text-lg font-semibold tracking-tight">
              {profile.name}
            </span>
            <span className="hidden sm:inline text-xs text-ash font-mono">
              / {profile.nameEn}
            </span>
          </button>

          {/* 桌面端导航 */}
          <ul className="hidden md:flex items-center gap-1">
            {navSections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => handleClick(s.id)}
                  className={cn(
                    "px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors duration-300 flex items-center gap-1.5",
                    active === s.id
                      ? "text-acid"
                      : "text-ash hover:text-bone-50"
                  )}
                >
                  <span className="text-[10px] opacity-50">{s.index}</span>
                  {s.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + 移动端按钮 */}
          <div className="flex items-center gap-3">
            <button
              ref={ctaRef}
              onClick={() => handleClick("contact")}
              data-cursor-hover
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 border border-bone-50/20 hover:border-acid hover:bg-acid hover:text-ink-950 text-xs font-mono uppercase tracking-wider transition-all duration-300"
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  profile.available ? "bg-acid animate-pulse" : "bg-ash"
                )}
              />
              {profile.available ? "可接洽" : "忙碌中"}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-bone-50"
              aria-label="切换菜单"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* 进度条 */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-bone-50/5">
          <div
            className="h-full bg-acid transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* 移动端菜单 */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-xl transition-all duration-500 md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-2">
          {navSections.map((s, i) => (
            <li key={s.id}>
              <button
                onClick={() => handleClick(s.id)}
                className="flex items-center gap-3 py-3 group"
              >
                <span className="text-xs text-ash font-mono">{s.index}</span>
                <span
                  className={cn(
                    "font-display text-4xl transition-colors duration-300",
                    active === s.id ? "text-acid" : "text-bone-50 group-hover:text-acid"
                  )}
                >
                  {s.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
