import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * 自定义光标 — 桌面端混合模式圆点 + 跟随圆环
 * 设计原则:强化"可交互"元素的视觉反馈,不干扰阅读
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 触摸设备/小屏不启用
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.innerWidth < 1024) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    // hover 可交互元素时圆环放大
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-hover]")) {
        gsap.to(ring, {
          scale: 2.2,
          borderColor: "#d4ff3a",
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 0, duration: 0.3 });
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-hover]")) {
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(245, 245, 240, 0.4)",
          duration: 0.4,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };

    // 鼠标按下/松开
    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3 });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div className="hidden lg:block">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-acid pointer-events-none mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] w-10 h-10 rounded-full border pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
          borderColor: "rgba(245, 245, 240, 0.4)",
        }}
      />
    </div>
  );
}
