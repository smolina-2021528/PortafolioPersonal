import { motion, useReducedMotion } from "motion/react";
import {
  BriefcaseBusiness,
  CalendarDays,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  School,
  UserRound,
} from "lucide-react";

import profile from "../../content/profile.json";
import socialLinks from "../../content/socialLinks.json";
import AccordionPanel from "./AccordionPanel";
import useAccordionState from "./useAccordionState";

const profilePanelIds = profile.panels.map((panel) => panel.id);

const generalInformation = [
  {
    id: "age",
    label: "Edad",
    value: `${profile.age} años`,
    icon: CalendarDays,
  },
  {
    id: "location",
    label: "Ubicación",
    value: profile.location,
    icon: MapPin,
  },
  {
    id: "career",
    label: "Carrera",
    value: profile.career,
    icon: GraduationCap,
  },
  {
    id: "institution",
    label: "Institución",
    value: profile.institution,
    icon: School,
  },
];

const contactInformation = [
  {
    id: "email",
    label: "Correo",
    value: profile.email,
    href: socialLinks.email.url,
    icon: Mail,
    external: false,
  },
  {
    id: "github",
    label: "GitHub",
    value: "smolina-2021528",
    href: socialLinks.github.url,
    icon: GitBranch,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Perfil pendiente",
    href: socialLinks.linkedin.url,
    icon: BriefcaseBusiness,
    external: true,
  },
];

function isPendingValue(value) {
  if (typeof value !== "string") {
    return true;
  }

  const normalizedValue = value.toUpperCase();

  return (
    value.includes("[") ||
    normalizedValue.includes("PENDIENTE")
  );
}

function ProfileAccordionIsland() {
  const prefersReducedMotion = Boolean(useReducedMotion());

  const {
    activePanelId,
    selectPanel,
    moveSelection,
  } = useAccordionState(profilePanelIds);

  return (
    <div className="relative mx-auto w-full max-w-368 px-6 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-20">
      <div
        aria-hidden="true"
        className="absolute right-[14%] top-24 size-72 rounded-full bg-cyan-electric/[0.035] blur-[120px]"
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
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative max-w-4xl"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full border border-cyan-electric/20 bg-cyan-electric/5.5 text-cyan-electric">
            <UserRound
              aria-hidden="true"
              className="size-4"
            />
          </span>

          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-electric">
            Profile interface
          </p>
        </div>

        <h2
          id="perfil-title"
          className="mt-6 text-balance text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl lg:text-6xl"
        >
          Más que código, una visión en construcción.
        </h2>

        <p className="mt-6 max-w-2xl text-base font-light leading-8 text-foreground/58 sm:text-lg">
          Explora los aspectos que definen mi identidad, mis
          objetivos y la dirección que quiero construir como
          desarrollador.
        </p>
      </motion.header>

      <motion.div
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                y: 30,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.7,
          delay: prefersReducedMotion ? 0 : 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mt-14 flex flex-col gap-4 lg:flex-row"
      >
        {profile.panels.map((panel, index) => (
          <AccordionPanel
            key={panel.id}
            panel={panel}
            index={index}
            isActive={activePanelId === panel.id}
            onSelect={selectPanel}
            onMoveSelection={moveSelection}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </motion.div>

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
          amount: 0.2,
        }}
        transition={{
          duration: 0.65,
          delay: prefersReducedMotion ? 0 : 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mt-8 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="rounded-[1.75rem] border border-white/10 bg-white/2.5 p-5 sm:p-6">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground/40">
            Información general
          </p>

          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {generalInformation.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="flex min-h-24 items-start gap-4 rounded-2xl border border-white/7 bg-background/35 p-4"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-cyan-electric/15 bg-cyan-electric/4 text-cyan-electric">
                    <Icon
                      aria-hidden="true"
                      className="size-4"
                    />
                  </span>

                  <div>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-foreground/35">
                      {item.label}
                    </dt>

                    <dd className="mt-2 text-sm leading-6 text-foreground/72">
                      {item.value}
                    </dd>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/2.5 p-5 sm:p-6">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground/40">
            Contacto profesional
          </p>

          <ul className="mt-5 space-y-3">
            {contactInformation.map((item) => {
              const Icon = item.icon;
              const isPending =
                isPendingValue(item.value) ||
                isPendingValue(item.href);

              const content = (
                <>
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.035] text-cyan-electric">
                    <Icon
                      aria-hidden="true"
                      className="size-4"
                    />
                  </span>

                  <span className="min-w-0">
                    <span className="block font-mono text-[0.58rem] uppercase tracking-[0.18em] text-foreground/35">
                      {item.label}
                    </span>

                    <span className="mt-1 block truncate text-sm text-foreground/72">
                      {item.value}
                    </span>
                  </span>

                  <span
                    className={`ml-auto font-mono text-[0.58rem] uppercase tracking-[0.16em] ${
                      isPending
                        ? "text-foreground/30"
                        : "text-cyan-electric"
                    }`}
                  >
                    {isPending ? "Pendiente" : "Abrir"}
                  </span>
                </>
              );

              return (
                <li key={item.id}>
                  {isPending ? (
                    <div className="flex min-h-18 items-center gap-4 rounded-2xl border border-white/7 bg-background/35 p-4">
                      {content}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      target={
                        item.external ? "_blank" : undefined
                      }
                      rel={
                        item.external
                          ? "noreferrer"
                          : undefined
                      }
                      aria-label={`Abrir ${item.label}`}
                      className="flex min-h-18 items-center gap-4 rounded-2xl border border-white/7 bg-background/35 p-4 transition-colors hover:border-cyan-electric/25 hover:bg-cyan-electric/[0.035]"
                    >
                      {content}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default ProfileAccordionIsland;