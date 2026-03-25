import { useEffect, useRef, useState } from "react";

export function useCountUp(target: string, duration = 2000) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();

    function animate() {
      // Extract numeric value and suffix/prefix
      const match = target.match(/^([A-Za-z\s]*)(\d[\d,]*)(\+?)(.*)$/);
      if (!match) {
        setDisplay(target);
        return;
      }

      const prefix = match[1];
      const numStr = match[2].replace(/,/g, "");
      const plus = match[3];
      const suffix = match[4];
      const end = parseInt(numStr, 10);

      const startTime = performance.now();

      function step(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * end);
        const formatted = current.toLocaleString("en-US");
        setDisplay(`${prefix}${formatted}${plus}${suffix}`);
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }
  }, [target, duration]);

  return { ref, display };
}
