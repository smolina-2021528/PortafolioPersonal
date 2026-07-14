function GlitchName({
  children,
  isGlitching,
  as: Element = "span",
  className = "",
}) {
  return (
    <Element
      data-text={children}
      className={`glitch-text ${
        isGlitching ? "is-glitching" : ""
      } ${className}`}
    >
      {children}
    </Element>
  );
}

export default GlitchName;