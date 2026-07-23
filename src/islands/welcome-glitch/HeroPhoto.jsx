import { ScanFace } from "lucide-react";

function HeroPhoto({ photo, name }) {
  return (
    <div className="relative mx-auto w-full max-w-md lg:mx-0">
      <div
        aria-hidden="true"
        className="absolute -inset-5 rounded-[2.25rem] bg-cyan-electric/8 blur-3xl"
      />

      <div className="relative overflow-hidden rounded-4xl border border-white/12 bg-white/[0.035] p-2 shadow-[0_32px_90px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        <div className="relative aspect-4/5 overflow-hidden rounded-[1.55rem] bg-[#080b12]">
          <img
            src={photo}
            className="h-full w-full object-cover object-center grayscale-[0.15]"
            loading="eager"
            fetchPriority="high"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-background via-transparent to-cyan-electric/5"
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/3 h-px bg-linear-to-r from-transparent via-cyan-electric/45 to-transparent"
          />

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-background/65 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-foreground/70 backdrop-blur-md">
            <ScanFace
              aria-hidden="true"
              className="size-3.5 text-cyan-electric"
            />

            Profile frame
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 rounded-2xl border border-white/10 bg-background/70 p-4 backdrop-blur-md">
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-cyan-electric">
                Visual ID
              </p>

              <p className="mt-1 text-sm font-medium text-foreground">
                {name}
              </p>
            </div>

            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-foreground/45">
              Photo pending
            </span>
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute -right-3 top-12 h-24 w-px bg-linear-to-b from-transparent via-magenta-glitch/55 to-transparent"
      />

      <span
        aria-hidden="true"
        className="absolute -bottom-3 left-12 h-px w-28 bg-linear-to-r from-transparent via-cyan-electric/65 to-transparent"
      />
    </div>
  );
}

export default HeroPhoto;