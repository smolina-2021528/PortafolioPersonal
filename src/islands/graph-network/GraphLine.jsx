import { motion } from "motion/react";

function GraphLine({
  connection,
  positionType,
  isActive,
  prefersReducedMotion,
}) {
  const start =
    connection.from.position[positionType];

  const end =
    connection.to.position[positionType];

  return (
    <motion.line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      vectorEffect="non-scaling-stroke"
      strokeLinecap="round"
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              pathLength: 0,
            }
      }
      animate={{
        opacity: isActive ? 0.95 : 0.28,
        pathLength: 1,
        strokeWidth: isActive ? 2 : 1,
        stroke: isActive
          ? "#00F2FE"
          : "rgba(248, 250, 252, 0.32)",
      }}
      transition={{
        opacity: {
          duration: prefersReducedMotion ? 0 : 0.25,
        },
        strokeWidth: {
          duration: prefersReducedMotion ? 0 : 0.25,
        },
        stroke: {
          duration: prefersReducedMotion ? 0 : 0.25,
        },
        pathLength: {
          duration: prefersReducedMotion ? 0 : 0.8,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      style={{
        filter: isActive
          ? "drop-shadow(0 0 6px rgba(0, 242, 254, 0.75))"
          : "none",
      }}
    />
  );
}

export default GraphLine;