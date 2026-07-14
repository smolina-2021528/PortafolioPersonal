import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

function useProjectLightbox(projects) {
  const [selectedProjectId, setSelectedProjectId] =
    useState(null);

  const triggerElementRef = useRef(null);

  const selectedProject = useMemo(
    () =>
      projects.find(
        (project) =>
          project.id === selectedProjectId,
      ) ?? null,
    [projects, selectedProjectId],
  );

  const selectProject = useCallback(
    (projectId, triggerElement = null) => {
      const projectExists = projects.some(
        (project) => project.id === projectId,
      );

      if (!projectExists) {
        return;
      }

      triggerElementRef.current = triggerElement;
      setSelectedProjectId(projectId);
    },
    [projects],
  );

  const clearSelection = useCallback(() => {
    setSelectedProjectId(null);

    window.requestAnimationFrame(() => {
      triggerElementRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (!selectedProjectId) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        clearSelection();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [clearSelection, selectedProjectId]);

  return {
    selectedProjectId,
    selectedProject,
    selectProject,
    clearSelection,
  };
}

export default useProjectLightbox;