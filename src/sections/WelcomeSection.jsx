import WelcomeGlitchIsland from "../islands/welcome-glitch/WelcomeGlitchIsland";

function WelcomeSection() {
  return (
    <section
      id="inicio"
      aria-label="Bienvenida"
      className="min-h-screen border-b border-white/5"
    >
      <WelcomeGlitchIsland />
    </section>
  );
}

export default WelcomeSection;