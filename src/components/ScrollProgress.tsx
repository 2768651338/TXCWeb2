import { useEffect, useRef } from "react";

/**
 * 滚动进度条 — 顶部细线,酸绿填充
 * 设计原则:提供始终可见的阅读进度感知
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (ref.current) {
        ref.current.style.transform = `scaleX(${progress / 100})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9995] h-0.5 bg-bone-50/5 pointer-events-none">
      <div
        ref={ref}
        className="h-full bg-acid origin-left scale-x-0 transition-transform duration-75 ease-out"
        style={{ boxShadow: "0 0 8px rgba(212, 255, 58, 0.6)" }}
      />
    </div>
    );
}
