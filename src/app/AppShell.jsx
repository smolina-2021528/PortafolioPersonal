import { Outlet } from "react-router";

function AppShell() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-md bg-cyan-electric px-4 py-2 font-mono text-sm font-semibold text-background transition-transform focus:translate-y-0"
      >
        Saltar al contenido
      </a>

      <main id="main-content" tabIndex="-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AppShell;