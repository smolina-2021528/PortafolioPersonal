import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUp,
  Contact,
} from "lucide-react";

function ContactSection() {
  const prefersReducedMotion = Boolean(
    useReducedMotion(),
  );

  return (
    <section
      id="redes"
      aria-labelledby="redes-title"
      className="relative min-h-screen scroll-mt-0 overflow-hidden border-b border-white/5"
    >
      <div
        aria-hidden="true"
        className="cyber-grid absolute inset-0 opacity-20"
      />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 size-136 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-electric/[0.035] blur-[130px]"
      />

      <motion.div
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                y: 24,
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
          duration: prefersReducedMotion
            ? 0
            : 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mx-auto flex min-h-screen w-full max-w-368 flex-col justify-center px-6 py-32 sm:px-10 lg:px-16 xl:px-20"
      >
        <div className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full border border-cyan-electric/20 bg-cyan-electric/5.5 text-cyan-electric">
              <Contact
                aria-hidden="true"
                className="size-4"
              />
            </span>

            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-electric">
              Connection terminal
            </p>
          </div>

          <h2
            id="redes-title"
            className="mt-7 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.065em] text-foreground sm:text-6xl lg:text-7xl"
          >
            Construyamos la siguiente idea.
          </h2>

          <p className="mt-7 max-w-2xl text-base font-light leading-8 text-foreground/58 sm:text-lg">
            Utiliza el avatar flotante para abrir
            mi tarjeta profesional y consultar mis
            principales canales de contacto.
          </p>

          <div className="mt-10 flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-foreground/35">
            <span className="size-1.5 rounded-full bg-cyan-electric shadow-[0_0_10px_rgba(0,242,254,0.8)]" />

            Identidad profesional disponible
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-8 border-t border-white/8 pt-7">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-foreground/30">
            Sebastián Molina / Portfolio 2026
          </p>

          <a
            href="#inicio"
            className="inline-flex min-h-11 items-center gap-3 rounded-full border border-white/10 px-4 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-foreground/45 transition-colors hover:border-cyan-electric/30 hover:text-cyan-electric"
          >
            Volver al inicio

            <ArrowUp
              aria-hidden="true"
              className="size-4"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default ContactSection;