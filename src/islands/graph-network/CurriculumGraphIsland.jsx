import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Network,
  Orbit,
} from "lucide-react";
import { useMemo } from "react";

import curriculumNodes from "../../content/curriculumNodes.json";
import GraphLine from "./GraphLine";
import GraphNode from "./GraphNode";
import NodeDetailCard from "./NodeDetailCard";
import useNodeSelection from "./useNodeSelection";

function getUniqueConnections(nodes) {
  const nodeMap = new Map(
    nodes.map((node) => [node.id, node]),
  );

  const registeredConnections = new Set();
  const connections = [];

  nodes.forEach((node) => {
    node.connections.forEach((targetId) => {
      const targetNode = nodeMap.get(targetId);

      if (!targetNode) {
        return;
      }

      const connectionId = [
        node.id,
        targetId,
      ]
        .sort()
        .join(":");

      if (registeredConnections.has(connectionId)) {
        return;
      }

      registeredConnections.add(connectionId);

      connections.push({
        id: connectionId,
        from: node,
        to: targetNode,
      });
    });
  });

  return connections;
}

function getCategoryMetrics(nodes) {
  return nodes.reduce(
    (metrics, node) => ({
      ...metrics,
      [node.category]:
        (metrics[node.category] ?? 0) + 1,
    }),
    {},
  );
}

function CurriculumGraphIsland() {
  const prefersReducedMotion = Boolean(
    useReducedMotion(),
  );

  const {
    selectedNodeId,
    selectedNode,
    selectNode,
    clearSelection,
  } = useNodeSelection(curriculumNodes);

  const connections = useMemo(
    () => getUniqueConnections(curriculumNodes),
    [],
  );

  const categoryMetrics = useMemo(
    () => getCategoryMetrics(curriculumNodes),
    [],
  );

  const connectedNodeIds = useMemo(() => {
    if (!selectedNode) {
      return new Set();
    }

    return new Set(selectedNode.connections);
  }, [selectedNode]);

  const connectedNodes = useMemo(() => {
    if (!selectedNode) {
      return [];
    }

    return curriculumNodes.filter((node) =>
      selectedNode.connections.includes(node.id),
    );
  }, [selectedNode]);

  return (
    <div className="relative mx-auto w-full max-w-368 px-6 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-20">
      <div
        aria-hidden="true"
        className="absolute right-[10%] top-36 size-80 rounded-full bg-cyan-electric/[0.035] blur-[130px]"
      />

      <motion.header
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                y: 22,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: prefersReducedMotion
            ? 0
            : 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full border border-cyan-electric/20 bg-cyan-electric/5.5 text-cyan-electric">
            <Orbit
              aria-hidden="true"
              className="size-4"
            />
          </span>

          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-electric">
            Learning constellation
          </p>
        </div>

        <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div>
            <h2
              id="formacion-title"
              className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl lg:text-6xl"
            >
              Formación conectada por experiencias.
            </h2>

            <p className="mt-6 max-w-2xl text-base font-light leading-8 text-foreground/58 sm:text-lg">
              Cada nodo representa una experiencia
              independiente que contribuye a mi crecimiento
              académico, técnico y profesional.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-[1.4rem] border border-white/10 bg-white/2.5 p-2">
            <div className="rounded-xl bg-background/55 px-4 py-3">
              <BookOpen
                aria-hidden="true"
                className="size-4 text-cyan-electric"
              />

              <span className="mt-2 block font-mono text-[0.55rem] uppercase tracking-[0.16em] text-foreground/35">
                Formación
              </span>

              <span className="mt-1 block font-mono text-lg font-semibold text-cyan-electric">
                {categoryMetrics.academic ?? 0}
              </span>
            </div>

            <div className="rounded-xl bg-background/55 px-4 py-3">
              <Award
                aria-hidden="true"
                className="size-4 text-cyan-electric"
              />

              <span className="mt-2 block font-mono text-[0.55rem] uppercase tracking-[0.16em] text-foreground/35">
                Certificados
              </span>

              <span className="mt-1 block font-mono text-lg font-semibold text-cyan-electric">
                {categoryMetrics.certification ?? 0}
              </span>
            </div>

            <div className="rounded-xl bg-background/55 px-4 py-3">
              <BriefcaseBusiness
                aria-hidden="true"
                className="size-4 text-cyan-electric"
              />

              <span className="mt-2 block font-mono text-[0.55rem] uppercase tracking-[0.16em] text-foreground/35">
                Proyectos
              </span>

              <span className="mt-1 block font-mono text-lg font-semibold text-cyan-electric">
                {categoryMetrics.project ?? 0}
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="relative mt-12 overflow-hidden rounded-4xl border border-white/10 bg-white/[0.018]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <Network
              aria-hidden="true"
              className="size-4 text-cyan-electric"
            />

            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-foreground/42">
              Curriculum network
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-foreground/32">
            <span className="size-1.5 rounded-full bg-cyan-electric shadow-[0_0_10px_rgba(0,242,254,0.8)]" />

            {selectedNode
              ? `${connectedNodes.length} conexiones activas`
              : `${curriculumNodes.length} nodos disponibles`}
          </div>
        </div>

        <div className="relative min-h-256 overflow-hidden lg:min-h-176">
          <div
            aria-hidden="true"
            className="cyber-grid absolute inset-0 opacity-35"
          />

          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 size-136 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-electric/[0.035]"
          />

          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 size-full lg:hidden"
          >
            {connections.map((connection) => (
              <GraphLine
                key={`mobile-${connection.id}`}
                connection={connection}
                positionType="mobile"
                isActive={
                  Boolean(selectedNodeId) &&
                  (connection.from.id ===
                    selectedNodeId ||
                    connection.to.id ===
                      selectedNodeId)
                }
                prefersReducedMotion={
                  prefersReducedMotion
                }
              />
            ))}
          </svg>

          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden size-full lg:block"
          >
            {connections.map((connection) => (
              <GraphLine
                key={`desktop-${connection.id}`}
                connection={connection}
                positionType="desktop"
                isActive={
                  Boolean(selectedNodeId) &&
                  (connection.from.id ===
                    selectedNodeId ||
                    connection.to.id ===
                      selectedNodeId)
                }
                prefersReducedMotion={
                  prefersReducedMotion
                }
              />
            ))}
          </svg>

          {curriculumNodes.map((node, index) => (
            <GraphNode
              key={node.id}
              node={node}
              index={index}
              isSelected={
                selectedNodeId === node.id
              }
              isConnected={connectedNodeIds.has(
                node.id,
              )}
              onSelect={selectNode}
              prefersReducedMotion={
                prefersReducedMotion
              }
            />
          ))}
        </div>
      </div>

      <div className="relative mt-6">
        <NodeDetailCard
          node={selectedNode}
          connectedNodes={connectedNodes}
          onClose={clearSelection}
          prefersReducedMotion={
            prefersReducedMotion
          }
        />
      </div>
    </div>
  );
}

export default CurriculumGraphIsland;