import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 回到顶部浮动按钮
 * 设计原则:滚动超过一屏后出现,克制不抢眼
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollTop}
      aria-label="回到顶部"
      data-cursor-hover
      className={cn(
        "fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center",
        "border border-bone-50/20 bg-ink-950/80 backdrop-blur-sm",
        "hover:border-acid hover:bg-acid hover:text-ink-950",
        "transition-all duration-500 ease-sharp",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ArrowUp size={18} />
    </button>
  );
}
