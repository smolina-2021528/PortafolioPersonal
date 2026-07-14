import ProjectsLightboxIsland from "../islands/project-lightbox/ProjectsLightboxIsland";

function ProjectsSection() {
  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-title"
      className="relative min-h-screen scroll-mt-0 overflow-hidden border-b border-white/5"
    >
      <ProjectsLightboxIsland />
    </section>
  );
}

export default ProjectsSection;