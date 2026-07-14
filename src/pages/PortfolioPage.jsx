import RightSidebar from "../islands/right-sidebar/RightSidebar";
import ContactSection from "../sections/ContactSection";
import CurriculumSection from "../sections/CurriculumSection";
import ProfileSection from "../sections/ProfileSection";
import ProjectsSection from "../sections/ProjectsSection";
import SkillsSection from "../sections/SkillsSection";
import WelcomeSection from "../sections/WelcomeSection";

function PortfolioPage() {
  return (
    <>
      <h1 className="sr-only">
        Portafolio de Sebastián Molina
      </h1>

      <RightSidebar />

      <WelcomeSection />
      <ProfileSection />
      <SkillsSection />
      <CurriculumSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}

export default PortfolioPage;