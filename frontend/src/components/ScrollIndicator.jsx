import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollIndicator = () => {
  const wrapperRef = useRef(null);
  const lineRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const line = lineRef.current;
    const dot = dotRef.current;

    let lastY = 0;
    let velocity = 0;

    gsap.to(dot, {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const createTrail = (y) => {
      const trail = dot.cloneNode(true);
      trail.style.pointerEvents = "none";
      trail.style.position = "absolute";

      wrapper.appendChild(trail);

      gsap.set(trail, {
        y,
        opacity: 0.45,
        scale: 1,
      });

      gsap.to(trail, {
        opacity: 0,
        scale: 0.7,
        duration: gsap.utils.clamp(0.4, 0.8, 0.5 + velocity * 0.002),
        ease: "power3.out",
        onComplete: () => trail.remove(),
      });
    };

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: "max",
      scrub: 0.6, // 👈 smoother interpolation
      onUpdate: (self) => {
        const travel = line.offsetHeight - dot.offsetHeight;
        const targetY = self.progress * travel;

        // smooth interpolation
        gsap.to(dot, {
          y: targetY,
          duration: 0.2,
          ease: "expo.out",
          overwrite: true,
        });

        velocity = Math.abs(targetY - lastY);

        if (velocity > 1.5) {
          createTrail(targetY);
          lastY = targetY;
        }
      },
    });

    ScrollTrigger.refresh();
    return () => st.kill();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed left-8 top-1/2 -translate-y-1/2 z-60 pointer-events-none"
    >
      <div
        ref={lineRef}
        className="relative h-[60vh]"
      >
        
        <div
          ref={dotRef}
          className="absolute top-0 -left-3.5 w-2 h-2 rounded-full
          bg-yellow-500 
          "
        >
          <div className="absolute inset-0 rounded-full blur-md bg-orange-400 opacity-60" />
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
