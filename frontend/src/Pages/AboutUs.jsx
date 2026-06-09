import { useMemo, useState, useEffect, useRef } from "react";
import {
  MdOutlineLightbulb,
  MdOutlineStarOutline,
  MdOutlineVerified,
} from "react-icons/md";

import { gsap } from "gsap";

import TeamSection from "../components/TeamSection/TeamSection";
import FloatingToolbar from "../components/FloatingBar/FloatingtoolBar";

// ── Animated SVG Hero ──────────────────────────────────────────────────────────
function AnimatedHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    // collect all animated path/circle elements
    const el = heroRef.current;
    if (!el) return;

    function animatePath(svgEl, delay, duration) {
      if (!svgEl) return;
      const len = svgEl.getTotalLength();
      svgEl.style.strokeDasharray = len;
      svgEl.style.strokeDashoffset = len;
      let raf;
      const start = performance.now() + delay;
      function tick(now) {
        const t = Math.max(0, now - start);
        const cycle = t % duration;
        const half = duration * 0.5;
        const p = cycle < half ? cycle / half : 1 - (cycle - half) / half;
        svgEl.style.strokeDashoffset = len * (1 - p);
        svgEl.style.opacity = 0.12 + p * 0.88;
        raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }

    const cleanups = [];
    const DUR = 4200;
    const SP = 180;
    const CD = 3600;

    const leftTop  = ['lL0','lL1','lL2','lL3','lL4','lL5','lL6','lL7'];
    const leftBot  = ['lR0','lR1','lR2','lR3','lR4','lR5','lR6','lR7'];
    const rightTop = ['rL0','rL1','rL2','rL3','rL4','rL5','rL6','rL7'];
    const rightBot = ['rR0','rR1','rR2','rR3','rR4','rR5','rR6','rR7'];
    const circles  = ['c0','c1','c2','c3','c4','c5','c6','c7','c8','c9','c10'];

    leftTop.forEach((id, i)  => cleanups.push(animatePath(el.querySelector(`#${id}`), i * SP, DUR)));
    leftBot.forEach((id, i)  => cleanups.push(animatePath(el.querySelector(`#${id}`), i * SP + DUR * 0.5, DUR)));
    rightTop.forEach((id, i) => cleanups.push(animatePath(el.querySelector(`#${id}`), i * SP, DUR)));
    rightBot.forEach((id, i) => cleanups.push(animatePath(el.querySelector(`#${id}`), i * SP + DUR * 0.5, DUR)));

    circles.forEach((id, i) => {
      const svgEl = el.querySelector(`#${id}`);
      if (!svgEl) return;
      const len = svgEl.getTotalLength();
      svgEl.style.strokeDasharray = len;
      let raf;
      const start = performance.now() + i * 150;
      function tick(now) {
        const t = Math.max(0, now - start);
        const cycle = t % CD;
        const half = CD * 0.5;
        const p = cycle < half ? cycle / half : 1 - (cycle - half) / half;
        svgEl.style.strokeDashoffset = len * (1 - p);
        svgEl.style.opacity = 0.1 + p * 0.9;
        raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
      cleanups.push(() => cancelAnimationFrame(raf));
    });

    return () => cleanups.forEach(c => c && c());
  }, []);

  const baseLine = { stroke: '#2a0000', strokeWidth: 4, fill: 'none', opacity: 0.85 };
  const flowLine = { stroke: '#ff1a00', strokeWidth: 4, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };

  const glowFilter = (id) => (
    <filter id={id}>
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  );

  // Left side: top-right L-brackets + bottom-left L-brackets, masked by circle on right
  const leftBasePaths = [
    "M280,0 H0 V250", "M265,0 H15 V235", "M250,0 H30 V220", "M235,0 H45 V205",
    "M220,0 H60 V190", "M205,0 H75 V175", "M190,0 H90 V160", "M175,0 H105 V145",
    "M0,250 V0 H280", "M0,235 V15 H265", "M0,220 V30 H250", "M0,205 V45 H235",
    "M0,190 V60 H220", "M0,175 V75 H205", "M0,160 V90 H190", "M0,145 V105 H175",
  ];
  const leftFlowTop = [
    "M280,0 H0 V250", "M265,0 H15 V235", "M250,0 H30 V220", "M235,0 H45 V205",
    "M220,0 H60 V190", "M205,0 H75 V175", "M190,0 H90 V160", "M175,0 H105 V145",
  ];
  const leftFlowBot = [
    "M0,250 V0 H280", "M0,235 V15 H265", "M0,220 V30 H250", "M0,205 V45 H235",
    "M0,190 V60 H220", "M0,175 V75 H205", "M0,160 V90 H190", "M0,145 V105 H175",
  ];

  // Right side: top-left L-brackets + bottom-right L-brackets, masked by circle on left
  const rightBasePaths = [
    "M0,0 H280 V250", "M15,0 H265 V235", "M30,0 H250 V220", "M45,0 H235 V205",
    "M60,0 H220 V190", "M75,0 H205 V175", "M90,0 H190 V160", "M105,0 H175 V145",
    "M280,250 V0 H0", "M280,235 V15 H15", "M280,220 V30 H30", "M280,205 V45 H45",
    "M280,190 V60 H60", "M280,175 V75 H75", "M280,160 V90 H90", "M280,145 V105 H105",
  ];
  const rightFlowTop = [
    "M0,0 H280 V250", "M15,0 H265 V235", "M30,0 H250 V220", "M45,0 H235 V205",
    "M60,0 H220 V190", "M75,0 H205 V175", "M90,0 H190 V160", "M105,0 H175 V145",
  ];
  const rightFlowBot = [
    "M280,250 V0 H0", "M280,235 V15 H15", "M280,220 V30 H30", "M280,205 V45 H45",
    "M280,190 V60 H60", "M280,175 V75 H75", "M280,160 V90 H90", "M280,145 V105 H105",
  ];

  const circleRadii = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

      {/* Red ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 900, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,0,0,0.13) 0%, transparent 68%)',
        }}
      />

      {/* ── Pattern wrapper ── */}
      <div ref={heroRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

        {/* LEFT */}
        <div style={{ width: 280, height: 250, position: 'relative', overflow: 'hidden', background: '#000', flexShrink: 0 }}>
          <svg viewBox="0 0 280 250" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              {glowFilter('gl')}
              <mask id="leftMask">
                <rect width="280" height="250" fill="white"/>
                <circle cx="280" cy="125" r="108" fill="black"/>
              </mask>
            </defs>
            <g mask="url(#leftMask)">
              {leftBasePaths.map((d, i) => <path key={i} d={d} style={baseLine}/>)}
            </g>
            <g mask="url(#leftMask)">
              {leftFlowTop.map((d, i) => <path key={i} id={`lL${i}`} d={d} style={flowLine} filter="url(#gl)"/>)}
              {leftFlowBot.map((d, i) => <path key={i} id={`lR${i}`} d={d} style={flowLine} filter="url(#gl)"/>)}
            </g>
          </svg>
        </div>

        {/* CENTER */}
        <div style={{ width: 250, height: 250, position: 'relative', flexShrink: 0 }}>
          <svg viewBox="0 0 250 250" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="gc">
                <feGaussianBlur stdDeviation="4" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            {/* Black fill punches through side panels */}
            <circle cx="125" cy="125" r="113" fill="#000"/>
            {circleRadii.map(r => <circle key={r} cx="125" cy="125" r={r} style={baseLine}/>)}
            {circleRadii.map((r, i) => (
              <circle key={r} id={`c${i}`} cx="125" cy="125" r={r} style={flowLine} filter="url(#gc)"/>
            ))}
            <circle cx="125" cy="125" r="112" fill="none" stroke="#1a0000" strokeWidth="2"/>
          </svg>
        </div>

        {/* RIGHT */}
        <div style={{ width: 280, height: 250, position: 'relative', overflow: 'hidden', background: '#000', flexShrink: 0 }}>
          <svg viewBox="0 0 280 250" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              {glowFilter('gr')}
              <mask id="rightMask">
                <rect width="280" height="250" fill="white"/>
                <circle cx="0" cy="125" r="108" fill="black"/>
              </mask>
            </defs>
            <g mask="url(#rightMask)">
              {rightBasePaths.map((d, i) => <path key={i} d={d} style={baseLine}/>)}
            </g>
            <g mask="url(#rightMask)">
              {rightFlowTop.map((d, i) => <path key={i} id={`rL${i}`} d={d} style={flowLine} filter="url(#gr)"/>)}
              {rightFlowBot.map((d, i) => <path key={i} id={`rR${i}`} d={d} style={flowLine} filter="url(#gr)"/>)}
            </g>
          </svg>
        </div>

        {/* TITLE overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          pointerEvents: 'none', zIndex: 20,
        }}>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 120,
            color: 'rgba(255,255,255,0.72)',
            letterSpacing: 6,
            textShadow: '0 0 40px rgba(255,0,0,0.4), 0 0 80px rgba(255,0,0,0.15)',
            whiteSpace: 'nowrap',
          }}>
            About Us
          </h1>
        </div>

      </div>
    </section>
  );
}
// ──────────────────────────────────────────────────────────────────────────────

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = useMemo(
    () => [
      {
        icon: <MdOutlineStarOutline size={20} />,
        label: "Quality Product",
        content:
          "Elevate your brand with our quality digital marketing solutions. At CreaSo, we understand that a strong online presence is essential for success in today's digital world.",
      },
      {
        icon: <MdOutlineVerified size={20} />,
        label: "Client Satisfaction",
        content:
          "We work closely with every client to understand their goals and create personalized strategies that truly deliver measurable results.",
      },
      {
        icon: <MdOutlineVerified size={20} />,
        label: "Transparent Process",
        content:
          "Our transparent workflow ensures clear communication, regular updates, and complete trust throughout every stage of the project.",
      },
      {
        icon: <MdOutlineLightbulb size={20} />,
        label: "Innovative and Scalable",
        content:
          "We create scalable systems and innovative digital solutions that adapt and grow with your business.",
      },
    ],
    []
  );

  const LogoCloud = ({ dark = true }) => {
    const base = dark ? "bg-black text-white" : "bg-gray-100 text-black";

    return (
      <div
        className={`relative h-[260px] ${base} overflow-hidden rounded-3xl border ${dark ? "border-yellow-500/20" : "border-gray-300"
          }`}
      >
        <div className="absolute top-0 left-0 w-52 h-52 bg-yellow-500/10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-500/10 blur-3xl rounded-full"></div>

        <div className="absolute top-6 left-[10%] bg-white text-black px-4 py-2 rounded-full shadow-xl"># slack</div>
        <div className="absolute top-10 left-[30%] w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-xl">VW</div>
        <div className="absolute top-6 right-[15%] bg-yellow-100 px-4 py-2 rounded-xl shadow-xl font-bold text-black">FENDI</div>
        <div className="absolute top-16 left-[50%] w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xl">Porsche</div>
        <div className="absolute bottom-10 left-[20%] bg-white px-4 py-1 rounded-full shadow-xl italic text-black">Dior</div>
        <div className="absolute bottom-6 left-[45%] w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-black shadow-xl">BMW</div>
        <div className="absolute bottom-6 right-[15%] w-24 h-10 bg-black border border-white rounded-full flex items-center justify-center text-white text-xs shadow-xl">Mustang</div>
        <div className="absolute bottom-16 right-[30%] w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-xs shadow-xl">MINI</div>
      </div>
    );
  };

  return (
    <main className="bg-black text-white overflow-hidden">

      <AnimatedHero />

      {/* WHO WE ARE */}
      <section className="bg-gray-100 text-black py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-base md:text-lg leading-9 text-gray-700">
            We are a team of talented marketers who love creating smart ideas for clients
            that appreciate uniqueness. We use our creative potential to provide the best ideas.
            We have a wide range of experience, expertise and tools to create and implement your campaigns,
            from carefully curating awesome content to
            optimising it with our great SEO powers as well as outdoor marketing skills.
          </p>
        </div>
      </section>

      {/* WHY CREASO */}
      <section className="relative py-16 px-6 md:px-12 bg-black w-full overflow-hidden">
        <div className="max-w-full  relative z-10">
          <h3 className="text-yellow-400 mb-5 font-semibold text-xl">Why CreaSo?</h3>
          <p className="text-gray-300 leading-relaxed max-w-full mb-6 text-lg">
            We are a team of talented marketers who love creating smart ideas for clients that appreciate uniqueness.
          </p>

          <div className="grid md:grid-cols-2 gap-14 items-center px-2">

            {/* LEFT TABS */}
            <div className="space-y-4">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`group relative overflow-hidden w-full flex items-center gap-3 px-5 py-4 rounded-xl border transition-all duration-500
                  ${activeTab === idx
                      ? "translate-x-5 bg-yellow-500 text-black border-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.5)]"
                      : "bg-[#111111] border-yellow-500/20 text-white hover:border-yellow-500/40"
                    }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition duration-1000"></div>
                  <div className="relative flex items-center gap-3 font-medium">
                    {tab.icon}
                    {tab.label}
                  </div>
                </button>
              ))}
            </div>

            {/* RIGHT CONTENT */}
            <div className="relative">
              <div className="relative bg-white/10 border border-white/20 rounded-2xl p-8 text-gray-300 backdrop-blur-md overflow-hidden min-h-[250px] flex items-center">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"></div>
                <div key={activeTab} className="relative z-10 leading-8 animate-fade">
                  {tabs[activeTab].content}
                </div>
              </div>
              <div className="absolute right-[-35px] top-1/2 -translate-y-1/2 flex flex-col gap-3">
                {tabs.map((_, idx) => (
                  <div
                    key={idx}
                    className={`rounded-full transition-all duration-300 ${activeTab === idx ? "h-8 w-1 bg-yellow-400" : "h-5 w-1 bg-white"}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TEAM */}
      <TeamSection />

      {/* CLIENTS */}
      <section className="relative py-16 px-6 lg:px-6 md:px-12 bg-black w-full">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-yellow-400 mb-1 text-xl font-semibold">Clients</h3>
          <p className="text-gray-400 text-lg mb-8  leading-7">
            We are a team of talented marketers who love creating smart ideas for clients that appreciate uniqueness. We use our creative potential to provide the best ideas.
          </p>
          <LogoCloud dark={true} />
        </div>
      </section>

      {/* SERVICE PARTNERS */}
      <section className="relative py-16 px-6 lg:px-6 md:px-12 bg-white w-full">
        <div className="max-w-7xl mx-auto mb-10">
          <h3 className="text-gray-500 mb-1 text-xl font-semibold">Service Partners</h3>
          <p className="text-gray-600 text-lg mb-8  leading-7">
            We are a team of talented marketers who love creating smart ideas for clients that appreciate uniqueness. We use our creative
            potential to provide the best ideas.
          </p>
          <LogoCloud dark={false} />
        </div>
        <FloatingToolbar />
      </section>

    </main>
  );
}