import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowDown, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { useMagnetic } from "@/hooks/useMagnetic";

// 延迟加载 3D 场景,首屏先渲染文字
const HeroScene = lazy(() => import("@/components/HeroScene"));

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const ctaRef = useMagnetic<HTMLButtonElement>(0.4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      // 顶部小标签
      tl.from("[data-hero-tag]", { y: 20, opacity: 0, duration: 0.6 });
      // 主标题逐字
      tl.from(
        "[data-hero-title] .char",
        {
          y: 120,
          opacity: 0,
          rotateX: -90,
          duration: 1,
          stagger: 0.04,
        },
        "-=0.2"
      );
      // 副标题
      tl.from("[data-hero-sub]", { y: 20, opacity: 0, duration: 0.8 }, "-=0.4");
      // 描述
      tl.from("[data-hero-desc]", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5");
      // CTA
      tl.from("[data-hero-cta]", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");
      // 滚动提示
      tl.from("[data-hero-scroll]", { opacity: 0, duration: 1 }, "-=0.2");
      // 侧边竖排文字
      tl.from("[data-hero-side]", { opacity: 0, x: -10, duration: 0.8 }, "-=0.6");

      // 延迟挂载 3D
      const t = setTimeout(() => setSceneReady(true), 300);
      return () => clearTimeout(t);
    }, root);

    return () => ctx.revert();
  }, []);

  // 拆分主标题为字符
  const titleChars = profile.name.split("");

  const scrollToNext = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={root}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-ink-950"
    >
      {/* 3D 背景 */}
      <div className="absolute inset-0">
        {sceneReady && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
        {/* 渐变遮罩,保证文字可读性 */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-ink-950/60 pointer-events-none" />
      </div>

      {/* 侧边竖排装饰 */}
      <div
        data-hero-side
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-4"
      >
        <span className="w-px h-16 bg-bone-50/20" />
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-ash [writing-mode:vertical-rl] rotate-180">
          Portfolio · 2025
        </span>
        <span className="w-px h-16 bg-bone-50/20" />
      </div>

      {/* 右侧竖排社交 */}
      <div
        data-hero-side
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-4"
      >
        <span className="w-px h-16 bg-bone-50/20" />
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-ash [writing-mode:vertical-rl]">
          {profile.location}
        </span>
        <span className="w-px h-16 bg-bone-50/20" />
      </div>

      {/* 顶部小标签 */}
      <div className="relative z-10 container pt-28 lg:pt-32">
        <div
          data-hero-tag
          className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-ash"
        >
          <span className="w-8 h-px bg-acid" />
          <span>Portfolio · 2025</span>
          <span className="text-bone-50/30">/</span>
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-acid" />
            {profile.location}
          </span>
        </div>
      </div>

      {/* 中部主标题 */}
      <div className="relative z-10 container pb-20">
        <h1
          data-hero-title
          className="font-display font-black text-hero leading-none tracking-tightest"
          style={{ perspective: "800px" }}
        >
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden className="inline-flex">
            {titleChars.map((c, i) => (
              <span
                key={i}
                className="char inline-block hover:text-acid transition-colors duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="lg:col-span-7">
            <p
              data-hero-sub
              className="font-display text-h2 text-bone-50 font-medium italic"
            >
              {profile.title}
            </p>
            <p
              data-hero-desc
              className="mt-4 text-sm lg:text-base text-ash max-w-xl leading-relaxed"
            >
              {profile.bio}
            </p>
          </div>

          <div data-hero-cta className="lg:col-span-5 lg:flex lg:justify-end">
            <button
              ref={ctaRef}
              onClick={scrollToNext}
              data-cursor-hover
              className="group relative inline-flex items-center gap-3 px-6 py-4 bg-acid text-ink-950 overflow-hidden font-mono text-xs uppercase tracking-widest"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-bone-50">
                探索作品
              </span>
              <ArrowDown
                size={16}
                className="relative z-10 group-hover:translate-y-1 transition-transform duration-300"
              />
              <span className="absolute inset-0 bg-bone-50 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-sharp" />
            </button>
          </div>
        </div>
      </div>

      {/* 底部滚动提示 */}
      <div
        data-hero-scroll
        className="relative z-10 container pb-6 flex items-center justify-between text-xs font-mono text-ash"
      >
        <button
          onClick={scrollToNext}
          className="group flex items-center gap-3 hover:text-acid transition-colors duration-300"
          data-cursor-hover
        >
          <span className="relative w-6 h-10 border border-bone-50/30 group-hover:border-acid rounded-full flex items-start justify-center pt-2 transition-colors duration-300">
            <span className="w-px h-2 bg-acid animate-pulse" />
          </span>
          <span className="uppercase tracking-widest">Scroll</span>
        </button>
        <div className="hidden sm:block text-bone-50/40">
          {profile.nameEn.toUpperCase()} — {profile.titleEn}
        </div>
        <div className="font-mono">01 / 06</div>
      </div>
    </section>
  );
}
