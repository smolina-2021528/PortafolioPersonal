import {
  AnimatePresence,
  motion,
} from "motion/react";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Focus,
  Network,
  X,
} from "lucide-react";

const categoryConfiguration = {
  academic: {
    label: "Formación académica",
    icon: BookOpen,
  },
  certification: {
    label: "Certificación",
    icon: Award,
  },
  project: {
    label: "Proyecto y experiencia",
    icon: BriefcaseBusiness,
  },
};

function NodeDetailCard({
  node,
  connectedNodes,
  onClose,
  prefersReducedMotion,
}) {
  const category = node
    ? categoryConfiguration[node.category] ??
      categoryConfiguration.academic
    : null;

  const CategoryIcon = category?.icon;

  return (
    <div className="min-h-76">
      <AnimatePresence mode="wait" initial={false}>
        {node ? (
          <motion.article
            key={node.id}
            id="curriculum-node-detail"
            role="region"
            aria-live="polite"
            aria-label={`Información de ${node.title}`}
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
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
                    y: -12,
                  }
            }
            transition={{
              duration: prefersReducedMotion
                ? 0
                : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative overflow-hidden rounded-[1.75rem] border border-cyan-electric/25 bg-cyan-electric/5.5 p-6 sm:p-8"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-14 top-0 h-px bg-linear-to-r from-transparent via-cyan-electric to-transparent"
            />

            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-cyan-electric/25 bg-cyan-electric/9 text-cyan-electric">
                {CategoryIcon ? (
                  <CategoryIcon
                    aria-hidden="true"
                    className="size-5"
                  />
                ) : null}
              </span>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan-electric">
                  {category?.label}
                </p>

                <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-foreground sm:text-3xl">
                  {node.title}
                </h3>

                <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground/40">
                  {node.subtitle}
                </p>
              </div>

              <button
                type="button"
                aria-label="Cerrar detalle del nodo"
                onClick={onClose}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 text-foreground/45 transition-colors hover:border-cyan-electric/30 hover:text-cyan-electric"
              >
                <X
                  aria-hidden="true"
                  className="size-4"
                />
              </button>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-background/35 p-5">
                <div className="flex items-center gap-3">
                  <Building2
                    aria-hidden="true"
                    className="size-4 text-cyan-electric"
                  />

                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-foreground/35">
                    Institución
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-foreground/70">
                  {node.institution}
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-background/35 p-5">
                <div className="flex items-center gap-3">
                  <Focus
                    aria-hidden="true"
                    className="size-4 text-cyan-electric"
                  />

                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-foreground/35">
                    Enfoque
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-foreground/70">
                  {node.focus}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-4xl text-base font-light leading-8 text-foreground/68">
              {node.description}
            </p>

            <div className="mt-7 border-t border-white/8 pt-5">
              <div className="flex items-center gap-3">
                <Network
                  aria-hidden="true"
                  className="size-4 text-cyan-electric"
                />

                <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-foreground/35">
                  Nodos relacionados
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {connectedNodes.map(
                  (connectedNode) => (
                    <span
                      key={connectedNode.id}
                      className="rounded-full border border-cyan-electric/15 bg-cyan-electric/4 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-foreground/55"
                    >
                      {connectedNode.shortTitle}
                    </span>
                  ),
                )}
              </div>
            </div>
          </motion.article>
        ) : (
          <motion.div
            key="empty-node-detail"
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
            className="flex min-h-76 items-center rounded-[1.75rem] border border-dashed border-white/10 bg-white/[0.018] p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 text-foreground/35">
                <Network
                  aria-hidden="true"
                  className="size-5"
                />
              </span>

              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-foreground/35">
                  Awaiting node selection
                </p>

                <h3 className="mt-3 text-xl font-medium text-foreground/75">
                  Explora la constelación
                </h3>

                <p className="mt-3 max-w-2xl text-base font-light leading-7 text-foreground/48">
                  Selecciona un nodo para consultar su
                  información y resaltar las conexiones
                  relacionadas con ese hito.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NodeDetailCard;