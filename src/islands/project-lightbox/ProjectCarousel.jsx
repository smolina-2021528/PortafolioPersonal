import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  ImageOff,
} from "lucide-react";
import { useState } from "react";

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
    scale: 0.985,
  }),

  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },

  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -80 : 80,
    scale: 0.985,
  }),
};

function normalizeIndex(index, totalImages) {
  if (!totalImages) {
    return 0;
  }

  return (
    (index % totalImages + totalImages) %
    totalImages
  );
}

function ProjectCarousel({ project }) {
  const prefersReducedMotion = Boolean(
    useReducedMotion(),
  );

  const images = project.images ?? [];

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [direction, setDirection] = useState(1);

  const [failedImages, setFailedImages] =
    useState([]);

  const totalImages = images.length;
  const currentImage = images[currentIndex];

  const hasCurrentImageFailed =
    failedImages.includes(currentImage);

  const changeSlide = (
    requestedIndex,
    nextDirection,
  ) => {
    if (totalImages <= 1) {
      return;
    }

    setDirection(nextDirection);

    setCurrentIndex(
      normalizeIndex(
        requestedIndex,
        totalImages,
      ),
    );
  };

  const showPreviousSlide = () => {
    changeSlide(currentIndex - 1, -1);
  };

  const showNextSlide = () => {
    changeSlide(currentIndex + 1, 1);
  };

  const showSpecificSlide = (slideIndex) => {
    if (slideIndex === currentIndex) {
      return;
    }

    const nextDirection =
      slideIndex > currentIndex ? 1 : -1;

    changeSlide(slideIndex, nextDirection);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        showPreviousSlide();
        break;

      case "ArrowRight":
        event.preventDefault();
        showNextSlide();
        break;

      case "Home":
        event.preventDefault();
        showSpecificSlide(0);
        break;

      case "End":
        event.preventDefault();
        showSpecificSlide(totalImages - 1);
        break;

      default:
        break;
    }
  };

  const handleDragEnd = (
    _event,
    dragInformation,
  ) => {
    const swipeDistance =
      dragInformation.offset.x;

    const swipeVelocity =
      dragInformation.velocity.x;

    const shouldMovePrevious =
      swipeDistance > 65 ||
      swipeVelocity > 450;

    const shouldMoveNext =
      swipeDistance < -65 ||
      swipeVelocity < -450;

    if (shouldMovePrevious) {
      showPreviousSlide();
      return;
    }

    if (shouldMoveNext) {
      showNextSlide();
    }
  };

  const handleImageError = (imagePath) => {
    setFailedImages((currentFailedImages) => {
      if (
        currentFailedImages.includes(imagePath)
      ) {
        return currentFailedImages;
      }

      return [
        ...currentFailedImages,
        imagePath,
      ];
    });
  };

  if (!totalImages) {
    return (
      <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-[1.75rem] border border-dashed border-white/10 bg-background/55 p-8 sm:min-h-88">
        <div
          aria-hidden="true"
          className="cyber-grid absolute inset-0 opacity-25"
        />

        <div className="relative text-center">
          <ImageOff
            aria-hidden="true"
            className="mx-auto size-9 text-foreground/30"
          />

          <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-foreground/35">
            No images registered
          </p>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-foreground/42">
            Este proyecto todavía no tiene capturas
            registradas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label={`Capturas del proyecto ${project.title}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-background/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-electric/60"
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/8 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <ImageIcon
            aria-hidden="true"
            className="size-4 text-cyan-electric"
          />

          <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-foreground/40">
            Visual archive
          </p>
        </div>

        <p className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-foreground/35">
          {String(currentIndex + 1).padStart(
            2,
            "0",
          )}
          {" / "}
          {String(totalImages).padStart(2, "0")}
        </p>
      </div>

      <div className="relative aspect-16/10 min-h-72 overflow-hidden sm:min-h-88">
        <div
          aria-hidden="true"
          className="cyber-grid absolute inset-0 opacity-20"
        />

        <AnimatePresence
          initial={false}
          custom={direction}
          mode="wait"
        >
          <motion.div
            key={`${project.id}-${currentIndex}-${currentImage}`}
            custom={direction}
            variants={
              prefersReducedMotion
                ? undefined
                : slideVariants
            }
            initial={
              prefersReducedMotion
                ? false
                : "enter"
            }
            animate="center"
            exit={
              prefersReducedMotion
                ? undefined
                : "exit"
            }
            transition={{
              duration: prefersReducedMotion
                ? 0
                : 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            drag={
              totalImages > 1 &&
              !prefersReducedMotion
                ? "x"
                : false
            }
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            dragElastic={0.16}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            {hasCurrentImageFailed ? (
              <div className="flex size-full items-center justify-center p-8">
                <div className="max-w-md text-center">
                  <span className="mx-auto grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/2.5 text-foreground/35">
                    <ImageOff
                      aria-hidden="true"
                      className="size-6"
                    />
                  </span>

                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-foreground/42">
                    Image pending
                  </p>

                  <p className="mt-3 text-sm leading-7 text-foreground/45">
                    La captura número{" "}
                    {currentIndex + 1} de{" "}
                    {project.title} todavía no se
                    encuentra en la carpeta pública.
                  </p>

                  <code className="mt-4 block break-all rounded-xl border border-white/8 bg-background/65 p-3 text-left font-mono text-[0.65rem] leading-5 text-cyan-electric/65">
                    {currentImage}
                  </code>
                </div>
              </div>
            ) : (
              <img
                src={currentImage}
                alt={`Captura ${currentIndex + 1} de ${project.title}`}
                loading="lazy"
                decoding="async"
                draggable="false"
                onError={() =>
                  handleImageError(currentImage)
                }
                className="size-full select-none object-contain p-3 sm:p-5"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {totalImages > 1 ? (
          <>
            <button
              type="button"
              aria-label="Mostrar captura anterior"
              onClick={showPreviousSlide}
              className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-background/80 text-foreground/55 shadow-xl backdrop-blur-md transition-colors hover:border-cyan-electric/35 hover:text-cyan-electric sm:left-4"
            >
              <ChevronLeft
                aria-hidden="true"
                className="size-5"
              />
            </button>

            <button
              type="button"
              aria-label="Mostrar captura siguiente"
              onClick={showNextSlide}
              className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-background/80 text-foreground/55 shadow-xl backdrop-blur-md transition-colors hover:border-cyan-electric/35 hover:text-cyan-electric sm:right-4"
            >
              <ChevronRight
                aria-hidden="true"
                className="size-5"
              />
            </button>
          </>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background/90 to-transparent" />

        <div className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between gap-4 sm:inset-x-5">
          <div>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.17em] text-cyan-electric">
              Capture
            </p>

            <p className="mt-1 text-sm text-foreground/65">
              {project.title} /{" "}
              {String(currentIndex + 1).padStart(
                2,
                "0",
              )}
            </p>
          </div>

          {totalImages > 1 ? (
            <p className="hidden font-mono text-[0.52rem] uppercase tracking-[0.15em] text-foreground/30 sm:block">
              Swipe or use arrows
            </p>
          ) : null}
        </div>
      </div>

      {totalImages > 1 ? (
        <div className="flex flex-wrap items-center justify-center gap-2 border-t border-white/8 px-4 py-4">
          {images.map((imagePath, index) => {
            const isActive =
              currentIndex === index;

            return (
              <button
                key={`${imagePath}-${index}`}
                type="button"
                aria-label={`Mostrar captura ${index + 1} de ${totalImages}`}
                aria-current={
                  isActive ? "true" : undefined
                }
                onClick={() =>
                  showSpecificSlide(index)
                }
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-cyan-electric shadow-[0_0_10px_rgba(0,242,254,0.65)]"
                    : "w-3 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            );
          })}
        </div>
      ) : null}

      <p
        aria-live="polite"
        className="sr-only"
      >
        Mostrando captura {currentIndex + 1} de{" "}
        {totalImages} del proyecto {project.title}.
      </p>
    </div>
  );
}

export default ProjectCarousel;