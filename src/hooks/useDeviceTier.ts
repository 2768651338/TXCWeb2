import { useEffect, useState } from "react";

/**
 * 检测设备性能等级,用于 3D 粒子数量等参数分级
 * - "high": 桌面端高性能
 * - "mid": 平板/中端
 * - "low": 移动端/低端
 */
export function useDeviceTier() {
  const [tier, setTier] = useState<"high" | "mid" | "low">("high");

  useEffect(() => {
    const detect = () => {
      const w = window.innerWidth;
      const dpr = window.devicePixelRatio || 1;
      const cores = navigator.hardwareConcurrency || 4;
      // 移动端或低核数
      if (w < 768 || cores <= 4) return "low" as const;
      // 平板或中端
      if (w < 1280 || dpr > 2) return "mid" as const;
      return "high" as const;
    };
    setTier(detect());
    const onResize = () => setTier(detect());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return tier;
}

/**
 * 检测是否为触摸设备
 */
export function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  return isTouch;
}
