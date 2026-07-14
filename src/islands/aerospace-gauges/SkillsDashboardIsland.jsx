import { motion, useReducedMotion } from "motion/react";
import {
  Cpu,
  Gauge,
  Orbit,
  Radio,
} from "lucide-react";
import { useEffect, useState } from "react";

import softSkills from "../../content/skillsSoft.json";
import technicalSkills from "../../content/skillsTechnical.json";
import GaugeCard from "./GaugeCard";
import SkillExplanation from "./SkillExplanation";
import useGaugeAnimation from "./useGaugeAnimation";

const skillCategories = {
  technical: {
    id: "technical",
    tabId: "technical-knowledge-tab",
    panelId: "technical-knowledge-panel",
    explanationId: "technical-skill-explanation",
    label: "Technical Knowledge",
    status: "Online",
    categoryCode: "TK",
    gaugeIdPrefix: "technical",
    telemetryLabel: "Technical telemetry",
    analysisLabel: "Technical analysis",
    emptyMessage:
      "Selecciona uno de los indicadores para conocer cómo se aplica esa tecnología dentro de los proyectos de Sebastián.",
    description:
      "Tecnologías, lenguajes y herramientas que forman mi perfil como desarrollador Full Stack.",
    icon: Cpu,
    skills: technicalSkills,
  },

  soft: {
    id: "soft",
    tabId: "soft-skills-tab",
    panelId: "soft-skills-panel",
    explanationId: "soft-skill-explanation",
    label: "Soft Skills",
    status: "Online",
    categoryCode: "SS",
    gaugeIdPrefix: "soft",
    telemetryLabel: "Human telemetry",
    analysisLabel: "Behavioral analysis",
    emptyMessage:
      "Selecciona uno de los indicadores para conocer cómo esta habilidad contribuye al trabajo individual y en equipo.",
    description:
      "Capacidades humanas que acompañan mi crecimiento técnico y mi participación dentro de equipos de desarrollo.",
    icon: Radio,
    skills: softSkills,
  },
};

const categoryIds = Object.keys(skillCategories);

function getDashboardMetrics(skills) {
  if (!skills.length) {
    return {
      average: 0,
      strongestSkill: null,
    };
  }

  const total = skills.reduce(
    (accumulator, skill) =>
      accumulator + skill.level,
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
  const prefersReducedMotion = Boolean(
    useReducedMotion(),
  );

  const [activeCategoryId, setActiveCategoryId] =
    useState("technical");

  const [selectedSkillId, setSelectedSkillId] =
    useState(null);

  const [gaugeReplayTokens, setGaugeReplayTokens] =
    useState({});

  const {
    containerRef,
    hasStarted,
  } = useGaugeAnimation(prefersReducedMotion);

  const activeCategory =
    skillCategories[activeCategoryId];

  const dashboardMetrics = getDashboardMetrics(
    activeCategory.skills,
  );

  const selectedSkill =
    activeCategory.skills.find(
      (skill) => skill.id === selectedSkillId,
    ) ?? null;

  const handleCategoryChange = (
    categoryId,
    shouldFocus = false,
  ) => {
    const nextCategory = skillCategories[categoryId];

    if (!nextCategory) {
      return;
    }

    setActiveCategoryId(categoryId);
    setSelectedSkillId(null);

    if (shouldFocus) {
      window.requestAnimationFrame(() => {
        document
          .getElementById(nextCategory.tabId)
          ?.focus();
      });
    }
  };

  const handleTabKeyDown = (
    event,
    categoryId,
  ) => {
    const currentIndex =
      categoryIds.indexOf(categoryId);

    let nextIndex;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();

        nextIndex =
          (currentIndex + 1) %
          categoryIds.length;
        break;

      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();

        nextIndex =
          (
            currentIndex -
            1 +
            categoryIds.length
          ) % categoryIds.length;
        break;

      case "Home":
        event.preventDefault();
        nextIndex = 0;
        break;

      case "End":
        event.preventDefault();
        nextIndex = categoryIds.length - 1;
        break;

      default:
        return;
    }

    handleCategoryChange(
      categoryIds[nextIndex],
      true,
    );
  };

  const handleSkillSelect = (skillId) => {
    const replayKey =
      `${activeCategoryId}:${skillId}`;

    setSelectedSkillId(skillId);

    setGaugeReplayTokens((currentTokens) => ({
      ...currentTokens,
      [replayKey]:
        (currentTokens[replayKey] ?? 0) + 1,
    }));
  };

  useEffect(() => {
    if (!selectedSkillId) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedSkillId(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
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
          duration:
            prefersReducedMotion ? 0 : 0.65,
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
              {activeCategory.description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-[1.4rem] border border-white/10 bg-white/2.5 p-2">
            <div className="rounded-xl bg-background/55 px-4 py-3">
              <span className="block font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground/35">
                Modules
              </span>

              <span className="mt-1 block font-mono text-lg font-semibold text-cyan-electric">
                {activeCategory.skills.length}
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

            <div className="min-w-0 rounded-xl bg-background/55 px-4 py-3">
              <span className="block font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground/35">
                Peak
              </span>

              <span className="mt-1 block truncate font-mono text-sm font-semibold text-cyan-electric">
                {dashboardMetrics.strongestSkill
                  ?.name ?? "N/A"}
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
        {categoryIds.map((categoryId) => {
          const category =
            skillCategories[categoryId];

          const CategoryIcon = category.icon;

          const isActive =
            activeCategoryId === categoryId;

          return (
            <button
              key={category.id}
              id={category.tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={category.panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() =>
                handleCategoryChange(
                  category.id,
                )
              }
              onKeyDown={(event) =>
                handleTabKeyDown(
                  event,
                  category.id,
                )
              }
              className={`flex min-h-14 flex-1 items-center justify-between gap-4 rounded-xl border px-5 text-left transition-all duration-300 ${
                isActive
                  ? "border-cyan-electric/25 bg-cyan-electric/[0.07] text-cyan-electric shadow-[0_0_22px_rgba(0,242,254,0.06)]"
                  : "border-white/7 text-foreground/35 hover:border-cyan-electric/20 hover:text-foreground/65"
              }`}
            >
              <span className="flex items-center gap-3">
                <CategoryIcon
                  aria-hidden="true"
                  className="size-4"
                />

                <span className="font-mono text-xs uppercase tracking-[0.17em]">
                  {category.label}
                </span>
              </span>

              <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em]">
                {isActive
                  ? category.status
                  : "Standby"}
              </span>
            </button>
          );
        })}
      </div>

      <div
        ref={containerRef}
        id={activeCategory.panelId}
        role="tabpanel"
        aria-labelledby={activeCategory.tabId}
        tabIndex={0}
        data-category={activeCategory.id}
        className="relative mt-8 rounded-4xl border border-white/8 bg-background/25 p-3 focus-visible:outline-none sm:p-4"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 px-2 pt-2">
          <div className="flex items-center gap-3">
            <Gauge
              aria-hidden="true"
              className="size-4 text-cyan-electric"
            />

            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-foreground/42">
              {activeCategory.telemetryLabel}
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
          {activeCategory.skills.map(
            (skill, index) => {
              const replayKey =
                `${activeCategoryId}:${skill.id}`;

              return (
                <GaugeCard
                  key={`${activeCategory.id}-${skill.id}`}
                  skill={skill}
                  index={index}
                  categoryCode={
                    activeCategory.categoryCode
                  }
                  explanationId={
                    activeCategory.explanationId
                  }
                  gaugeIdPrefix={
                    activeCategory.gaugeIdPrefix
                  }
                  telemetryLabel={
                    activeCategory.telemetryLabel
                  }
                  hasStarted={hasStarted}
                  isSelected={
                    selectedSkillId === skill.id
                  }
                  onSelect={handleSkillSelect}
                  prefersReducedMotion={
                    prefersReducedMotion
                  }
                  replayToken={
                    gaugeReplayTokens[
                      replayKey
                    ] ?? 0
                  }
                />
              );
            },
          )}
        </div>
      </div>

      <div className="relative mt-6">
        <SkillExplanation
          key={activeCategory.id}
          skill={selectedSkill}
          explanationId={
            activeCategory.explanationId
          }
          analysisLabel={
            activeCategory.analysisLabel
          }
          emptyMessage={
            activeCategory.emptyMessage
          }
          onClose={() =>
            setSelectedSkillId(null)
          }
          prefersReducedMotion={
            prefersReducedMotion
          }
        />
      </div>
    </div>
  );
}

export default SkillsDashboardIsland;