import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

function AccordionPanel({
  panel,
  index,
  isActive,
  onSelect,
  onMoveSelection,
  prefersReducedMotion,
}) {
  const buttonId = `profile-panel-button-${panel.id}`;
  const contentId = `profile-panel-content-${panel.id}`;

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        onMoveSelection("next");
        break;

      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        onMoveSelection("previous");
        break;

      case "Home":
        event.preventDefault();
        onMoveSelection("first");
        break;

      case "End":
        event.preventDefault();
        onMoveSelection("last");
        break;

      default:
        break;
    }
  };

  return (
    <motion.article
      layout={!prefersReducedMotion}
      transition={{
        layout: {
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className={`relative flex min-h-36 flex-col overflow-hidden rounded-[1.75rem] border transition-colors duration-300 lg:min-h-100 xl:min-h-104 ${
        isActive
          ? "border-cyan-electric/30 bg-cyan-electric/5.5 shadow-[0_24px_80px_rgba(0,242,254,0.08)] lg:flex-5"
          : "border-white/10 bg-white/2.5 hover:border-cyan-electric/20 hover:bg-white/4 lg:flex-[0.85]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-electric to-transparent transition-opacity duration-300 ${
          isActive ? "opacity-70" : "opacity-0"
        }`}
      />

      <button
        id={buttonId}
        type="button"
        aria-expanded={isActive}
        aria-controls={contentId}
        onClick={() => onSelect(panel.id)}
        onKeyDown={handleKeyDown}
        className={`relative flex w-full gap-5 p-5 text-left focus-visible:outline-none lg:p-6 ${
          isActive
            ? "items-start justify-between"
            : "items-center justify-between lg:h-full lg:flex-col"
        }`}
      >
        <span
          className={`font-mono text-[0.65rem] uppercase tracking-[0.24em] transition-colors ${
            isActive
              ? "text-cyan-electric"
              : "text-foreground/35"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className={`text-xl font-medium tracking-[-0.03em] text-foreground transition-all duration-500 lg:text-2xl ${
            isActive
              ? ""
              : "lg:[writing-mode:vertical-rl] lg:rotate-180 lg:whitespace-nowrap"
          }`}
        >
          {panel.title}
        </span>

        <span
          aria-hidden="true"
          className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            isActive
              ? "rotate-45 border-cyan-electric/40 bg-cyan-electric text-background"
              : "border-white/10 text-foreground/45"
          }`}
        >
          <ArrowUpRight className="size-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isActive ? (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={buttonId}
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
                    y: 12,
                  }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="px-5 pb-6 lg:px-8 lg:pb-7"
          >
            <p className="max-w-3xl text-base font-light leading-8 text-foreground/70 sm:text-lg sm:leading-9">
              {panel.content}
            </p>

            <div className="mt-8 flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-foreground/35">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-cyan-electric/40"
              />

              Perfil / {String(index + 1).padStart(2, "0")}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

export default AccordionPanel;