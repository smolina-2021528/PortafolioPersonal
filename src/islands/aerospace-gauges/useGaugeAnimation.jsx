import { useInView } from "motion/react";
import { useRef } from "react";

function useGaugeAnimation(prefersReducedMotion) {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.12,
    margin: "0px 0px -10% 0px",
  });

  return {
    containerRef,
    hasStarted: prefersReducedMotion || isInView,
  };
}

export default useGaugeAnimation;