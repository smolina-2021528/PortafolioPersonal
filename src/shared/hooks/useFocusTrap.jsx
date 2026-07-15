import { useEffect } from "react";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function isElementVisible(element) {
  const elementStyles =
    window.getComputedStyle(element);

  return (
    element.getClientRects().length > 0 &&
    elementStyles.visibility !== "hidden" &&
    elementStyles.display !== "none" &&
    !element.closest("[inert]")
  );
}

function getFocusableElements(container) {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll(
      focusableSelector,
    ),
  ).filter(isElementVisible);
}

function useFocusTrap(
  containerRef,
  {
    isActive,
    initialFocusRef = null,
    restoreFocusRef = null,
    restoreFocus = true,
  },
) {
  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const previouslyFocusedElement =
      document.activeElement instanceof
      HTMLElement
        ? document.activeElement
        : null;

    const focusFrameId =
      window.requestAnimationFrame(() => {
        const focusableElements =
          getFocusableElements(
            containerRef.current,
          );

        const initialElement =
          initialFocusRef?.current ??
          focusableElements[0] ??
          containerRef.current;

        initialElement?.focus();
      });

    const handleTabKey = (event) => {
      if (event.key !== "Tab") {
        return;
      }

      const focusableElements =
        getFocusableElements(
          containerRef.current,
        );

      if (!focusableElements.length) {
        event.preventDefault();
        containerRef.current?.focus();
        return;
      }

      const firstElement =
        focusableElements[0];

      const lastElement =
        focusableElements[
          focusableElements.length - 1
        ];

      const activeElement =
        document.activeElement;

      if (
        event.shiftKey &&
        (
          activeElement === firstElement ||
          !containerRef.current?.contains(
            activeElement,
          )
        )
      ) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (
        !event.shiftKey &&
        activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener(
      "keydown",
      handleTabKey,
    );

    return () => {
      window.cancelAnimationFrame(
        focusFrameId,
      );

      document.removeEventListener(
        "keydown",
        handleTabKey,
      );

      if (!restoreFocus) {
        return;
      }

      const elementToRestore =
        // eslint-disable-next-line react-hooks/exhaustive-deps
        restoreFocusRef?.current ??
        previouslyFocusedElement;

      window.requestAnimationFrame(() => {
        elementToRestore?.focus();
      });
    };
  }, [
    containerRef,
    initialFocusRef,
    isActive,
    restoreFocus,
    restoreFocusRef,
  ]);
}

export default useFocusTrap;