import { AnimatePresence, motion } from "motion/react";
import { Info, X } from "lucide-react";

function SkillExplanation({
  skill,
  explanationId,
  analysisLabel,
  emptyMessage,
  onClose,
  prefersReducedMotion,
}) {
  return (
    <div className="min-h-52">
      <AnimatePresence mode="wait" initial={false}>
        {skill ? (
          <motion.article
            key={skill.id}
            id={explanationId}
            role="region"
            aria-live="polite"
            aria-label={`Información de ${skill.name}`}
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 14,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: 0,
                    y: -10,
                  }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-[1.6rem] border border-cyan-electric/25 bg-cyan-electric/5.5 p-6 sm:p-7"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-12 top-0 h-px bg-linear-to-r from-transparent via-cyan-electric to-transparent"
            />

            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan-electric/25 bg-cyan-electric/8 text-cyan-electric">
                <Info
                  aria-hidden="true"
                  className="size-4"
                />
              </span>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan-electric">
                  {analysisLabel}
                </p>

                <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
                  <h3 className="text-2xl font-medium tracking-[-0.035em] text-foreground">
                    {skill.name}
                  </h3>

                  <span className="font-mono text-sm font-semibold text-cyan-electric">
                    {skill.level}%
                  </span>
                </div>

                <p className="mt-5 max-w-3xl text-base font-light leading-8 text-foreground/68">
                  {skill.description}
                </p>
              </div>

              <button
                type="button"
                aria-label="Cerrar información de la habilidad"
                onClick={onClose}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 text-foreground/45 transition-colors hover:border-cyan-electric/30 hover:text-cyan-electric"
              >
                <X
                  aria-hidden="true"
                  className="size-4"
                />
              </button>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/8 pt-5">
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-foreground/35">
                Nivel registrado
              </span>

              <div className="h-1.5 min-w-40 flex-1 overflow-hidden rounded-full bg-white/7">
                <motion.div
                  initial={{
                    width: prefersReducedMotion
                      ? `${skill.level}%`
                      : 0,
                  }}
                  animate={{
                    width: `${skill.level}%`,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full rounded-full bg-cyan-electric shadow-[0_0_12px_rgba(0,242,254,0.45)]"
                />
              </div>

              <span className="font-mono text-xs text-foreground/55">
                {skill.level}/100
              </span>
            </div>
          </motion.article>
        ) : (
          <motion.div
            key="empty-skill-explanation"
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                  }
            }
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="flex min-h-52 items-center rounded-[1.6rem] border border-dashed border-white/10 bg-white/[0.018] p-6 sm:p-7"
          >
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 text-foreground/35">
                <Info
                  aria-hidden="true"
                  className="size-4"
                />
              </span>

              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-foreground/35">
                  Awaiting selection
                </p>

                <p className="mt-3 max-w-2xl text-base leading-7 text-foreground/48">
                  {emptyMessage}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SkillExplanation;