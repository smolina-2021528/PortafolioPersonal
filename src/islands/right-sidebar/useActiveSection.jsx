import { useEffect, useState } from "react";

const VIEWPORT_ANCHOR_RATIO = 0.38;

function getInitialSection(sectionIds) {
  if (typeof window === "undefined") {
    return sectionIds[0] ?? null;
  }

  const hashSection = window.location.hash.replace("#", "");

  return sectionIds.includes(hashSection)
    ? hashSection
    : sectionIds[0] ?? null;
}

function getSectionAtViewportAnchor(sections) {
  const viewportAnchor =
    window.innerHeight * VIEWPORT_ANCHOR_RATIO;

  const sectionAtAnchor = sections.find((section) => {
    const sectionRect =
      section.getBoundingClientRect();

    return (
      sectionRect.top <= viewportAnchor &&
      sectionRect.bottom > viewportAnchor
    );
  });

  if (sectionAtAnchor) {
    return sectionAtAnchor.id;
  }

  const nearestSection = sections.reduce(
    (currentNearest, section) => {
      const sectionRect =
        section.getBoundingClientRect();

      const distanceToAnchor = Math.abs(
        sectionRect.top - viewportAnchor,
      );

      if (
        !currentNearest ||
        distanceToAnchor <
          currentNearest.distanceToAnchor
      ) {
        return {
          id: section.id,
          distanceToAnchor,
        };
      }

      return currentNearest;
    },
    null,
  );

  return nearestSection?.id ?? sections[0]?.id ?? null;
}

function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] =
    useState(() => getInitialSection(sectionIds));

  useEffect(() => {
    const sections = sectionIds
      .map((sectionId) =>
        document.getElementById(sectionId),
      )
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    let animationFrameId = null;

    const updateActiveSection = () => {
      animationFrameId = null;

      const nextActiveSection =
        getSectionAtViewportAnchor(sections);

      setActiveSection((currentSection) =>
        currentSection === nextActiveSection
          ? currentSection
          : nextActiveSection,
      );
    };

    const requestActiveSectionUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId =
        window.requestAnimationFrame(
          updateActiveSection,
        );
    };

    updateActiveSection();

    window.addEventListener(
      "scroll",
      requestActiveSectionUpdate,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      requestActiveSectionUpdate,
    );

    window.addEventListener(
      "hashchange",
      requestActiveSectionUpdate,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        requestActiveSectionUpdate,
      );

      window.removeEventListener(
        "resize",
        requestActiveSectionUpdate,
      );

      window.removeEventListener(
        "hashchange",
        requestActiveSectionUpdate,
      );

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(
          animationFrameId,
        );
      }
    };
  }, [sectionIds]);

  return activeSection;
}

export default useActiveSection;