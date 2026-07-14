import CurriculumGraphIsland from "../islands/graph-network/CurriculumGraphIsland";

function CurriculumSection() {
  return (
    <section
      id="formacion"
      aria-labelledby="formacion-title"
      className="relative min-h-screen scroll-mt-0 overflow-hidden border-b border-white/5"
    >
      <CurriculumGraphIsland />
    </section>
  );
}

export default CurriculumSection;