import { useEffect } from "react";

let activeScrollLocks = 0;
let previousBodyStyles = null;

function lockDocumentScroll() {
  if (activeScrollLocks === 0) {
    const scrollbarWidth =
      window.innerWidth -
      document.documentElement.clientWidth;

    previousBodyStyles = {
      overflow: document.body.style.overflow,
      paddingRight:
        document.body.style.paddingRight,
    };

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight =
        `${scrollbarWidth}px`;
    }
  }

  activeScrollLocks += 1;
}

function unlockDocumentScroll() {
  activeScrollLocks = Math.max(
    0,
    activeScrollLocks - 1,
  );

  if (
    activeScrollLocks === 0 &&
    previousBodyStyles
  ) {
    document.body.style.overflow =
      previousBodyStyles.overflow;

    document.body.style.paddingRight =
      previousBodyStyles.paddingRight;

    previousBodyStyles = null;
  }
}

function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) {
      return undefined;
    }

    lockDocumentScroll();

    return () => {
      unlockDocumentScroll();
    };
  }, [isLocked]);
}

export default useScrollLock;