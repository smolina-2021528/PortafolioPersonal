import ProfileAccordionIsland from "../islands/horizontal-accordion/ProfileAccordionIsland";

function ProfileSection() {
  return (
    <section
      id="perfil"
      aria-labelledby="perfil-title"
      className="relative min-h-screen scroll-mt-0 overflow-hidden border-b border-white/5"
    >
      <ProfileAccordionIsland />
    </section>
  );
}

export default ProfileSection;