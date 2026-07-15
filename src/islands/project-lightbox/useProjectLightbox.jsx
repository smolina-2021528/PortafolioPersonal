import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import useEscapeKey from "../../shared/hooks/useEscapeKey";
import useScrollLock from "../../shared/hooks/useScrollLock";

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
        (project) =>
          project.id === projectId,
      );

      if (!projectExists) {
        return;
      }

      triggerElementRef.current =
        triggerElement;

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

  const isLightboxOpen = Boolean(
    selectedProjectId,
  );

  useScrollLock(isLightboxOpen);

  useEscapeKey(
    clearSelection,
    isLightboxOpen,
  );

  return {
    selectedProjectId,
    selectedProject,
    selectProject,
    clearSelection,
  };
}

export default useProjectLightbox;