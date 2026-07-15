import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const FEEDBACK_DURATION = 2200;

function isEmailAvailable(email) {
  return (
    typeof email === "string" &&
    email.includes("@") &&
    !email.includes("[") &&
    !email.toLowerCase().includes("pendiente")
  );
}

function copyWithTextArea(value) {
  const temporaryTextArea =
    document.createElement("textarea");

  temporaryTextArea.value = value;
  temporaryTextArea.setAttribute(
    "readonly",
    "",
  );

  temporaryTextArea.style.position = "fixed";
  temporaryTextArea.style.left = "-9999px";
  temporaryTextArea.style.opacity = "0";

  document.body.appendChild(
    temporaryTextArea,
  );

  temporaryTextArea.select();
  temporaryTextArea.setSelectionRange(
    0,
    value.length,
  );

  const copySucceeded =
    document.execCommand("copy");

  document.body.removeChild(
    temporaryTextArea,
  );

  if (!copySucceeded) {
    throw new Error(
      "No fue posible copiar el correo.",
    );
  }
}

function useCopyEmail(email) {
  const [copyState, setCopyState] =
    useState("idle");

  const resetTimeoutRef = useRef(null);

  const emailAvailable =
    isEmailAvailable(email);

  const scheduleReset = useCallback(() => {
    window.clearTimeout(
      resetTimeoutRef.current,
    );

    resetTimeoutRef.current =
      window.setTimeout(() => {
        setCopyState("idle");
      }, FEEDBACK_DURATION);
  }, []);

  const copyEmail = useCallback(async () => {
    if (!emailAvailable) {
      setCopyState("unavailable");
      scheduleReset();

      return false;
    }

    try {
      if (
        navigator.clipboard?.writeText &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(
          email,
        );
      } else {
        copyWithTextArea(email);
      }

      setCopyState("copied");
      scheduleReset();

      return true;
    } catch {
      setCopyState("error");
      scheduleReset();

      return false;
    }
  }, [
    email,
    emailAvailable,
    scheduleReset,
  ]);

  useEffect(
    () => () => {
      window.clearTimeout(
        resetTimeoutRef.current,
      );
    },
    [],
  );

  return {
    copyState,
    copyEmail,
    emailAvailable,
  };
}

export default useCopyEmail;