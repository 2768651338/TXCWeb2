import { useEffect } from "react";

/**
 * 键盘导航 — 上下方向键跳转章节
 * 设计原则:为键盘用户提供与鼠标用户同等的章节跳转体验
 */
export function useKeyboardNav(sectionIds: string[]) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // 输入框中不触发
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

      // 找到当前可见章节
      const mid = window.innerHeight / 2;
      let currentIdx = 0;
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          currentIdx = i;
          break;
        }
        if (rect.top < mid) currentIdx = i;
      }

      const nextIdx =
        e.key === "ArrowDown"
          ? Math.min(currentIdx + 1, sectionIds.length - 1)
          : Math.max(currentIdx - 1, 0);

      if (nextIdx !== currentIdx) {
        e.preventDefault();
        const target = document.getElementById(sectionIds[nextIdx]);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sectionIds]);
}
