import { useEffect } from "react";

function useEscapeKey(onEscape, isEnabled = true) {
  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      event.preventDefault();
      onEscape(event);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isEnabled, onEscape]);
}

export default useEscapeKey;