import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  Twitter,
  Dribbble,
  Linkedin,
  Copy,
  Check,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { profile, socialLinks } from "@/data/profile";
import { useMagnetic } from "@/hooks/useMagnetic";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  Github,
  Twitter,
  Dribbble,
  Linkedin,
};

/**
 * Canvas 流动背景 — 联系区
 * 设计原则:营造氛围,不抢内容焦点
 */
function FlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // 流动粒子
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // 流动线条
      const time = Date.now() * 0.0005;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const yBase = h * (0.3 + i * 0.2);
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= w; x += 8) {
          const y =
            yBase +
            Math.sin(x * 0.005 + time + i) * 20 +
            Math.sin(x * 0.01 + time * 1.5) * 10;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(212, 255, 58, ${0.08 - i * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 粒子
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245, 245, 240, 0.3)";
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
    />
  );
}

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const emailRef = useMagnetic<HTMLButtonElement>(0.15);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-title]",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        "[data-contact-item]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-contact-content]", start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = profile.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      ref={root}
      id="contact"
      className="relative py-24 lg:py-40 bg-ink-950 overflow-hidden"
    >
      <FlowCanvas />

      {/* 顶部渐变 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-acid/40 to-transparent" />

      <div className="container relative" data-contact-content>
        {/* 章节标号 */}
        <div className="flex items-center gap-4 mb-12 lg:mb-20">
          <span className="text-xs font-mono text-acid">06</span>
          <span className="w-12 h-px bg-bone-50/20" />
          <span className="text-xs font-mono uppercase tracking-widest text-ash">
            Contact — 联系方式
          </span>
        </div>

        <div className="max-w-5xl">
          <h2
            data-contact-title
            className="font-display text-hero font-medium leading-none tracking-tightest mb-8"
          >
            让我们
            <br />
            <span className="italic text-acid">聊聊。</span>
          </h2>

          <p
            data-contact-item
            className="text-base lg:text-lg text-ash max-w-xl mb-12 leading-relaxed"
          >
            无论是项目合作、技术咨询,还是单纯想交流创意编程 — 欢迎随时联系。通常 24 小时内回复。
          </p>

          {/* 邮箱复制 */}
          <div data-contact-item className="mb-12">
            <div className="text-xs font-mono text-ash uppercase tracking-widest mb-3">
              Email
            </div>
            <button
              ref={emailRef}
              onClick={copyEmail}
              data-cursor-hover
              className="group inline-flex items-center gap-3 lg:gap-4 font-display text-2xl lg:text-4xl font-medium text-bone-50 hover:text-acid transition-colors duration-300"
            >
              <span className="link-underline">{profile.email}</span>
              <span className="inline-flex items-center justify-center w-8 h-8 border border-bone-50/20 group-hover:border-acid group-hover:bg-acid group-hover:text-ink-950 transition-all duration-300">
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </span>
            </button>
            {copied && (
              <div className="mt-3 text-xs font-mono text-acid flex items-center gap-2">
                <span className="w-1 h-1 bg-acid rounded-full" />
                已复制到剪贴板
              </div>
            )}
          </div>

          {/* 社交链接 */}
          <div data-contact-item className="mb-16">
            <div className="text-xs font-mono text-ash uppercase tracking-widest mb-4">
              Social
            </div>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((s) => {
                const Icon = iconMap[s.icon] ?? ArrowUpRight;
                return (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-5 py-3 border border-bone-50/15 hover:border-acid hover:bg-acid hover:text-ink-950 transition-all duration-300"
                  >
                    <Icon size={18} />
                    <span className="text-xs font-mono uppercase tracking-wider">
                      {s.platform}
                    </span>
                    <span className="text-xs font-mono opacity-50 group-hover:opacity-100">
                      {s.handle}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* 状态卡 */}
          <div
            data-contact-item
            className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-bone-50/10 border border-bone-50/10"
          >
            {[
              { l: "状态", v: profile.available ? "可接洽" : "忙碌中", accent: true },
              { l: "时区", v: "UTC+8" },
              { l: "响应", v: "< 24h" },
              { l: "地点", v: profile.location },
            ].map((s) => (
              <div key={s.l} className="bg-ink-950 p-5">
                <div className="text-xs font-mono text-ash uppercase tracking-wider mb-2">
                  {s.l}
                </div>
                <div
                  className={`text-sm font-mono ${
                    s.accent ? "text-acid" : "text-bone-50"
                  }`}
                >
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="container relative mt-24 lg:mt-32 pt-8 border-t border-bone-50/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-ash">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-acid rounded-full" />
            <span>© 2025 {profile.name} · {profile.nameEn}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Built with React · Three.js · GSAP</span>
            <span className="text-bone-50/30">|</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
