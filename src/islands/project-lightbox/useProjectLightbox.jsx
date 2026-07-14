import { useCallback, useMemo, useState } from "react";

function useProjectLightbox(projects) {
  const [selectedProjectId, setSelectedProjectId] =
    useState(null);

  const selectedProject = useMemo(
    () =>
      projects.find(
        (project) =>
          project.id === selectedProjectId,
      ) ?? null,
    [projects, selectedProjectId],
  );

  const selectProject = useCallback(
    (projectId) => {
      const projectExists = projects.some(
        (project) => project.id === projectId,
      );

      if (projectExists) {
        setSelectedProjectId(projectId);
      }
    },
    [projects],
  );

  const clearSelection = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  return {
    selectedProjectId,
    selectedProject,
    selectProject,
    clearSelection,
  };
}

export default useProjectLightbox;