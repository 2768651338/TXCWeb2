import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/profile";
import SectionWatermark from "@/components/SectionWatermark";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 中央竖线生长
      gsap.fromTo(
        "[data-timeline-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-timeline]",
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        }
      );

      // 节点点亮
      experiences.forEach((_, i) => {
        gsap.fromTo(
          `[data-node="${i}"]`,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: `[data-item="${i}"]`,
              start: "top 70%",
            },
          }
        );
        // 节点光晕
        gsap.fromTo(
          `[data-node-glow="${i}"]`,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.1,
            scrollTrigger: {
              trigger: `[data-item="${i}"]`,
              start: "top 70%",
            },
          }
        );
      });

      // 卡片入场
      gsap.utils.toArray<HTMLElement>("[data-timeline-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          }
        );
      });

      // 标题
      gsap.fromTo(
        "[data-timeline-title]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="timeline"
      className="relative py-24 lg:py-40 bg-ink-900 bg-noise overflow-hidden"
    >
      <SectionWatermark num="05" className="top-10 right-4 lg:right-10" />
      <div className="container relative">
        {/* 章节标号 */}
        <div className="flex items-center gap-4 mb-12 lg:mb-20">
          <span className="text-xs font-mono text-acid">05</span>
          <span className="w-12 h-px bg-bone-50/20" />
          <span className="text-xs font-mono uppercase tracking-widest text-ash">
            Timeline — 经历轨迹
          </span>
        </div>

        <h2
          data-timeline-title
          data-parallax
          className="font-display text-display font-medium leading-tight tracking-tight mb-16 lg:mb-24 max-w-3xl"
        >
          一条从<span className="italic text-acid"> 起步到独立</span>的轨迹。
        </h2>

        {/* 时间线 */}
        <div data-timeline className="relative">
          {/* 中央竖线 */}
          <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-bone-50/10">
            <div
              data-timeline-line
              className="absolute inset-0 bg-acid origin-top"
            />
          </div>

          <div className="space-y-12 lg:space-y-20">
            {experiences.map((e, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={e.id}
                  data-item={i}
                  className={`relative flex items-center ${
                    isLeft
                      ? "lg:flex-row lg:justify-start"
                      : "lg:flex-row-reverse lg:justify-start"
                  } pl-12 lg:pl-0`}
                >
                  {/* 节点 */}
                  <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 z-10">
                    <div
                      data-node-glow={i}
                      className="absolute inset-0 -m-3 rounded-full bg-acid/20 blur-md"
                    />
                    <div
                      data-node={i}
                      className="relative w-3 h-3 rounded-full bg-acid ring-4 ring-ink-900"
                    />
                  </div>

                  {/* 卡片 */}
                  <div
                    data-timeline-card
                    className={`w-full lg:w-[calc(50%-3rem)] ${
                      isLeft ? "lg:pr-12 lg:text-right" : "lg:pl-12"
                    }`}
                  >
                    <div className="group relative p-6 lg:p-8 border border-bone-50/10 hover:border-acid/40 bg-ink-950/50 hover:bg-ink-950/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1">
                      {/* hover 角标 */}
                      <div className="absolute top-0 left-0 w-0 h-px bg-acid group-hover:w-full transition-all duration-500" />
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          isLeft ? "lg:justify-end" : ""
                        }`}
                      >
                        <span className="text-xs font-mono text-acid uppercase tracking-wider">
                          {e.period}
                        </span>
                        <span className="w-8 h-px bg-acid/40" />
                      </div>
                      <h3 className="font-display text-2xl lg:text-3xl font-medium text-bone-50 mb-1 group-hover:text-acid transition-colors duration-300">
                        {e.role}
                      </h3>
                      <div className="text-sm font-mono text-ash mb-4">
                        {e.organization}
                      </div>
                      <p className="text-sm text-bone-100 leading-relaxed mb-4">
                        {e.description}
                      </p>
                      <div
                        className={`inline-flex items-center gap-2 text-xs font-mono text-acid ${
                          isLeft ? "lg:flex-row-reverse" : ""
                        }`}
                      >
                        <span className="w-1 h-1 bg-acid rounded-full group-hover:scale-150 transition-transform duration-300" />
                        {e.highlight}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
