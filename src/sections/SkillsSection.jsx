import SkillsDashboardIsland from "../islands/aerospace-gauges/SkillsDashboardIsland";

function SkillsSection() {
  return (
    <section
      id="habilidades"
      aria-labelledby="habilidades-title"
      className="relative min-h-screen scroll-mt-0 overflow-hidden border-b border-white/5"
    >
      <SkillsDashboardIsland />
    </section>
  );
}

export default SkillsSection;