import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";

export default function Navbar() {
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const itemsRef = useRef([]);

  const drawerTl = useRef(null);
  const [open, setOpen] = useState(false);

  /* ================= DRAWER ANIMATION ================= */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(drawerRef.current, { x: "100%" });
      gsap.set(overlayRef.current, { opacity: 0 });

      drawerTl.current = gsap
        .timeline({ paused: true })
        .to(overlayRef.current, { 
          opacity: 1, 
          duration: 0.2 
        })
        .to(drawerRef.current, { 
          x: 0, 
          duration: 0.3 
        }, 0)
        .from(
          itemsRef.current,
          { 
            x: 40, 
            opacity: 0, 
            stagger: 0.1, 
            duration: 0.3 
          },
          "-=0.1"
        );
    });

    return () => ctx.revert();
  }, []);

  /* ================= FIXED OPEN / CLOSE DRAWER ================= */
  useEffect(() => {
    if (!drawerTl.current) return;

    if (open) {
      document.body.style.overflow = "hidden";
      drawerTl.current.play();
    } else {
      // FIX: Play reverse and handle cleanup properly
      drawerTl.current.reverse();
      
      // FIX: Wait for animation to complete before re-enabling scroll
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 300); // Match animation duration
    }
  }, [open]);

  /* ================= FIX: Handle window resize ================= */
  useEffect(() => {
    const handleResize = () => {
      if (!open) {
        gsap.set(drawerRef.current, { x: "100%" });
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed z-50 h-16 w-full flex items-center justify-between px-6 bg-black/70 backdrop-blur-xl ">
        <div className="flex items-center gap-2">
          <img src="/creaso.svg" alt="Logo" className="h-7 w-7" />
          <span className="font-bold text-yellow-500">CreaSo</span>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer"
        >
          <img src="/hamburger.png" alt="Menu" className="h-6 w-6" />
        </button>
      </header>

      {/* OVERLAY */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-40 bg-black/50"
      />

      {/* DRAWER */}
      <aside
        ref={drawerRef}
        className="fixed right-0 top-0 z-50 h-full w-80 bg-black/90 px-6 pt-6"
      >
        <div className="mb-10 flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            <img src="/cross.png" alt="Close" className="h-5 w-5" />
          </button>
        </div>

        {[
          { label: "Home" },
          { label: "Projects" },
          { label: "Contact" },
          { label: "Home" },
          { label: "Projects" },
          { label: "Contact" },
        ].map((item, i) => (
          <a
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            href="#"
            className="mb-4 block px-5 py-4 text-gray-300"
          >
            {item.label}
          </a>
        ))}
      </aside>
    </>
  );
}