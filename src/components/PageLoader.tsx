import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * 页面加载幕 — 数字计数 + 幕布上滑
 * 设计原则:掩盖首屏资源加载,建立"精心制作"的第一印象
 */
export default function PageLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const counter = counterRef.current;
    if (!root || !counter) return;

    const obj = { v: 0 };
    const tl = gsap.timeline();

    tl.fromTo(
      "[data-loader-bar]",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.6,
        ease: "power2.inOut",
        transformOrigin: "left",
      },
      0
    );
    tl.to(obj, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        counter.textContent = String(Math.round(obj.v)).padStart(3, "0");
      },
    }, 0)
      .to("[data-loader-content]", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
      }, "+=0.2")
      .to(root, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => setDone(true),
      }, "-=0.1");

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10000] bg-ink-950 flex flex-col items-center justify-center"
    >
      <div data-loader-content className="flex flex-col items-center gap-6">
        <div className="text-xs font-mono uppercase tracking-widest text-ash">
          Loading Portfolio
        </div>
        <div className="font-display text-7xl lg:text-9xl font-black tabular-nums text-bone-50">
          <span ref={counterRef}>000</span>
          <span className="text-acid">%</span>
        </div>
        <div className="w-48 h-px bg-bone-50/10 overflow-hidden">
          <div
            data-loader-bar
            className="h-full bg-acid origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
