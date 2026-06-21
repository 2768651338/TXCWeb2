import { cn } from "@/lib/utils";

/**
 * 大编号水印 — 章节背景装饰
 * 设计原则:用编辑级排版建立章节序列感,不干扰内容
 */
export default function SectionWatermark({
  num,
  className,
}: {
  num: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute font-display font-black text-bone-50/[0.02] select-none",
        "text-[20rem] leading-none",
        className
      )}
      aria-hidden
    >
      {num}
    </div>
  );
}
