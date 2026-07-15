import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Copy,
  GitBranch,
  Mail,
  RotateCcw,
} from "lucide-react";

function isLinkAvailable(url) {
  return (
    typeof url === "string" &&
    url.length > 0 &&
    !url.includes("[") &&
    !url.toLowerCase().includes("pendiente")
  );
}

function getCopyFeedback(
  copyState,
  emailAvailable,
) {
  if (!emailAvailable) {
    return "Correo pendiente";
  }

  switch (copyState) {
    case "copied":
      return "Correo copiado";

    case "error":
      return "No se pudo copiar";

    case "unavailable":
      return "Correo pendiente";

    default:
      return "Copiar correo";
  }
}

function SocialAccess({
  label,
  value,
  url,
  icon: Icon,
  external = true,
}) {
  const linkAvailable =
    isLinkAvailable(url);

  const content = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-white/9 bg-white/2.5 text-cyan-electric">
        <Icon
          aria-hidden="true"
          className="size-4"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[0.52rem] uppercase tracking-[0.17em] text-foreground/30">
          {label}
        </span>

        <span className="mt-1 block truncate text-sm text-foreground/65">
          {value}
        </span>
      </span>

      {linkAvailable ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 text-foreground/25 transition-colors group-hover:text-cyan-electric"
        />
      ) : (
        <span className="font-mono text-[0.48rem] uppercase tracking-[0.14em] text-foreground/25">
          Pending
        </span>
      )}
    </>
  );

  if (!linkAvailable) {
    return (
      <div className="flex min-h-20 items-center gap-3 rounded-2xl border border-white/7 bg-background/35 px-4 opacity-65">
        {content}
      </div>
    );
  }

  return (
    <a
      href={url}
      target={
        external ? "_blank" : undefined
      }
      rel={
        external ? "noreferrer" : undefined
      }
      onClick={(event) =>
        event.stopPropagation()
      }
      className="group flex min-h-20 items-center gap-3 rounded-2xl border border-white/7 bg-background/35 px-4 transition-colors hover:border-cyan-electric/25 hover:bg-cyan-electric/4"
    >
      {content}
    </a>
  );
}

function BusinessCardBack({
  profile,
  socialLinks,
  emailAvailable,
  copyState,
  onCopyEmail,
  onFlip,
}) {
  const githubValue = "smolina-2021528";

  const linkedinValue = isLinkAvailable(
    socialLinks.linkedin.url,
  )
    ? "Perfil profesional"
    : "Perfil pendiente";

  const displayedEmail = emailAvailable
    ? profile.email
    : "Correo pendiente";

  const copyFeedback = getCopyFeedback(
    copyState,
    emailAvailable,
  );

  const handleFlip = (event) => {
    event.stopPropagation();
    onFlip();
  };

  const handleCopy = async (event) => {
    event.stopPropagation();
    await onCopyEmail();
  };

  return (
    <div className="relative size-full overflow-hidden rounded-4xl border border-cyan-electric/18 bg-[#0d121d] p-6 shadow-[0_35px_100px_rgba(0,0,0,0.65)] sm:p-8">
      <div
        aria-hidden="true"
        className="cyber-grid absolute inset-0 opacity-18"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-20 size-72 rounded-full bg-cyan-electric/[0.07] blur-[90px]"
      />

      <span
        aria-hidden="true"
        className="absolute inset-x-16 top-0 h-px bg-linear-to-r from-transparent via-cyan-electric to-transparent"
      />

      <div className="relative flex h-full flex-col">
        <header className="flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-cyan-electric">
              Professional network
            </p>

            <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-foreground sm:text-3xl">
              Conecta conmigo
            </h3>

            <p className="mt-2 text-sm text-foreground/45">
              Selecciona uno de mis canales
              profesionales.
            </p>
          </div>

          <button
            type="button"
            aria-label="Girar tarjeta para volver al frente"
            onClick={handleFlip}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 text-foreground/45 transition-colors hover:border-cyan-electric/30 hover:bg-cyan-electric/5 hover:text-cyan-electric"
          >
            <RotateCcw
              aria-hidden="true"
              className="size-4"
            />
          </button>
        </header>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <SocialAccess
            label="GitHub"
            value={githubValue}
            url={socialLinks.github.url}
            icon={GitBranch}
          />

          <SocialAccess
            label="LinkedIn"
            value={linkedinValue}
            url={socialLinks.linkedin.url}
            icon={BriefcaseBusiness}
          />

          <SocialAccess
            label="Correo"
            value={displayedEmail}
            url={socialLinks.email.url}
            icon={Mail}
            external={false}
          />
        </div>

        <div className="mt-auto border-t border-white/8 pt-6">
          <button
            type="button"
            disabled={!emailAvailable}
            onClick={handleCopy}
            className={`flex min-h-13 w-full items-center justify-center gap-3 rounded-2xl border px-5 font-mono text-[0.58rem] uppercase tracking-[0.16em] transition-all ${
              copyState === "copied"
                ? "border-cyan-electric bg-cyan-electric text-background"
                : emailAvailable
                  ? "border-cyan-electric/25 bg-cyan-electric/5.5 text-cyan-electric hover:border-cyan-electric/50 hover:bg-cyan-electric/10"
                  : "cursor-not-allowed border-white/8 text-foreground/25"
            }`}
          >
            {copyState === "copied" ? (
              <Check
                aria-hidden="true"
                className="size-4"
              />
            ) : (
              <Copy
                aria-hidden="true"
                className="size-4"
              />
            )}

            {copyFeedback}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusinessCardBack;