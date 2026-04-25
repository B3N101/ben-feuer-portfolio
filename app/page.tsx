"use client";

import { useEffect, useRef, useState } from "react";
import { Intro } from "@/components/Intro";
import { TopNav } from "@/components/TopNav";
import { SideRail } from "@/components/SideRail";
import { ScrollCue } from "@/components/ScrollCue";
import { Hero } from "@/components/Hero";
import { ProjectSection } from "@/components/ProjectSection";
import { About } from "@/components/About";
import { PROJECTS } from "@/lib/projects";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [active, setActive] = useState(0);
  const [explode, setExplode] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const p = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setScrollProgress(p);
      const total = PROJECTS.length;
      const within = Math.max(
        0,
        Math.min(total - 1, ((p - 0.12) / 0.76) * total),
      );
      setActive(Math.floor(within));
      const localP = within - Math.floor(within);
      const ex = localP < 0.5 ? localP * 2 : (1 - localP) * 2;
      setExplode(Math.max(0, Math.min(1, ex)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const handleSelect = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const targetP = 0.12 + ((i + 0.25) / PROJECTS.length) * 0.76;
    el.scrollTo({
      top: targetP * (el.scrollHeight - el.clientHeight),
      behavior: "smooth",
    });
  };

  const scrollToWork = () => handleSelect(0);

  const scrollToContact = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight - el.clientHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#07090d",
        color: "#FFFAEC",
        fontFamily: "var(--font-display), sans-serif",
        overflow: "hidden",
      }}
    >
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}

      <TopNav onWork={scrollToWork} onContact={scrollToContact} />
      <SideRail activeProject={active} onSelect={handleSelect} showContact={scrollProgress > 0.88} />

      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          zIndex: 20,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11,
          color: "rgba(255,250,236,0.6)",
          letterSpacing: "0.25em",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ color: "#4FC3FF", fontWeight: 700 }}>
          {String(active + 1).padStart(2, "0")}
        </span>
        <span style={{ opacity: 0.4 }}>/</span>
        <span style={{ opacity: 0.6 }}>
          {String(PROJECTS.length).padStart(2, "0")}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: "rgba(255,250,236,0.06)",
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: `${scrollProgress * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #4FC3FF, #FFFAEC, #FF7A1A)",
            transition: "width 100ms linear",
          }}
        />
      </div>

      <div
        ref={scrollRef}
        style={{
          position: "absolute",
          inset: 0,
          overflowY: "auto",
          scrollSnapType: "y mandatory",
        }}
      >
        <Hero onViewWork={scrollToWork} />
        {PROJECTS.map((p, i) => (
          <ProjectSection
            key={p.id}
            project={p}
            explode={active === i ? explode : 0}
          />
        ))}
        <About />
      </div>

      <ScrollCue visible={scrollProgress < 0.05} />
    </div>
  );
}
