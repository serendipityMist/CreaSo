import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const drawerRef  = useRef(null);
  const overlayRef = useRef(null);
  const itemsRef   = useRef([]);
  const drawerTl   = useRef(null);
  const [open, setOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(drawerRef.current,  { x: "100%" });
      gsap.set(overlayRef.current, { opacity: 0 });

      drawerTl.current = gsap
        .timeline({ paused: true })
        .to(overlayRef.current, { opacity: 1, duration: 0.2 })
        .to(drawerRef.current,  { x: 0,       duration: 0.3 }, 0)
        .from(
          itemsRef.current.filter(Boolean),
          { x: 40, opacity: 0, stagger: 0.1, duration: 0.3 },
          "-=0.1"
        );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!drawerTl.current) return;

    if (open) {
      document.body.style.overflow = "hidden";
      drawerTl.current.play();
    } else {
      drawerTl.current.reverse();
      setTimeout(() => { document.body.style.overflow = ""; }, 300);
    }
  }, [open]);

  
  useEffect(() => {
    const handleResize = () => {
      if (!open) gsap.set(drawerRef.current, { x: "100%" });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  return (
    <>
      <header className="fixed z-50 h-16 w-full flex items-center justify-between px-6 bg-black/90 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2">
          <img src="/creaso.svg" alt="Logo" className="h-7 w-7" />
          <span className="font-bold text-yellow-500">CreaSo</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer p-1 flex flex-col gap-1.5 group"
          aria-label="Open menu"
        >
          <span className="block w-6 h-0.5 bg-white transition-colors group-hover:bg-yellow-400" />
          <span className="block w-4 h-0.5 bg-yellow-400" />
          <span className="block w-6 h-0.5 bg-white transition-colors group-hover:bg-yellow-400" />
        </button>
      </header>

      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 ${!open ? "pointer-events-none" : ""}`}
      />

      {/* DRAWER */}
      <aside
        ref={drawerRef}
        className="fixed right-0 top-0 z-50 h-full w-80 bg-black/90 px-6 pt-6"
      >
        <div className="mb-10 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-gray-400 hover:text-white transition-all"
            aria-label="Close menu"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="11" y2="11" />
              <line x1="11" y1="1" x2="1"  y2="11" />
            </svg>
          </button>
        </div>

        {[
          { label: "Home",       to: "/"       },
          { label: "About Us",   to: "/about"  },
          { label: "Store",      to: "/store"  },
          { label: "Blog",       to: "/blog"   },
          { label: "Contact Us", to: "/contact"},
        ].map((item, i) => (
          <NavLink
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `mb-4 block px-5 py-4 rounded-xl text-sm transition-colors duration-200 ${
                isActive ? "text-yellow-400 bg-yellow-400/10" : "text-gray-300 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </aside>
    </>
  );
}