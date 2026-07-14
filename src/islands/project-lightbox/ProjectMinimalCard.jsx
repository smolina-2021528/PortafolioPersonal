import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

function getStatusStyles(status) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus.includes("desarrollo")) {
    return {
      dot: "bg-magenta-glitch shadow-[0_0_12px_rgba(255,0,127,0.65)]",
      text: "text-magenta-glitch",
    };
  }

  if (normalizedStatus.includes("npm")) {
    return {
      dot: "bg-cyan-electric shadow-[0_0_12px_rgba(0,242,254,0.65)]",
      text: "text-cyan-electric",
    };
  }

  return {
    dot: "bg-foreground/70 shadow-[0_0_10px_rgba(248,250,252,0.3)]",
    text: "text-foreground/65",
  };
}

function ProjectMinimalCard({
  project,
  index,
  isSelected,
  onSelect,
  prefersReducedMotion,
}) {
  const statusStyles = getStatusStyles(
    project.status,
  );

  const projectNumber = String(index + 1).padStart(
    2,
    "0",
  );

  return (
    <motion.button
      type="button"
      layout={!prefersReducedMotion}
      layoutId={`project-card-${project.id}`}
      aria-label={`Seleccionar proyecto ${project.title}`}
      aria-pressed={isSelected}
      onClick={() => onSelect(project.id)}
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              y: 28,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.55,
        delay: prefersReducedMotion
          ? 0
          : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -6,
            }
      }
      whileTap={
        prefersReducedMotion
          ? undefined
          : {
              scale: 0.985,
            }
      }
      className={`group relative flex min-h-88 w-full flex-col overflow-hidden rounded-[1.75rem] border p-6 text-left transition-colors duration-300 focus-visible:outline-none sm:p-7 ${
        isSelected
          ? "border-cyan-electric/45 bg-cyan-electric/6.5 shadow-[0_24px_80px_rgba(0,242,254,0.09)]"
          : "border-white/10 bg-white/2.5 hover:border-cyan-electric/25 hover:bg-white/4"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-cyan-electric to-transparent transition-opacity duration-300 ${
          isSelected
            ? "opacity-90"
            : "opacity-0 group-hover:opacity-40"
        }`}
      />

      <div className="flex items-start justify-between gap-5">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cyan-electric">
          PRJ-{projectNumber}
        </span>

        <span
          aria-hidden="true"
          className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            isSelected
              ? "rotate-45 border-cyan-electric bg-cyan-electric text-background"
              : "border-white/10 text-foreground/35 group-hover:border-cyan-electric/30 group-hover:text-cyan-electric"
          }`}
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <motion.h3
        layoutId={`project-title-${project.id}`}
        className="mt-10 max-w-[12ch] text-3xl font-medium tracking-tighter text-foreground sm:text-4xl"
      >
        {project.title}
      </motion.h3>

      <div className="mt-8">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-foreground/32">
          Technologies
        </p>

        <ul
          aria-label={`Tecnologías de ${project.title}`}
          className="mt-4 flex flex-wrap gap-2"
        >
          {project.technologies.map(
            (technology) => (
              <li
                key={technology}
                className="rounded-full border border-white/9 bg-background/45 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.13em] text-foreground/55"
              >
                {technology}
              </li>
            ),
          )}
        </ul>
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/8 pt-5">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className={`size-2 rounded-full ${statusStyles.dot}`}
          />

          <span
            className={`font-mono text-[0.6rem] uppercase tracking-[0.17em] ${statusStyles.text}`}
          >
            {project.status}
          </span>
        </div>

        <span
          className={`font-mono text-[0.55rem] uppercase tracking-[0.16em] transition-colors ${
            isSelected
              ? "text-cyan-electric"
              : "text-foreground/25"
          }`}
        >
          {isSelected ? "Selected" : "Standby"}
        </span>
      </div>
    </motion.button>
  );
}

export default ProjectMinimalCard;