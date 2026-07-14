import { motion, useReducedMotion } from "motion/react";
import {
  Cpu,
  Gauge,
  Orbit,
  Radio,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import technicalSkills from "../../content/skillsTechnical.json";
import GaugeCard from "./GaugeCard";
import SkillExplanation from "./SkillExplanation";
import useGaugeAnimation from "./useGaugeAnimation";

function getDashboardMetrics(skills) {
  if (!skills.length) {
    return {
      average: 0,
      strongestSkill: null,
    };
  }

  const total = skills.reduce(
    (accumulator, skill) => accumulator + skill.level,
    0,
  );

  const strongestSkill = skills.reduce(
    (currentStrongest, skill) =>
      skill.level > currentStrongest.level
        ? skill
        : currentStrongest,
    skills[0],
  );

  return {
    average: Math.round(total / skills.length),
    strongestSkill,
  };
}

function SkillsDashboardIsland() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  const {
    containerRef,
    hasStarted,
  } = useGaugeAnimation(prefersReducedMotion);

  const dashboardMetrics = useMemo(
    () => getDashboardMetrics(technicalSkills),
    [],
  );

  const selectedSkill =
    technicalSkills.find(
      (skill) => skill.id === selectedSkillId,
    ) ?? null;

  useEffect(() => {
    if (!selectedSkillId) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedSkillId(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedSkillId]);

  return (
    <div className="relative mx-auto w-full max-w-368 px-6 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-20">
      <div
        aria-hidden="true"
        className="absolute left-[8%] top-32 size-80 rounded-full bg-cyan-electric/[0.035] blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-32 right-[8%] size-64 rounded-full bg-magenta-glitch/2 blur-[110px]"
      />

      <motion.header
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                y: 22,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full border border-cyan-electric/20 bg-cyan-electric/5.5 text-cyan-electric">
            <Orbit
              aria-hidden="true"
              className="size-4"
            />
          </span>

          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-electric">
            Aerospace control interface
          </p>
        </div>

        <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div>
            <h2
              id="habilidades-title"
              className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl lg:text-6xl"
            >
              Panel de Control Aeroespacial
            </h2>

            <p className="mt-6 max-w-2xl text-base font-light leading-8 text-foreground/58 sm:text-lg">
              Una lectura visual de las tecnologías, herramientas
              y conocimientos que forman mi perfil como
              desarrollador Full Stack.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-[1.4rem] border border-white/10 bg-white/2.5 p-2">
            <div className="rounded-xl bg-background/55 px-4 py-3">
              <span className="block font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground/35">
                Modules
              </span>

              <span className="mt-1 block font-mono text-lg font-semibold text-cyan-electric">
                {technicalSkills.length}
              </span>
            </div>

            <div className="rounded-xl bg-background/55 px-4 py-3">
              <span className="block font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground/35">
                Average
              </span>

              <span className="mt-1 block font-mono text-lg font-semibold text-cyan-electric">
                {dashboardMetrics.average}%
              </span>
            </div>

            <div className="rounded-xl bg-background/55 px-4 py-3">
              <span className="block font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground/35">
                Peak
              </span>

              <span className="mt-1 block truncate font-mono text-sm font-semibold text-cyan-electric">
                {dashboardMetrics.strongestSkill?.name ?? "N/A"}
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      <div
        role="tablist"
        aria-label="Categorías de habilidades"
        className="relative mt-12 flex flex-col gap-3 rounded-[1.4rem] border border-white/10 bg-white/2.5 p-2 sm:flex-row"
      >
        <button
          id="technical-knowledge-tab"
          type="button"
          role="tab"
          aria-selected="true"
          aria-controls="technical-knowledge-panel"
          className="flex min-h-14 flex-1 items-center justify-between gap-4 rounded-xl border border-cyan-electric/25 bg-cyan-electric/[0.07] px-5 text-left text-cyan-electric"
        >
          <span className="flex items-center gap-3">
            <Cpu
              aria-hidden="true"
              className="size-4"
            />

            <span className="font-mono text-xs uppercase tracking-[0.17em]">
              Technical Knowledge
            </span>
          </span>

          <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em]">
            Online
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected="false"
          aria-disabled="true"
          disabled
          className="flex min-h-14 flex-1 cursor-not-allowed items-center justify-between gap-4 rounded-xl border border-white/7 px-5 text-left text-foreground/28"
        >
          <span className="flex items-center gap-3">
            <Radio
              aria-hidden="true"
              className="size-4"
            />

            <span className="font-mono text-xs uppercase tracking-[0.17em]">
              Soft Skills
            </span>
          </span>

          <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em]">
            Commit 06
          </span>
        </button>
      </div>

      <div
        ref={containerRef}
        id="technical-knowledge-panel"
        role="tabpanel"
        aria-labelledby="technical-knowledge-tab"
        tabIndex="0"
        className="relative mt-8 rounded-4xl border border-white/8 bg-background/25 p-3 focus-visible:outline-none sm:p-4"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 px-2 pt-2">
          <div className="flex items-center gap-3">
            <Gauge
              aria-hidden="true"
              className="size-4 text-cyan-electric"
            />

            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-foreground/42">
              Technical telemetry
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-foreground/32">
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${
                hasStarted
                  ? "bg-cyan-electric shadow-[0_0_10px_rgba(0,242,254,0.8)]"
                  : "bg-foreground/25"
              }`}
            />

            {hasStarted
              ? "Data synchronized"
              : "Awaiting viewport"}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {technicalSkills.map((skill, index) => (
            <GaugeCard
              key={skill.id}
              skill={skill}
              index={index}
              hasStarted={hasStarted}
              isSelected={selectedSkillId === skill.id}
              onSelect={setSelectedSkillId}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-6">
        <SkillExplanation
          skill={selectedSkill}
          onClose={() => setSelectedSkillId(null)}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
    </div>
  );
}

export default SkillsDashboardIsland;