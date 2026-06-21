import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillRadar, skillList } from "@/data/profile";
import SectionWatermark from "@/components/SectionWatermark";

gsap.registerPlugin(ScrollTrigger);

/**
 * Canvas 雷达图 — 5 维度技能可视化
 * 设计原则:数据驱动,直观展示能力结构
 */
function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const hoverRef = useRef<number>(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 高 DPI 适配
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 420;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.36;
    const sides = skillRadar.length;
    const angleStep = (Math.PI * 2) / sides;

    const draw = (progress: number, hover: number) => {
      ctx.clearRect(0, 0, size, size);

      // 背景网格(5 层)
      for (let layer = 1; layer <= 5; layer++) {
        const r = (radius * layer) / 5;
        ctx.beginPath();
        for (let i = 0; i <= sides; i++) {
          const angle = -Math.PI / 2 + i * angleStep;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(245, 245, 240, ${0.04 + layer * 0.015})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 轴线 — hover 时高亮当前轴
      for (let i = 0; i < sides; i++) {
        const angle = -Math.PI / 2 + i * angleStep;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
        ctx.strokeStyle =
          hover === i ? "rgba(212, 255, 58, 0.4)" : "rgba(245, 245, 240, 0.08)";
        ctx.lineWidth = hover === i ? 1.5 : 1;
        ctx.stroke();
      }

      // 数据多边形
      ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const idx = i % sides;
        const angle = -Math.PI / 2 + idx * angleStep;
        const value = (skillRadar[idx].level / 100) * progress;
        const r = radius * value;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      // 填充
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, "rgba(212, 255, 58, 0.25)");
      grad.addColorStop(1, "rgba(212, 255, 58, 0.05)");
      ctx.fillStyle = grad;
      ctx.fill();
      // 描边
      ctx.strokeStyle = "#d4ff3a";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 数据点 — hover 时放大并加光晕
      for (let i = 0; i < sides; i++) {
        const angle = -Math.PI / 2 + i * angleStep;
        const value = (skillRadar[i].level / 100) * progress;
        const r = radius * value;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        const isHover = hover === i;
        // 光晕
        if (isHover) {
          ctx.beginPath();
          ctx.arc(x, y, 16, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(212, 255, 58, 0.15)";
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(x, y, isHover ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = "#d4ff3a";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, isHover ? 12 : 8, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(212, 255, 58, 0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 标签 — hover 时高亮
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < sides; i++) {
        const angle = -Math.PI / 2 + i * angleStep;
        const labelR = radius + 28;
        const x = cx + labelR * Math.cos(angle);
        const y = cy + labelR * Math.sin(angle);
        const isHover = hover === i;
        ctx.font = `${isHover ? "600" : "500"} ${isHover ? "13" : "12"}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = isHover ? "#d4ff3a" : "rgba(245, 245, 240, 0.7)";
        ctx.fillText(skillRadar[i].label, x, y);
        // 数值
        ctx.fillStyle = "#d4ff3a";
        ctx.font = "600 10px 'JetBrains Mono', monospace";
        ctx.fillText(
          `${Math.round(skillRadar[i].level * progress)}`,
          x,
          y + 14
        );
      }
    };

    draw(0, -1);

    // 滚动触发动画
    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: canvas,
      start: "top 75%",
      onEnter: () => {
        gsap.to(obj, {
          v: 1,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => {
            progressRef.current = obj.v;
            draw(obj.v, hoverRef.current);
          },
        });
      },
    });

    // 鼠标 hover 检测最近顶点
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      let nearest = -1;
      let minDist = 40; // 检测半径
      for (let i = 0; i < sides; i++) {
        const angle = -Math.PI / 2 + i * angleStep;
        const value = (skillRadar[i].level / 100) * progressRef.current;
        const r = radius * value;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        const dist = Math.hypot(mx - x, my - y);
        if (dist < minDist) {
          minDist = dist;
          nearest = i;
        }
      }
      if (nearest !== hoverRef.current) {
        hoverRef.current = nearest;
        draw(progressRef.current, nearest);
        canvas.style.cursor = nearest >= 0 ? "pointer" : "default";
      }
    };
    const onLeave = () => {
      hoverRef.current = -1;
      draw(progressRef.current, -1);
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      st.kill();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <canvas ref={canvasRef} className="max-w-full" />
    </div>
  );
}

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 技能条动画
      skillList.forEach((_, i) => {
        gsap.fromTo(
          `[data-skill-bar="${i}"]`,
          { width: "0%" },
          {
            width: `${skillList[i].level}%`,
            duration: 1.4,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: "[data-skills-list]", start: "top 75%" },
          }
        );
        // 末端光点跟随
        gsap.fromTo(
          `[data-skill-dot="${i}"]`,
          { left: "0%", opacity: 0 },
          {
            left: `${skillList[i].level}%`,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: "[data-skills-list]", start: "top 75%" },
          }
        );
        gsap.fromTo(
          `[data-skill-num="${i}"]`,
          { textContent: 0 },
          {
            textContent: skillList[i].level,
            duration: 1.4,
            ease: "power3.out",
            delay: i * 0.08,
            snap: { textContent: 1 },
            scrollTrigger: { trigger: "[data-skills-list]", start: "top 75%" },
          }
        );
      });

      // 入场
      gsap.fromTo(
        "[data-skills-title]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        "[data-skill-item]",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-skills-list]", start: "top 75%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="skills"
      className="relative py-24 lg:py-40 bg-ink-900 bg-noise overflow-hidden"
    >
      <SectionWatermark num="03" className="top-10 right-4 lg:right-10" />
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <div className="container relative">
        {/* 章节标号 */}
        <div className="flex items-center gap-4 mb-12 lg:mb-20">
          <span className="text-xs font-mono text-acid">03</span>
          <span className="w-12 h-px bg-bone-50/20" />
          <span className="text-xs font-mono uppercase tracking-widest text-ash">
            Skills — 能力图谱
          </span>
        </div>

        <h2
          data-skills-title
          data-parallax
          className="font-display text-display font-medium leading-tight tracking-tight mb-16 lg:mb-24 max-w-3xl"
        >
          能力不是数字,而是
          <span className="italic text-acid"> 结构</span>。
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* 雷达图 */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <RadarChart />
              <div className="absolute top-0 left-0 text-xs font-mono text-ash">
                FIG.01 — CAPABILITY RADAR
              </div>
            </div>
          </div>

          {/* 技能条列表 */}
          <div className="lg:col-span-7 order-1 lg:order-2" data-skills-list>
            <div className="space-y-5">
              {skillList.map((s, i) => (
                <div key={s.name} data-skill-item className="group">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm lg:text-base font-mono text-bone-50 group-hover:text-acid transition-colors duration-300">
                      {s.name}
                    </span>
                    <span className="text-xs font-mono text-ash">
                      <span data-skill-num={i}>0</span>%
                    </span>
                  </div>
                  <div className="h-px bg-bone-50/10 relative overflow-hidden">
                    {/* 进度条 */}
                    <div
                      data-skill-bar={i}
                      className="absolute inset-y-0 left-0 bg-acid"
                      style={{ width: "0%" }}
                    />
                    {/* 末端光点 */}
                    <div
                      data-skill-dot={i}
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-acid opacity-0 shadow-[0_0_8px_2px_rgba(212,255,58,0.6)]"
                      style={{ left: "0%" }}
                    />
                    {/* 流光扫过 */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-acid/40 to-transparent animate-marquee" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 图例 */}
            <div className="mt-12 pt-8 border-t border-bone-50/10 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-ash">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-acid" /> 当前熟练度
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 border border-bone-50/30" /> 评估基准
              </span>
              <span className="ml-auto">最后更新:2025.06</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
