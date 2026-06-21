import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";
import SectionWatermark from "@/components/SectionWatermark";

gsap.registerPlugin(ScrollTrigger);

const tags = ["PHP", "HTML5", "CSS3", "JavaScript", "Java", "C", "独立开发", "全栈"];

export default function About() {
  const root = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 头像入场 + 边框光晕
      gsap.fromTo(
        "[data-portrait]",
        { opacity: 0, scale: 0.85, filter: "blur(20px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );

      // 标题
      gsap.fromTo(
        "[data-about-title]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-about-title]", start: "top 85%" },
        }
      );

      // 段落
      gsap.fromTo(
        "[data-about-line]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-about-text]", start: "top 80%" },
        }
      );

      // 标签
      gsap.fromTo(
        "[data-tag]",
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: "[data-tags]", start: "top 85%" },
        }
      );

      // 关键数据计数动画
      const stats = [7, 6, 8];
      stats.forEach((target, i) => {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          delay: i * 0.15,
          scrollTrigger: { trigger: "[data-stat-num]", start: "top 85%" },
          onUpdate: () => {
            const el = root.current?.querySelector(`[data-stat-num="${i}"]`);
            if (el) el.textContent = String(Math.round(obj.v));
          },
        });
      });

      // 头像 hover 视差
      const onMove = (e: MouseEvent) => {
        if (!portraitRef.current) return;
        const rect = portraitRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        gsap.to(portraitRef.current, {
          rotateY: x * 8,
          rotateX: -y * 8,
          duration: 0.6,
          ease: "power2.out",
        });
      };
      const onLeave = () => {
        gsap.to(portraitRef.current, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.4)",
        });
      };
      const node = portraitRef.current;
      node?.addEventListener("mousemove", onMove);
      node?.addEventListener("mouseleave", onLeave);

      return () => {
        node?.removeEventListener("mousemove", onMove);
        node?.removeEventListener("mouseleave", onLeave);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="about"
      className="relative py-24 lg:py-40 bg-ink-950 bg-noise overflow-hidden"
    >
      <SectionWatermark num="02" className="top-10 right-4 lg:right-10" />
      <div className="container relative">
        {/* 章节标号 */}
        <div className="flex items-center gap-4 mb-12 lg:mb-20">
          <span className="text-xs font-mono text-acid">02</span>
          <span className="w-12 h-px bg-bone-50/20" />
          <span className="text-xs font-mono uppercase tracking-widest text-ash">
            About — 关于
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* 头像 */}
          <div className="lg:col-span-5">
            <div
              data-portrait
              ref={portraitRef}
              className="relative aspect-[4/5] max-w-md mx-auto"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              {/* 边框光晕 */}
              <div className="absolute -inset-2 border border-acid/30" />
              <div className="absolute -inset-4 border border-bone-50/5" />

              {/* 图片容器 */}
              <div className="relative w-full h-full overflow-hidden bg-ink-800">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />

                {/* 角标 */}
                <div className="absolute top-4 left-4 text-xs font-mono text-acid">
                  ● {profile.available ? "AVAILABLE" : "BUSY"}
                </div>
                <div className="absolute bottom-4 right-4 text-xs font-mono text-bone-50/60">
                  {profile.nameEn.toUpperCase()}
                </div>
              </div>

              {/* 装饰角标 */}
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-acid" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-acid" />
            </div>
          </div>

          {/* 文字 */}
          <div className="lg:col-span-7" data-about-text>
            <h2
              data-about-title
              data-parallax
              className="font-display text-display font-medium leading-tight tracking-tight mb-8"
            >
              一个人,也能构建
              <br />
              <span className="italic text-acid">完整的数字生态</span>。
            </h2>

            <div className="space-y-4 text-base lg:text-lg text-bone-100 leading-relaxed max-w-2xl">
              <p data-about-line className="reveal">
                {profile.bioLong}
              </p>
              <p data-about-line className="reveal text-ash">
                {profile.slogan} — 这不仅是一句口号,更是每一行代码背后的信念。从第一个 HTML 页面到 7 个线上站点,始终相信独立开发的力量。
              </p>
            </div>

            {/* 标签 */}
            <div data-tags className="mt-10 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  data-tag
                  className="px-3 py-1.5 border border-bone-50/15 text-xs font-mono text-bone-100 hover:border-acid hover:text-acid transition-colors duration-300 cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* 关键数据 */}
            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-bone-50/10">
              {[
                { v: 7, suffix: "", l: "线上站点" },
                { v: 6, suffix: "+", l: "技术栈" },
                { v: 8, suffix: "+", l: "年经验" },
              ].map((s, i) => (
                <div key={i} data-about-line className="reveal group/stat">
                  <div className="font-display text-3xl lg:text-4xl font-semibold text-acid">
                    <span data-stat-num={i}>0</span>
                    <span className="text-acid">{s.suffix}</span>
                  </div>
                  <div className="text-xs font-mono text-ash uppercase tracking-wider mt-1">
                    {s.l}
                  </div>
                  <div className="mt-2 h-px w-0 group-hover/stat:w-full bg-acid/40 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
