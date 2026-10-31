/**
 * Animated h1. Words rise in from a blur, then a soft blue wave travels across them on a slow loop.
 * The text is real text (readable by assistive tech); only color and the entrance are animated.
 */
const WORDS = ["Start", "building", "with", "Alvotric"];

export function HeroTitle() {
  return (
    <h1
      id="hero-heading"
      className="text-[clamp(2.25rem,5.4vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
    >
      {WORDS.map((word, i) => (
        <span key={word}>
          <span className="title-word" style={{ ["--i" as string]: i }}>
            {word}
          </span>
          {i < WORDS.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}
