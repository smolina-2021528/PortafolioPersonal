import {
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Layers3,
  PanelsTopLeft,
} from "lucide-react";

import projects from "../../content/projects.json";
import ProjectMinimalCard from "./ProjectMinimalCard";
import useProjectLightbox from "./useProjectLightbox";

function getProjectMetrics(projectList) {
  return {
    total: projectList.length,
    published: projectList.filter((project) =>
      project.status
        .toLowerCase()
        .includes("publicado"),
    ).length,
    deployed: projectList.filter((project) =>
      project.status
        .toLowerCase()
        .includes("desplegado"),
    ).length,
  };
}

const projectMetrics = getProjectMetrics(projects);

function ProjectsLightboxIsland() {
  const prefersReducedMotion = Boolean(
    useReducedMotion(),
  );

  const {
    selectedProjectId,
    selectedProject,
    selectProject,
    clearSelection,
  } = useProjectLightbox(projects);

  return (
    <div className="relative mx-auto w-full max-w-368 px-6 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-20">
      <div
        aria-hidden="true"
        className="absolute left-[12%] top-36 size-72 rounded-full bg-cyan-electric/[0.035] blur-[125px]"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-28 right-[10%] size-64 rounded-full bg-magenta-glitch/[0.018] blur-[105px]"
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
          duration: prefersReducedMotion ? 0 : 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full border border-cyan-electric/20 bg-cyan-electric/5.5 text-cyan-electric">
            <PanelsTopLeft
              aria-hidden="true"
              className="size-4"
            />
          </span>

          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-electric">
            Project archive
          </p>
        </div>

        <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div>
            <h2
              id="proyectos-title"
              className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl lg:text-6xl"
            >
              Ideas convertidas en sistemas reales.
            </h2>

            <p className="mt-6 max-w-2xl text-base font-light leading-8 text-foreground/58 sm:text-lg">
              Una selección de proyectos que combinan
              desarrollo, investigación, publicación de
              herramientas e integración de sistemas web.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-[1.4rem] border border-white/10 bg-white/2.5 p-2">
            <div className="rounded-xl bg-background/55 px-4 py-3">
              <span className="block font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground/35">
                Projects
              </span>

              <span className="mt-1 block font-mono text-lg font-semibold text-cyan-electric">
                {projectMetrics.total}
              </span>
            </div>

            <div className="rounded-xl bg-background/55 px-4 py-3">
              <span className="block font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground/35">
                Published
              </span>

              <span className="mt-1 block font-mono text-lg font-semibold text-cyan-electric">
                {projectMetrics.published}
              </span>
            </div>

            <div className="rounded-xl bg-background/55 px-4 py-3">
              <span className="block font-mono text-[0.55rem] uppercase tracking-[0.18em] text-foreground/35">
                Cloud
              </span>

              <span className="mt-1 block font-mono text-lg font-semibold text-cyan-electric">
                {projectMetrics.deployed}
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="relative mt-12 overflow-hidden rounded-4xl border border-white/10 bg-white/[0.018] p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-4 px-3 py-3 sm:px-4">
          <div className="flex items-center gap-3">
            <Layers3
              aria-hidden="true"
              className="size-4 text-cyan-electric"
            />

            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-foreground/42">
              Project modules
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-foreground/32">
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${
                selectedProject
                  ? "bg-cyan-electric shadow-[0_0_10px_rgba(0,242,254,0.8)]"
                  : "bg-foreground/25"
              }`}
            />

            {selectedProject
              ? "Module selected"
              : "Awaiting selection"}
          </div>
        </div>

        <LayoutGroup id="projects-gallery">
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectMinimalCard
                key={project.id}
                project={project}
                index={index}
                isSelected={
                  selectedProjectId === project.id
                }
                onSelect={selectProject}
                prefersReducedMotion={
                  prefersReducedMotion
                }
              />
            ))}
          </div>
        </LayoutGroup>
      </div>

      <div className="relative mt-6 min-h-20">
        {selectedProject ? (
          <motion.div
            key={selectedProject.id}
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 10,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
            }}
            className="flex flex-col gap-4 rounded-[1.4rem] border border-cyan-electric/20 bg-cyan-electric/4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-cyan-electric">
                Selected project
              </p>

              <p className="mt-2 text-sm text-foreground/65">
                {selectedProject.title} está preparado para
                expandirse hacia la vista detallada.
              </p>
            </div>

            <button
              type="button"
              onClick={clearSelection}
              className="self-start rounded-full border border-white/10 px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-foreground/45 transition-colors hover:border-cyan-electric/25 hover:text-cyan-electric sm:self-auto"
            >
              Limpiar selección
            </button>
          </motion.div>
        ) : (
          <div className="flex min-h-20 items-center rounded-[1.4rem] border border-dashed border-white/8 px-5">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-foreground/28">
              Selecciona una tarjeta para preparar su vista
              ampliada
            </p>
          </div>
        )}
      </div>

      <p
        aria-live="polite"
        className="sr-only"
      >
        {selectedProject
          ? `Proyecto seleccionado: ${selectedProject.title}`
          : "No hay ningún proyecto seleccionado"}
      </p>
    </div>
  );
}

export default ProjectsLightboxIsland;