import {
  motion,
  useInView,
} from "motion/react";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
} from "lucide-react";
import { useRef } from "react";

const categoryConfiguration = {
  academic: {
    label: "Formación",
    icon: BookOpen,
  },

  certification: {
    label: "Certificación",
    icon: Award,
  },

  project: {
    label: "Proyecto",
    icon: BriefcaseBusiness,
  },
};

function GraphNode({
  node,
  index,
  isSelected,
  isConnected,
  onSelect,
  prefersReducedMotion,
}) {
  const nodeContainerRef = useRef(null);

  const isNodeInView = useInView(
    nodeContainerRef,
    {
      once: false,
      amount: 0.15,
      margin: "80px 0px 80px 0px",
    },
  );

  const category =
    categoryConfiguration[node.category] ??
    categoryConfiguration.academic;

  const CategoryIcon = category.icon;

  const nodeNumber = String(
    index + 1,
  ).padStart(2, "0");

  const floatingAnimation =
    !prefersReducedMotion && isNodeInView
      ? {
          y: [0, -5, 0],
        }
      : {
          y: 0,
        };

  const floatingTransition =
    !prefersReducedMotion && isNodeInView
      ? {
          y: {
            duration: 4 + index * 0.18,
            repeat:
              Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 0.12,
          },
        }
      : {
          y: {
            duration: 0.2,
          },
        };

  return (
    <motion.div
      ref={nodeContainerRef}
      style={{
        "--node-x-mobile":
          `${node.position.mobile.x}%`,

        "--node-y-mobile":
          `${node.position.mobile.y}%`,

        "--node-x-desktop":
          `${node.position.desktop.x}%`,

        "--node-y-desktop":
          `${node.position.desktop.y}%`,
      }}
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              scale: 0.7,
            }
      }
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.3,
      }}
      transition={{
        duration:
          prefersReducedMotion ? 0 : 0.5,

        delay:
          prefersReducedMotion
            ? 0
            : index * 0.06,

        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute left-(--node-x-mobile) top-(--node-y-mobile) z-10 -translate-x-1/2 -translate-y-1/2 lg:left-(--node-x-desktop) lg:top-(--node-y-desktop)"
    >
      <motion.button
        type="button"
        aria-label={`Abrir información de ${node.title}`}
        aria-pressed={isSelected}
        aria-controls="curriculum-node-detail"
        onClick={() => onSelect(node.id)}
        animate={floatingAnimation}
        transition={floatingTransition}
        whileHover={
          prefersReducedMotion
            ? undefined
            : {
                scale: 1.04,
              }
        }
        whileTap={
          prefersReducedMotion
            ? undefined
            : {
                scale: 0.97,
              }
        }
        className={`group relative flex w-[8.8rem] flex-col items-center rounded-2xl border px-3 py-4 text-center backdrop-blur-md transition-colors duration-300 focus-visible:outline-none sm:w-38 ${
          isSelected
            ? "border-cyan-electric/70 bg-cyan-electric/12 shadow-[0_0_35px_rgba(0,242,254,0.2)]"
            : isConnected
              ? "border-cyan-electric/30 bg-cyan-electric/5.5"
              : "border-white/10 bg-background/80 hover:border-cyan-electric/30 hover:bg-white/5"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute -top-1.5 size-3 rounded-full border transition-all duration-300 ${
            isSelected
              ? "border-cyan-electric bg-cyan-electric shadow-[0_0_14px_rgba(0,242,254,0.9)]"
              : isConnected
                ? "border-cyan-electric bg-background shadow-[0_0_10px_rgba(0,242,254,0.45)]"
                : "border-white/25 bg-background"
          }`}
        />

        <div className="flex w-full items-center justify-between">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground/35">
            N-{nodeNumber}
          </span>

          <CategoryIcon
            aria-hidden="true"
            className={`size-3.5 ${
              isSelected || isConnected
                ? "text-cyan-electric"
                : "text-foreground/35"
            }`}
          />
        </div>

        <span
          className={`mt-4 grid size-11 place-items-center rounded-full border transition-all duration-300 ${
            isSelected
              ? "border-cyan-electric bg-cyan-electric text-background"
              : "border-white/10 bg-white/2.5 text-cyan-electric"
          }`}
        >
          <CategoryIcon
            aria-hidden="true"
            className="size-4"
          />
        </span>

        <span className="mt-3 text-sm font-medium leading-5 text-foreground">
          {node.shortTitle}
        </span>

        <span className="mt-2 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-foreground/35">
          {category.label}
        </span>
      </motion.button>
    </motion.div>
  );
}

export default GraphNode;