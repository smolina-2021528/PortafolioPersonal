import { useEffect, useMemo, useState } from "react";

function useNodeSelection(nodes) {
  const [selectedNodeId, setSelectedNodeId] =
    useState(null);

  const selectedNode = useMemo(
    () =>
      nodes.find(
        (node) => node.id === selectedNodeId,
      ) ?? null,
    [nodes, selectedNodeId],
  );

  useEffect(() => {
    if (!selectedNodeId) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedNodeId(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [selectedNodeId]);

  const selectNode = (nodeId) => {
    const nodeExists = nodes.some(
      (node) => node.id === nodeId,
    );

    if (nodeExists) {
      setSelectedNodeId(nodeId);
    }
  };

  const clearSelection = () => {
    setSelectedNodeId(null);
  };

  return {
    selectedNodeId,
    selectedNode,
    selectNode,
    clearSelection,
  };
}

export default useNodeSelection;