import GaugeComponent from "react-gauge-component";

function SkillGauge({
  skill,
  hasStarted,
  isSelected,
  prefersReducedMotion,
  replayToken,
}) {
  const gaugeValue = hasStarted ? skill.level : 0;

  const gaugeAnimationKey = [
    skill.id,
    hasStarted ? "active" : "idle",
    replayToken,
  ].join("-");

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[16rem]"
    >
      <GaugeComponent
        key={gaugeAnimationKey}
        id={`technical-gauge-${skill.id}`}
        type="semicircle"
        value={gaugeValue}
        minValue={0}
        maxValue={100}
        className="w-full"
        arc={{
          width: 0.18,
          padding: 0.025,
          cornerRadius: 5,
          nbSubArcs: 5,
          colorArray: [
            "#16303A",
            "#174550",
            "#17626D",
            "#008D98",
            "#00F2FE",
          ],
        }}
        pointer={{
          type: "needle",
          color: "#00F2FE",
          baseColor: "#F8FAFC",
          length: 0.72,
          width: 13,
          animate: !prefersReducedMotion && hasStarted,
          elastic: false,
          animationDuration: 1000,
          animationDelay: 0,
          maxFps: 30,
        }}
        labels={{
          valueLabel: {
            hide: true,
          },
          tickLabels: {
            hideMinMax: true,
            defaultTickValueConfig: {
              hide: true,
            },
            defaultTickLineConfig: {
              hide: true,
            },
          },
        }}
        fadeInAnimation={false}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-[8%] flex justify-center">
        <div
          className={`rounded-full border px-3 py-1 font-mono text-sm font-semibold transition-all duration-300 ${
            isSelected
              ? "border-cyan-electric/50 bg-cyan-electric text-background shadow-[0_0_18px_rgba(0,242,254,0.25)]"
              : "border-white/10 bg-background/85 text-foreground"
          }`}
        >
          {gaugeValue}%
        </div>
      </div>
    </div>
  );
}

export default SkillGauge;