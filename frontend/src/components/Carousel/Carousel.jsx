import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const SLIDES = [
  {
    id: 1,
    image: "/slide1.jpg",
    fallback:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80",
    tag: "Creative Agency",
    headline: ["Graphic", "Design"],
    sub: "Kickstart your projects with print graphic design templates made by global artists.",
    cta: "Get Started",
    link: "/contact",

    shape: (
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full animate-spin"
        style={{ animationDuration: "30s" }}
      >
        <polygon
          points="150,10 280,220 20,220"
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
        <polygon
          points="150,40 260,210 40,210"
          stroke="#facc15"
          strokeWidth="1"
          fill="none"
        />
        <polygon
          points="150,70 240,200 60,200"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
    ),
  },

  {
    id: 2,
    image: "/slide2.jpg",
    fallback:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80",
    tag: "Digital Marketing",
    headline: ["Creative", "Solutions"],
    sub: "Data-driven campaigns that elevate your brand and convert your audience into loyal customers.",
    cta: "View Work",
    link: "/about",

    shape: (
      <svg viewBox="0 0 300 300" className="w-full h-full animate-pulse">
        <circle
          cx="150"
          cy="150"
          r="100"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="150"
          cy="150"
          r="70"
          stroke="#facc15"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="150"
          cy="150"
          r="40"
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  },

  {
    id: 3,
    image: "/slide3.jpg",
    fallback:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80",
    tag: "Web Development",
    headline: ["Development", "Solutions"],
    sub: "Building responsive and engaging websites that drive results and elevate your online presence.",
    cta: "Explore Services",
    link: "/store",

    shape: (
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full animate-spin"
        style={{ animationDuration: "15s" }}
      >
        <rect
          x="50"
          y="50"
          width="200"
          height="200"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        <rect
          x="90"
          y="90"
          width="120"
          height="120"
          stroke="#facc15"
          strokeWidth="2"
          fill="none"
        />
        <rect
          x="120"
          y="120"
          width="60"
          height="60"
          stroke="white"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  },

  {
    id: 4,
    image: "/slide4.jpg",
    fallback:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80",
    tag: "UI / UX Design",
    headline: ["User", "Experience"],
    sub: "Designing beautiful and intuitive experiences that users genuinely enjoy interacting with.",
    cta: "See Designs",
    link: "/services",

    shape: (
      <svg viewBox="0 0 300 300" className="w-full h-full animate-bounce">
        <path
          d="M50 150 Q150 20 250 150 Q150 280 50 150Z"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="150"
          cy="150"
          r="40"
          stroke="#facc15"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
  },

  {
    id: 5,
    image: "/slide5.jpg",
    fallback:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80",
    tag: "Brand Strategy",
    headline: ["Build", "Brands"],
    sub: "Helping businesses create memorable identities and strong digital presence across all modern platforms.",
    cta: "Our Strategy",
    link: "/portfolio",

    shape: (
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full animate-spin"
        style={{ animationDuration: "25s" }}
      >
        <polygon
          points="150,20 280,150 150,280 20,150"
          stroke="#facc15"
          strokeWidth="2"
          fill="none"
        />
        <polygon
          points="150,60 240,150 150,240 60,150"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const contentRef = useRef(null);

  const goTo = (index) => {
    setCurrent(index);
  };

  // GSAP Content Animation
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.children;

    gsap.fromTo(
      elements,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
      }
    );
  }, [current]);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-black">

      {/* Background Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            i === current
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110"
          }`}
        >
          <img
            src={s.image}
            alt={s.tag}
            onError={(e) => {
              e.target.src = s.fallback;
            }}
            className="w-full h-full object-cover"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Floating Shape */}
      <div className="absolute top-20 right-10 w-64 h-64 opacity-20 pointer-events-none z-10">
        {slide.shape}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center px-6 md:px-16 lg:px-24">
        <div key={slide.id} ref={contentRef} className="max-w-2xl">

          {/* Tag */}
          <span className="inline-flex items-center gap-2 text-yellow-400 text-xs font-bold tracking-[4px] uppercase mb-5">
            <span className="w-8 h-px bg-yellow-400" />
            {slide.tag}
          </span>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6">
            {slide.headline[0]}
            <br />
            <span className="text-yellow-400">
              {slide.headline[1]}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mb-8">
            {slide.sub}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-5">
            <Link
              to={slide.link}
              className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 transition-all duration-300 hover:scale-105"
            >
              {slide.cta}

              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            <Link
              to="/about"
              className="text-white border-b border-white/40 hover:border-white transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-10 h-2 bg-yellow-400"
                : "w-2 h-2 bg-white/40 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute bottom-10 right-8 z-30 text-sm font-mono text-white">
        <span className="text-yellow-400 font-bold">
          0{current + 1}
        </span>
        <span className="mx-2">/</span>
        <span>0{SLIDES.length}</span>
      </div>

      {/* Side Navigation */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-2 h-8 bg-yellow-400"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-6 md:left-16 z-30 flex items-center gap-2 text-gray-500 text-[10px] tracking-[4px] uppercase">
        <span className="w-4 h-px bg-gray-600" />
        Scroll
      </div>
    </section>
  );
}