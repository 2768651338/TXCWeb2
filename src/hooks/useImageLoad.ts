import { useEffect, useRef, useState } from "react";

/**
 * 图片模糊加载 — 低质量模糊过渡到清晰
 * 设计原则:避免图片加载时的布局跳动与突兀出现
 */
export function useImageLoad(src: string) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.src = src;
    const onLoad = () => setLoaded(true);
    img.addEventListener("load", onLoad);
    return () => img.removeEventListener("load", onLoad);
  }, [src]);

  return { ref, loaded };
}
