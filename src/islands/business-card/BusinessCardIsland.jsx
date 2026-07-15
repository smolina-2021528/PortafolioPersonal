import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import profile from "../../content/profile.json";
import socialLinks from "../../content/socialLinks.json";
import BusinessCardBack from "./BusinessCardBack";
import BusinessCardFront from "./BusinessCardFront";
import useCopyEmail from "./useCopyEmail";

const focusableElementsSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function BusinessCardIsland() {
  const prefersReducedMotion = Boolean(
    useReducedMotion(),
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] =
    useState(false);

  const launcherRef = useRef(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const {
    copyState,
    copyEmail,
    emailAvailable,
  } = useCopyEmail(profile.email);

  const openCard = () => {
    setIsOpen(true);
  };

  const closeCard = useCallback(() => {
    setIsOpen(false);
    setIsFlipped(false);

    window.requestAnimationFrame(() => {
      launcherRef.current?.focus();
    });
  }, []);

  const toggleCard = () => {
    setIsFlipped(
      (currentState) => !currentState,
    );
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeCard();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        modalRef.current?.querySelectorAll(
          focusableElementsSelector,
        ) ?? [],
      );

      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];

      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [closeCard, isOpen]);

  const handleCardClick = (event) => {
    const clickedElement = event.target;

    if (
      clickedElement instanceof Element &&
      clickedElement.closest("a, button")
    ) {
      return;
    }

    toggleCard();
  };

  const handleCardKeyDown = (event) => {
    if (
      event.target !== event.currentTarget
    ) {
      return;
    }

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      toggleCard();
    }
  };

  const handleImageError = (event) => {
    event.currentTarget.hidden = true;
  };

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        aria-label="Abrir tarjeta profesional de Sebastián Molina"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={openCard}
        className="group fixed bottom-5 left-5 z-70 grid size-16 place-items-center rounded-full border border-cyan-electric/35 bg-background/90 p-1.5 shadow-[0_16px_50px_rgba(0,0,0,0.55),0_0_24px_rgba(0,242,254,0.12)] backdrop-blur-xl transition-transform duration-300 hover:scale-105 sm:bottom-6 sm:left-6"
      >
        <span className="relative grid size-full place-items-center overflow-hidden rounded-full bg-cyan-electric/8 font-mono text-xs font-semibold text-cyan-electric">
          SM

          <img
            src={profile.photo}
            alt=""
            aria-hidden="true"
            loading="lazy"
            onError={handleImageError}
            className="absolute inset-0 size-full object-cover object-center"
          />
        </span>

        <span
          aria-hidden="true"
          className="absolute bottom-0.5 right-0.5 size-3 rounded-full border-2 border-background bg-cyan-electric shadow-[0_0_10px_rgba(0,242,254,0.8)]"
        />

        <span className="pointer-events-none absolute left-[calc(100%+0.75rem)] whitespace-nowrap rounded-lg border border-white/10 bg-background/95 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-foreground/65 opacity-0 shadow-xl backdrop-blur-xl transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100">
          Ver tarjeta
        </span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="business-card-dialog-title"
            aria-describedby="business-card-dialog-description"
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                  }
            }
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: prefersReducedMotion
                ? 0
                : 0.25,
            }}
            className="fixed inset-0 z-100 overflow-y-auto bg-background/80 backdrop-blur-xl"
          >
            <div className="flex min-h-full items-center justify-center p-4 py-8 sm:p-8">
              <motion.div
                initial={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 24,
                        scale: 0.96,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 18,
                        scale: 0.97,
                      }
                }
                transition={{
                  duration: prefersReducedMotion
                    ? 0
                    : 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative w-full max-w-3xl"
              >
                <div className="mb-4 flex items-center justify-between gap-4 px-1">
                  <div>
                    <p
                      id="business-card-dialog-title"
                      className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-cyan-electric"
                    >
                      Professional identity
                    </p>

                    <p
                      id="business-card-dialog-description"
                      className="mt-1 text-sm text-foreground/45"
                    >
                      Haz clic sobre la tarjeta para
                      ver la cara posterior.
                    </p>
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label="Cerrar tarjeta profesional"
                    onClick={closeCard}
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-white/12 bg-background/75 text-foreground/55 transition-colors hover:border-cyan-electric/35 hover:bg-cyan-electric/5.5 hover:text-cyan-electric"
                  >
                    <X
                      aria-hidden="true"
                      className="size-4"
                    />
                  </button>
                </div>

                <div
                  className="relative min-h-128 w-full sm:aspect-[1.586/1] sm:min-h-0"
                  style={{
                    perspective: "1500px",
                  }}
                >
                  <motion.article
                    tabIndex={0}
                    aria-label={
                      isFlipped
                        ? "Tarjeta mostrando las redes profesionales. Presiona Enter para volver al frente."
                        : "Tarjeta profesional de Sebastián Molina. Presiona Enter para ver las redes."
                    }
                    initial={false}
                    animate={{
                      rotateY: isFlipped
                        ? 180
                        : 0,
                    }}
                    transition={{
                      duration:
                        prefersReducedMotion
                          ? 0
                          : 0.65,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    onClick={handleCardClick}
                    onKeyDown={handleCardKeyDown}
                    className="relative size-full cursor-pointer rounded-4xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-electric/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    style={{
                      transformStyle:
                        "preserve-3d",
                      willChange: "transform",
                    }}
                  >
                    <div
                      className={`absolute inset-0 ${
                        isFlipped
                          ? "pointer-events-none"
                          : "pointer-events-auto"
                      }`}
                      style={{
                        backfaceVisibility:
                          "hidden",
                        WebkitBackfaceVisibility:
                          "hidden",
                      }}
                    >
                      <BusinessCardFront
                        profile={profile}
                        emailAvailable={
                          emailAvailable
                        }
                        onFlip={toggleCard}
                      />
                    </div>

                    <div
                      className={`absolute inset-0 ${
                        isFlipped
                          ? "pointer-events-auto"
                          : "pointer-events-none"
                      }`}
                      style={{
                        backfaceVisibility:
                          "hidden",
                        WebkitBackfaceVisibility:
                          "hidden",
                        transform:
                          "rotateY(180deg)",
                      }}
                    >
                      <BusinessCardBack
                        profile={profile}
                        socialLinks={
                          socialLinks
                        }
                        emailAvailable={
                          emailAvailable
                        }
                        copyState={copyState}
                        onCopyEmail={copyEmail}
                        onFlip={toggleCard}
                      />
                    </div>
                  </motion.article>
                </div>

                <p className="mt-4 text-center font-mono text-[0.55rem] uppercase tracking-[0.17em] text-foreground/30">
                  Presiona Escape para cerrar
                </p>
              </motion.div>
            </div>

            <p
              aria-live="polite"
              className="sr-only"
            >
              {copyState === "copied"
                ? "El correo fue copiado al portapapeles."
                : null}

              {copyState === "error"
                ? "No fue posible copiar el correo."
                : null}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default BusinessCardIsland;