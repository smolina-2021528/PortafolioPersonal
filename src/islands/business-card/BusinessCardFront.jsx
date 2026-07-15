import {
  Code2,
  Mail,
  MapPin,
  RotateCcw,
} from "lucide-react";

function BusinessCardFront({
  profile,
  emailAvailable,
  onFlip,
}) {
  const displayedEmail = emailAvailable
    ? profile.email
    : "Correo pendiente";

  const handleFlip = (event) => {
    event.stopPropagation();
    onFlip();
  };

  const handleImageError = (event) => {
    event.currentTarget.hidden = true;
  };

  return (
    <div className="relative size-full overflow-hidden rounded-4xl border border-white/12 bg-[#0d121d] p-6 shadow-[0_35px_100px_rgba(0,0,0,0.65)] sm:p-8">
      <div
        aria-hidden="true"
        className="cyber-grid absolute inset-0 opacity-20"
      />

      <div
        aria-hidden="true"
        className="absolute -right-20 -top-24 size-72 rounded-full bg-cyan-electric/8 blur-[90px]"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-24 left-1/3 size-64 rounded-full bg-magenta-glitch/2.5 blur-[100px]"
      />

      <span
        aria-hidden="true"
        className="absolute inset-x-16 top-0 h-px bg-linear-to-r from-transparent via-cyan-electric to-transparent"
      />

      <div className="relative flex h-full flex-col">
        <header className="flex items-start justify-between gap-5">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl border border-cyan-electric/25 bg-cyan-electric/[0.07] font-mono text-sm font-semibold text-cyan-electric">
              SM
            </span>

            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-cyan-electric">
                Digital identity
              </p>

              <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.16em] text-foreground/30">
                Card / Front
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Girar tarjeta para ver las redes"
            onClick={handleFlip}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 text-foreground/45 transition-colors hover:border-cyan-electric/30 hover:bg-cyan-electric/5 hover:text-cyan-electric"
          >
            <RotateCcw
              aria-hidden="true"
              className="size-4"
            />
          </button>
        </header>

        <div className="mt-7 grid flex-1 content-center gap-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center">
          <div className="relative mx-auto size-32 overflow-hidden rounded-[1.7rem] border border-cyan-electric/20 bg-cyan-electric/6 sm:size-40">
            <span className="absolute inset-0 grid place-items-center font-mono text-2xl font-semibold text-cyan-electric">
              SM
            </span>

            <img
              src={profile.photo}
              alt={`Fotografía de ${profile.displayName}`}
              loading="lazy"
              onError={handleImageError}
              className="relative size-full object-cover object-center"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-background/55 to-transparent"
            />
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-3xl font-medium tracking-[-0.055em] text-foreground sm:text-4xl">
              {profile.displayName}
            </h3>

            <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.17em] text-cyan-electric">
              {profile.professionalTitle}
            </p>

            <p className="mx-auto mt-5 max-w-md text-sm font-light leading-7 text-foreground/55 sm:mx-0 sm:text-base">
              Software con propósito, creatividad y
              visión de futuro.
            </p>
          </div>
        </div>

        <footer className="mt-6 grid gap-3 border-t border-white/8 pt-5 sm:grid-cols-2">
          <div className="flex min-w-0 items-center gap-3 rounded-xl border border-white/7 bg-background/30 px-4 py-3">
            <Mail
              aria-hidden="true"
              className="size-4 shrink-0 text-cyan-electric"
            />

            <div className="min-w-0">
              <p className="font-mono text-[0.5rem] uppercase tracking-[0.15em] text-foreground/30">
                Correo
              </p>

              <p className="mt-1 truncate text-xs text-foreground/58">
                {displayedEmail}
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-3 rounded-xl border border-white/7 bg-background/30 px-4 py-3">
            <MapPin
              aria-hidden="true"
              className="size-4 shrink-0 text-cyan-electric"
            />

            <div className="min-w-0">
              <p className="font-mono text-[0.5rem] uppercase tracking-[0.15em] text-foreground/30">
                Ubicación
              </p>

              <p className="mt-1 truncate text-xs text-foreground/58">
                {profile.location}
              </p>
            </div>
          </div>
        </footer>

        <Code2
          aria-hidden="true"
          className="absolute bottom-7 right-7 hidden size-5 text-foreground/12 sm:block"
        />
      </div>
    </div>
  );
}

export default BusinessCardFront;