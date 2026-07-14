import { AnimatePresence, motion } from "motion/react";
import {
  Gauge,
  Home,
  Menu,
  Orbit,
  PanelsTopLeft,
  Share2,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import SidebarLink from "./SidebarLink";
import useActiveSection from "./useActiveSection";

const navigationItems = [
  {
    id: "inicio",
    label: "Inicio",
    icon: Home,
  },
  {
    id: "perfil",
    label: "Perfil",
    icon: UserRound,
  },
  {
    id: "habilidades",
    label: "Habilidades",
    icon: Gauge,
  },
  {
    id: "formacion",
    label: "Formación",
    icon: Orbit,
  },
  {
    id: "proyectos",
    label: "Proyectos",
    icon: PanelsTopLeft,
  },
  {
    id: "redes",
    label: "Redes",
    icon: Share2,
  },
];

function RightSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sectionIds = useMemo(
    () => navigationItems.map((item) => item.id),
    [],
  );

  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  const handleNavigate = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        aria-label="Navegación principal por secciones"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      >
        <div className="relative rounded-full border border-white/10 bg-background/80 p-2 shadow-2xl backdrop-blur-xl">
          <span
            aria-hidden="true"
            className="absolute bottom-5 left-1/2 top-5 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-cyan-electric/35 to-transparent"
          />

          <ul className="relative flex flex-col gap-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <SidebarLink
                  item={item}
                  isActive={activeSection === item.id}
                  onNavigate={handleNavigate}
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="fixed bottom-5 right-4 z-50 lg:hidden">
        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.nav
              id="mobile-section-navigation"
              aria-label="Navegación móvil por secciones"
              initial={{
                opacity: 0,
                y: 16,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 12,
                scale: 0.96,
              }}
              transition={{
                duration: 0.18,
              }}
              className="mb-3 w-64 rounded-2xl border border-white/10 bg-background/95 p-3 shadow-2xl backdrop-blur-xl"
            >
              <p className="px-3 pb-3 pt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cyan-electric">
                Navegación
              </p>

              <ul className="space-y-1">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <SidebarLink
                      item={item}
                      isActive={activeSection === item.id}
                      onNavigate={handleNavigate}
                      showLabel
                    />
                  </li>
                ))}
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          aria-label={
            isMobileMenuOpen
              ? "Cerrar menú de navegación"
              : "Abrir menú de navegación"
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-section-navigation"
          onClick={() =>
            setIsMobileMenuOpen(
              (currentState) => !currentState,
            )
          }
          className="ml-auto grid size-13 place-items-center rounded-full border border-cyan-electric/35 bg-background/95 text-cyan-electric shadow-[0_0_28px_rgba(0,242,254,0.2)] backdrop-blur-xl transition-transform hover:scale-105"
        >
          {isMobileMenuOpen ? (
            <X
              aria-hidden="true"
              className="size-5"
            />
          ) : (
            <Menu
              aria-hidden="true"
              className="size-5"
            />
          )}
        </button>
      </div>
    </>
  );
}

export default RightSidebar;