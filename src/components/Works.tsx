import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { works } from "@/data/profile";
import { useIsTouch } from "@/hooks/useDeviceTier";

gsap.registerPlugin(ScrollTrigger);

function WorkCard({ work, index }: { work: typeof works[number]; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const isTouch = useIsTouch();

  // hover 3D 倾斜
  useEffect(() => {
    if (isTouch || !cardRef.current) return;
    const node = cardRef.current;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(node, {
        rotateY: x * 6,
        rotateX: -y * 6,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(node, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
      });
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [isTouch]);

  return (
    <a
      ref={cardRef}
      href={work.link}
      target="_blank"
      rel="noopener noreferrer"
      data-work-card
      className="group relative block tilt-card"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 封面 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-800 border border-bone-50/10 group-hover:border-acid/40 transition-colors duration-500">
        <img
          src={work.cover}
          alt={work.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

        {/* 年份 */}
        <div className="absolute top-4 left-4 text-xs font-mono text-acid">
          {work.year}
        </div>

        {/* 角标 */}
        <div className="absolute top-4 right-4 w-8 h-8 border border-bone-50/30 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-acid group-hover:bg-acid group-hover:text-ink-950 transition-all duration-300">
          <ArrowUpRight size={14} />
        </div>

        {/* 角色 */}
        <div className="absolute bottom-4 left-4 text-xs font-mono text-bone-50/70 uppercase tracking-wider">
          {work.role}
        </div>
      </div>

      {/* 文字 */}
      <div className="mt-5 px-1">
        <h3 className="font-display text-xl lg:text-2xl font-medium text-bone-50 group-hover:text-acid transition-colors duration-300">
          {work.title}
        </h3>
        <p className="mt-2 text-sm text-ash leading-relaxed line-clamp-2">
          {work.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {work.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-bone-50/50 border border-bone-50/10"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* 编号 */}
      <div className="absolute -top-6 -right-2 text-5xl lg:text-7xl font-display font-900 text-bone-50/5 group-hover:text-acid/10 transition-colors duration-500 pointer-events-none">
        {String(index + 1).padStart(2, "0")}
      </div>
    </a>
  );
}

export default function Works() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题
      gsap.fromTo(
        "[data-works-title]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      // 卡片入场
      gsap.fromTo(
        "[data-work-card]",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-works-grid]", start: "top 80%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="works"
      className="relative py-24 lg:py-40 bg-ink-950 bg-noise overflow-hidden"
    >
      <div className="container">
        {/* 章节标号 */}
        <div className="flex items-center gap-4 mb-12 lg:mb-20">
          <span className="text-xs font-mono text-acid">04</span>
          <span className="w-12 h-px bg-bone-50/20" />
          <span className="text-xs font-mono uppercase tracking-widest text-ash">
            Works — 精选作品
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-24">
          <h2
            data-works-title
            className="font-display text-display font-medium leading-tight tracking-tight max-w-3xl"
          >
            每个作品都是一次
            <span className="italic text-acid"> 系统性回答</span>。
          </h2>
          <p className="text-sm text-ash max-w-xs">
            从需求拆解到架构落地,从交互细节到性能调优 — 完整闭环。
          </p>
        </div>

        {/* 作品网格 */}
        <div
          data-works-grid
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          {works.map((w, i) => (
            <WorkCard key={w.id} work={w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
