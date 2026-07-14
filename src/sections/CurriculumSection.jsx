function CurriculumSection() {
  return (
    <section
      id="formacion"
      aria-labelledby="formacion-title"
      className="grid min-h-screen place-items-center border-b border-white/5 px-6 py-24"
    >
      <div className="w-full max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-electric">
          Isla pendiente
        </p>

        <h2 id="formacion-title" className="mt-3 text-3xl font-semibold">
          Formación
        </h2>

        <p className="mt-4 max-w-2xl text-foreground/60">
          La implementación interactiva de esta sección se agregará en su
          commit correspondiente.
        </p>
      </div>
    </section>
  );
}

export default CurriculumSection;