import { useInView } from "motion/react";
import { useRef } from "react";

function useGaugeAnimation(prefersReducedMotion) {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.05,
    margin: "-5% 0px -10% 0px",
  });

  return {
    containerRef,
    hasStarted: prefersReducedMotion || isInView,
  };
}

export default useGaugeAnimation;