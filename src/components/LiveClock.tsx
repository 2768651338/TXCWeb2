import { useEffect, useState } from "react";

/**
 * 实时时钟 — 显示上海当前时间
 * 设计原则:强化"在线/可接洽"的真实感,编辑级细节
 */
export default function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const fmt = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Shanghai",
      });
      setTime(fmt.format(now));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">
      {time}
      <span className="text-acid"> SHA</span>
    </span>
  );
}
