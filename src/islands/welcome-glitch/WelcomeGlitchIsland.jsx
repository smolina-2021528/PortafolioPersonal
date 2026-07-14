import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, Braces, MapPin } from "lucide-react";

import profile from "../../content/profile.json";
import GlitchName from "./GlitchName";
import HeroPhoto from "./HeroPhoto";
import useRandomGlitch from "./useRandomGlitch";

const entranceTransition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1],
};

function WelcomeGlitchIsland() {
  const prefersReducedMotion = useReducedMotion();
  const isGlitching = useRandomGlitch(prefersReducedMotion);

  const initialState = prefersReducedMotion
    ? false
    : {
        opacity: 0,
        y: 24,
      };

  return (
    <div className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="cyber-grid absolute inset-0 opacity-45"
      />

      <div
        aria-hidden="true"
        className="absolute left-[12%] top-16 size-72 rounded-full bg-cyan-electric/5.5 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-0 right-[8%] size-64 rounded-full bg-magenta-glitch/[0.035] blur-[100px]"
      />

      <div className="relative mx-auto grid min-h-screen w-full max-w-368 items-center gap-16 px-6 py-28 sm:px-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(22rem,0.75fr)] lg:px-16 xl:px-20">
        <div className="max-w-5xl">
          <motion.div
            initial={initialState}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={entranceTransition}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-electric/20 bg-cyan-electric/5.5 px-3 py-2 font-mono text-[0.64rem] uppercase tracking-[0.22em] text-cyan-electric">
              <Braces
                aria-hidden="true"
                className="size-3.5"
              />

              Portfolio / 2026
            </span>

            <span className="inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-foreground/45">
              <MapPin
                aria-hidden="true"
                className="size-3.5"
              />

              {profile.location}
            </span>
          </motion.div>

          <motion.div
            initial={initialState}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              ...entranceTransition,
              delay: prefersReducedMotion ? 0 : 0.08,
            }}
            className="mt-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-foreground/48 sm:text-sm">
              {profile.professionalTitle}
            </p>

            <GlitchName
              as="h2"
              isGlitching={isGlitching}
              className="mt-4 max-w-[13ch] text-balance text-[clamp(3.7rem,10vw,9.25rem)] font-semibold leading-[0.84] tracking-[-0.075em] text-foreground"
            >
              {profile.displayName}
            </GlitchName>
          </motion.div>

          <motion.div
            initial={initialState}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              ...entranceTransition,
              delay: prefersReducedMotion ? 0 : 0.16,
            }}
            className="mt-9 max-w-3xl"
          >
            <GlitchName
              as="p"
              isGlitching={isGlitching}
              className="text-balance text-lg font-light leading-relaxed text-foreground/68 sm:text-xl lg:text-2xl"
            >
              {profile.heroPhrase}
            </GlitchName>
          </motion.div>

          <motion.div
            initial={initialState}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              ...entranceTransition,
              delay: prefersReducedMotion ? 0 : 0.24,
            }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <a
              href="#perfil"
              className="group inline-flex min-h-13 items-center gap-3 rounded-full bg-cyan-electric px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-background shadow-[0_0_32px_rgba(0,242,254,0.16)] transition-transform duration-300 hover:-translate-y-1"
            >
              Ver portafolio

              <ArrowDownRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
              />
            </a>

            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/38">
              Scroll to explore
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={
            prefersReducedMotion
              ? false
              : {
                  opacity: 0,
                  x: 28,
                  scale: 0.98,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          transition={{
            ...entranceTransition,
            delay: prefersReducedMotion ? 0 : 0.18,
          }}
        >
          <HeroPhoto
            photo={profile.photo}
            name={profile.displayName}
          />
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[0.58rem] uppercase tracking-[0.25em] text-foreground/32 md:flex"
      >
        <span className="h-px w-12 bg-foreground/15" />

        Signal online

        <span className="size-1.5 rounded-full bg-cyan-electric shadow-[0_0_12px_rgba(0,242,254,0.8)]" />
      </div>
    </div>
  );
}

export default WelcomeGlitchIsland;