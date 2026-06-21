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

export default function Home() {
  return (
    <div className="relative bg-ink-950">
      <PageLoader />
      <CustomCursor />
      <Navbar />
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
