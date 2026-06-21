import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Works from "@/components/Works";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import PageLoader from "@/components/PageLoader";
import CustomCursor from "@/components/CustomCursor";
import Marquee from "@/components/Marquee";
import ScrollToTop from "@/components/ScrollToTop";
import SectionIndicator from "@/components/SectionIndicator";
import ScrollProgress from "@/components/ScrollProgress";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";

gsap.registerPlugin(ScrollTrigger);

const sections = ["hero", "about", "skills", "works", "timeline", "contact"];

export default function Home() {
  useKeyboardNav(sections);

  // 章节标题视差效果
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          x: -30,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-ink-950">
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      {/* 页面级颗粒覆盖 */}
      <div className="page-grain" aria-hidden />
      {/* 无障碍:跳转到主内容 */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:px-4 focus:py-2 focus:bg-acid focus:text-ink-950 focus:font-mono focus:text-xs"
      >
        跳转到主内容
      </a>
      <Navbar />
      <SectionIndicator />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Works />
        <Timeline />
        <Contact />
      </main>
      <ScrollToTop />
    </div>
  );
}
