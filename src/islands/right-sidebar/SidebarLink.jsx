function SidebarLink({ item, isActive, onNavigate, showLabel = false }) {
  const Icon = item.icon;

  return (
    <a
      href={`#${item.id}`}
      aria-label={`Ir a la sección ${item.label}`}
      aria-current={isActive ? "location" : undefined}
      onClick={onNavigate}
      className={`group relative flex min-h-11 items-center rounded-full transition-colors focus-visible:outline-none ${
        showLabel
          ? "w-full gap-3 px-4 py-2"
          : "w-11 justify-center"
      } ${
        isActive
          ? "bg-cyan-electric text-background shadow-[0_0_24px_rgba(0,242,254,0.22)]"
          : "text-foreground/55 hover:bg-white/8 hover:text-foreground"
      }`}
    >
      <Icon
        aria-hidden="true"
        className="size-4 shrink-0"
        strokeWidth={1.8}
      />

      {showLabel ? (
        <span className="font-mono text-xs uppercase tracking-[0.16em]">
          {item.label}
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[calc(100%+0.75rem)] whitespace-nowrap rounded-md border border-cyan-electric/20 bg-background/95 px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground opacity-0 shadow-xl backdrop-blur-md transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100 group-focus-visible:-translate-x-1 group-focus-visible:opacity-100"
        >
          {item.label}
        </span>
      )}
    </a>
  );
}

export default SidebarLink;