import { useCallback, useState } from "react";

function useAccordionState(panelIds, initialPanelId = panelIds[0]) {
  const [activePanelId, setActivePanelId] = useState(initialPanelId);

  const selectPanel = useCallback(
    (panelId) => {
      if (panelIds.includes(panelId)) {
        setActivePanelId(panelId);
      }
    },
    [panelIds],
  );

  const moveSelection = useCallback(
    (direction) => {
      setActivePanelId((currentPanelId) => {
        if (!panelIds.length) {
          return null;
        }

        if (direction === "first") {
          return panelIds[0];
        }

        if (direction === "last") {
          return panelIds[panelIds.length - 1];
        }

        const currentIndex = panelIds.indexOf(currentPanelId);
        const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0;
        const offset = direction === "next" ? 1 : -1;

        const nextIndex =
          (safeCurrentIndex + offset + panelIds.length) %
          panelIds.length;

        return panelIds[nextIndex];
      });
    },
    [panelIds],
  );

  return {
    activePanelId,
    selectPanel,
    moveSelection,
  };
}

export default useAccordionState;