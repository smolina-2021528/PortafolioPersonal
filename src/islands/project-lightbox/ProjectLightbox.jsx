import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Check,
  CircleDot,
  Code2,
  ExternalLink,
  Layers3,
  LockKeyhole,
  Package,
  Rocket,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";

function getStatusStyles(status) {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus.includes("desarrollo")) {
    return {
      dot: "bg-magenta-glitch",
      border: "border-magenta-glitch/25",
      background: "bg-magenta-glitch/[0.055]",
      text: "text-magenta-glitch",
    };
  }

  return {
    dot: "bg-cyan-electric",
    border: "border-cyan-electric/25",
    background: "bg-cyan-electric/[0.055]",
    text: "text-cyan-electric",
  };
}

function ProjectLink({
  href,
  children,
  icon: Icon = ExternalLink,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 items-center gap-3 rounded-full border border-cyan-electric/25 bg-cyan-electric/5.5 px-4 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-cyan-electric transition-colors hover:border-cyan-electric/50 hover:bg-cyan-electric/10"
    >
      <Icon
        aria-hidden="true"
        className="size-3.5"
      />

      {children}
    </a>
  );
}

function InformationCard({
  icon: Icon,
  label,
  children,
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-background/45 p-5">
      <div className="flex items-center gap-3">
        <Icon
          aria-hidden="true"
          className="size-4 text-cyan-electric"
        />

        <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-foreground/35">
          {label}
        </p>
      </div>

      <div className="mt-4 text-sm leading-7 text-foreground/68">
        {children}
      </div>
    </div>
  );
}

function ProjectSpecificContent({ project }) {
  if (project.id === "cosmed") {
    return (
      <>
        <div className="grid gap-4 lg:grid-cols-2">
          <InformationCard
            icon={Check}
            label="Trabajo realizado"
          >
            <ul className="space-y-2">
              {project.completed?.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-electric" />
                  {item}
                </li>
              ))}
            </ul>
          </InformationCard>

          <InformationCard
            icon={CircleDot}
            label="Siguientes etapas"
          >
            <ul className="space-y-2">
              {project.pending?.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/35" />
                  {item}
                </li>
              ))}
            </ul>
          </InformationCard>
        </div>

        <div className="mt-4 rounded-2xl border border-magenta-glitch/18 bg-magenta-glitch/[0.035] p-5">
          <div className="flex items-start gap-4">
            <LockKeyhole
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-magenta-glitch"
            />

            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-magenta-glitch">
                Confidential project
              </p>

              <p className="mt-3 text-sm leading-7 text-foreground/62">
                La información técnica, los datos, el
                repositorio y la arquitectura interna no se
                muestran por razones de privacidad y
                confidencialidad. Cosmed se presenta como una
                herramienta de apoyo y no como un sistema de
                diagnóstico médico.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (project.id === "vizflow") {
    return (
      <>
        <div className="grid gap-4 lg:grid-cols-2">
          <InformationCard
            icon={Package}
            label="Capacidades"
          >
            <ul className="space-y-2">
              <li>Lectura de archivos CSV, JSON y XLS.</li>
              <li>Interacción mediante terminal.</li>
              <li>Generación automática de archivos HTML.</li>
              <li>
                Publicación independiente de Core y CLI.
              </li>
            </ul>
          </InformationCard>

          <InformationCard
            icon={Layers3}
            label="Visualizaciones"
          >
            <div className="flex flex-wrap gap-2">
              {project.chartTypes?.map((chartType) => (
                <span
                  key={chartType}
                  className="rounded-full border border-white/9 px-3 py-2 font-mono text-[0.57rem] uppercase tracking-[0.13em] text-foreground/55"
                >
                  {chartType}
                </span>
              ))}
            </div>
          </InformationCard>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {project.npmCoreUrl ? (
            <ProjectLink
              href={project.npmCoreUrl}
              icon={Package}
            >
              NPM Core
            </ProjectLink>
          ) : null}

          {project.npmCliUrl ? (
            <ProjectLink
              href={project.npmCliUrl}
              icon={Code2}
            >
              NPM CLI
            </ProjectLink>
          ) : null}

          {project.githubUrl ? (
            <ProjectLink href={project.githubUrl}>
              Repositorio
            </ProjectLink>
          ) : null}
        </div>
      </>
    );
  }

  if (project.id === "restaurant-manager") {
    return (
      <>
        <div className="grid gap-4 lg:grid-cols-2">
          <InformationCard
            icon={ShieldCheck}
            label="Implementación"
          >
            Sistema web con autenticación, administración de
            roles, backend, base de datos e integración entre
            los diferentes componentes de la aplicación.
          </InformationCard>

          <InformationCard
            icon={Rocket}
            label="Despliegue"
          >
            La aplicación se encuentra desplegada en la nube y
            preparada para demostrar el funcionamiento general
            del sistema.
          </InformationCard>
        </div>

        {project.deployUrl ? (
          <div className="mt-5">
            <ProjectLink
              href={project.deployUrl}
              icon={Rocket}
            >
              Abrir aplicación
            </ProjectLink>
          </div>
        ) : null}
      </>
    );
  }

  return null;
}

function ProjectLightbox({
  project,
  onClose,
}) {
  const prefersReducedMotion = Boolean(
    useReducedMotion(),
  );

  const closeButtonRef = useRef(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  const statusStyles = getStatusStyles(
    project.status,
  );

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      role="presentation"
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
      transition={{
        duration: prefersReducedMotion ? 0 : 0.25,
      }}
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-80 overflow-y-auto bg-background/92 p-3 backdrop-blur-xl sm:p-6"
    >
      <div className="flex min-h-full items-center justify-center py-4 sm:py-8">
        <motion.article
          role="dialog"
          aria-modal="true"
          aria-labelledby={`project-lightbox-title-${project.id}`}
          aria-describedby={`project-lightbox-description-${project.id}`}
          layout={!prefersReducedMotion}
          layoutId={`project-card-${project.id}`}
          transition={{
            layout: {
              duration: prefersReducedMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="relative w-full max-w-352 overflow-hidden rounded-4xl border border-white/12 bg-[#0d121d] shadow-[0_40px_140px_rgba(0,0,0,0.7)]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-20 top-0 h-px bg-linear-to-r from-transparent via-cyan-electric to-transparent"
          />

          <div className="flex items-center justify-between gap-5 border-b border-white/8 px-5 py-4 sm:px-8 sm:py-5">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`size-2 rounded-full ${statusStyles.dot}`}
              />

              <span
                className={`font-mono text-[0.6rem] uppercase tracking-[0.18em] ${statusStyles.text}`}
              >
                {project.status}
              </span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              aria-label={`Cerrar proyecto ${project.title}`}
              onClick={onClose}
              className="grid size-11 place-items-center rounded-full border border-white/10 text-foreground/50 transition-colors hover:border-cyan-electric/35 hover:bg-cyan-electric/5.5 hover:text-cyan-electric"
            >
              <X
                aria-hidden="true"
                className="size-4"
              />
            </button>
          </div>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-12 lg:p-10">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cyan-electric">
                Project dossier
              </p>

              <motion.h2
                id={`project-lightbox-title-${project.id}`}
                layoutId={`project-title-${project.id}`}
                className="mt-5 text-balance text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl lg:text-6xl"
              >
                {project.title}
              </motion.h2>

              <div className="mt-7 flex items-center gap-3">
                <UserRound
                  aria-hidden="true"
                  className="size-4 text-cyan-electric"
                />

                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.17em] text-foreground/35">
                    Rol
                  </p>

                  <p className="mt-1 text-sm text-foreground/72">
                    {project.role}
                  </p>
                </div>
              </div>

              <p
                id={`project-lightbox-description-${project.id}`}
                className="mt-7 text-base font-light leading-8 text-foreground/67 sm:text-lg"
              >
                {project.description}
              </p>

              <div className="mt-8">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-foreground/35">
                  Technologies
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map(
                    (technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-cyan-electric/14 bg-cyan-electric/[0.035] px-3 py-2 font-mono text-[0.57rem] uppercase tracking-[0.13em] text-foreground/58"
                      >
                        {technology}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-8">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-foreground/35">
                  Tags
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-3 py-2 font-mono text-[0.57rem] uppercase tracking-[0.13em] ${statusStyles.border} ${statusStyles.background} ${statusStyles.text}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="relative flex min-h-68 items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/9 bg-background/55 p-8 sm:min-h-80">
                <div
                  aria-hidden="true"
                  className="cyber-grid absolute inset-0 opacity-30"
                />

                <div
                  aria-hidden="true"
                  className="absolute size-56 rounded-full border border-cyan-electric/8"
                />

                <div className="relative text-center">
                  <Layers3
                    aria-hidden="true"
                    className="mx-auto size-10 text-cyan-electric"
                  />

                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.22em] text-cyan-electric">
                    Visual archive
                  </p>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-foreground/45">
                    El carrusel de capturas y la navegación
                    visual serán integrados en el siguiente
                    commit.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <ProjectSpecificContent
                  project={project}
                />
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}

export default ProjectLightbox;