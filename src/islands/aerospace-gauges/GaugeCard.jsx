import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

import SkillGauge from "./SkillGauge";

function GaugeCard({
  skill,
  index,
  hasStarted,
  isSelected,
  onSelect,
  prefersReducedMotion,
  replayToken,
}) {
  const skillNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.button
      type="button"
      aria-label={`Ver información sobre ${skill.name}, nivel ${skill.level}%`}
      aria-pressed={isSelected}
      aria-describedby={
        isSelected
          ? "technical-skill-explanation"
          : undefined
      }
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              y: 24,
            }
      }
      animate={
        hasStarted
          ? {
              opacity: 1,
              y: 0,
            }
          : {
              opacity: 0,
              y: 24,
            }
      }
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.045,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -4,
            }
      }
      whileTap={
        prefersReducedMotion
          ? undefined
          : {
              scale: 0.985,
            }
      }
      onClick={() => onSelect(skill.id)}
      className={`group relative flex min-h-88 w-full flex-col overflow-hidden rounded-[1.6rem] border p-5 text-left transition-colors duration-300 focus-visible:outline-none ${
        isSelected
          ? "border-cyan-electric/45 bg-cyan-electric/[0.07] shadow-[0_20px_70px_rgba(0,242,254,0.09)]"
          : "border-white/10 bg-white/2.5 hover:border-cyan-electric/25 hover:bg-white/4.5"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-cyan-electric to-transparent transition-opacity duration-300 ${
          isSelected
            ? "opacity-90"
            : "opacity-0 group-hover:opacity-40"
        }`}
      />

      <div className="flex w-full items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cyan-electric">
            TK-{skillNumber}
          </span>

          <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground">
            {skill.name}
          </h3>
        </div>

        <span
          aria-hidden="true"
          className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            isSelected
              ? "rotate-90 border-cyan-electric bg-cyan-electric text-background"
              : "border-white/10 text-foreground/40 group-hover:border-cyan-electric/30 group-hover:text-cyan-electric"
          }`}
        >
          <ChevronRight className="size-4" />
        </span>
      </div>

      <div className="mt-5 flex flex-1 items-center">
        <SkillGauge
          skill={skill}
          hasStarted={hasStarted}
          isSelected={isSelected}
          prefersReducedMotion={prefersReducedMotion}
          replayToken={replayToken}
        />
      </div>

      <div className="mt-3 flex w-full items-center justify-between border-t border-white/7 pt-4">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-foreground/32">
          Skill telemetry
        </span>

        <span
          className={`font-mono text-[0.58rem] uppercase tracking-[0.18em] transition-colors ${
            isSelected
              ? "text-cyan-electric"
              : "text-foreground/38"
          }`}
        >
          {isSelected ? "Selected" : "View data"}
        </span>
      </div>

      <span className="sr-only">
        {skill.name}: {skill.level} por ciento.
      </span>
    </motion.button>
  );
}

export default GaugeCard;