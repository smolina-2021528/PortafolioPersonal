import { useEffect, useState } from "react";

function getInitialSection(sectionIds) {
  if (typeof window === "undefined") {
    return sectionIds[0];
  }

  const hashSection = window.location.hash.replace("#", "");

  return sectionIds.includes(hashSection)
    ? hashSection
    : sectionIds[0];
}

function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(() =>
    getInitialSection(sectionIds),
  );

  useEffect(() => {
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (firstEntry, secondEntry) =>
              secondEntry.intersectionRatio -
              firstEntry.intersectionRatio,
          );

        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handleHashChange = () => {
      const hashSection = window.location.hash.replace("#", "");

      if (sectionIds.includes(hashSection)) {
        setActiveSection(hashSection);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [sectionIds]);

  return activeSection;
}

export default useActiveSection;