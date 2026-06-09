import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaBehance,
} from "react-icons/fa6";
import { MdOutlineEmail, MdOutlineLocationOn } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const socials = [
    { icon: FaFacebookF,  href: "#", label: "Facebook"  },
    { icon: FaInstagram,  href: "#", label: "Instagram" },
    { icon: FaYoutube,    href: "#", label: "YouTube"   },
    { icon: FaXTwitter,   href: "#", label: "X"         },
    { icon: FaBehance,    href: "#", label: "Behance"   },
  ];

  const contacts = [
    { icon: MdOutlineEmail,    text: "csnepal45@gmail.com"                         },
    { icon: BsTelephone,       text: "+977-9709020951"                             },
    { icon: MdOutlineLocationOn, text: "Pasikot-07, Budhanilkantha, Kathmandu"     },
  ];

  return (
    <footer className="w-full bg-[#0e0d0a] relative overflow-hidden">

      {/* ── Newsletter Banner ── */}
      <div className="relative z-10 mx-4 md:mx-12 lg:mx-20 -mb-1">
        <div
          className="rounded-2xl px-8 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, #f5c518 0%, #e6ac00 100%)" }}
        >
          <div className="flex-1">
            <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-wide leading-tight">
              Get Our Weekly Case Study
            </h3>
            <p className="text-white text-md md:text-sm mt-1 ">
              Get weekly updates on the newest design stories, case studies and tips right in your mailbox
            </p>
            <p className="text-white font-bold text-md mt-0.5">Subscribe Now!</p>
          </div>

          {/* Email form */}
          <form
            onSubmit={handleSubscribe}
            className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg w-full md:w-auto min-w-[280px]"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-[#1a1a1a] text-white text-sm font-semibold hover:bg-black transition-colors duration-200 whitespace-nowrap"
            >
              {subscribed ? "✓ Done!" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* ── Main Footer Body ── */}
      <div className="relative pt-16 pb-6 px-4 md:px-12 lg:px-20">

        {/* Ambient glow blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-yellow-500/8 rounded-full blur-[120px] pointer-events-none" />

        {/* Watermark background text */}
        <div className="absolute inset-0 flex items-end justify-center pb-12 pointer-events-none select-none overflow-hidden">
          <span
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white/5 whitespace-nowrap tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Creative Solution for your Brand
          </span>
        </div>

        {/* Content grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">

          {/* ── Left: Logo + About + Socials ── */}
          <div className="flex flex-col gap-5">

            {/* Logo */}
            <div className="flex items-center gap-2">
              {/* Sun/gear SVG logo */}
              <div className="w-16 h-16 flex items-center justify-center">
                <img src="/creaso.svg" alt="Creaso logo" className="h-25 w-25" />
              </div>
              <span
                className="text-4xl font-black text-yellow-400 tracking-wide"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                CreaSo
              </span>
            </div>

            {/* Tagline */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Kickstart your projects with print graphic design templates made by global artists.
              With product mockups, UX/UI kits, infographics, logos, scene generators, and more,
              we've got you covered!
            </p>

            {/* Follow Us */}
            <div>
              <p className="text-white text-sm font-semibold mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                {socials.map(({ icon, href, label }) => {
                  const Icon = icon;
                  return (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
                        text-gray-400 hover:text-yellow-400 hover:border-yellow-400/50 hover:bg-yellow-400/10
                        transition-all duration-200"
                    >
                      {Icon ? <Icon size={15} /> : null}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: Contact Info ── */}
          <div className="flex flex-col gap-5 md:items-end">
            <h4 className="text-white text-lg font-bold">Contact Info</h4>
            <div className="flex flex-col gap-4">
              {contacts.map(({ icon, text }, i) => {
                const Icon = icon;
                return (
                  <div key={i} className="flex items-start gap-3 md:flex-row-reverse md:text-right">
                    <div className="w-8 h-8 rounded-full bg-yellow-400/10 border border-yellow-400/20
                      flex items-center justify-center flex-shrink-0">
                      {Icon ? <Icon size={15} className="text-yellow-400" /> : null}
                    </div>
                    <span className="text-gray-400 text-sm leading-snug">{text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="relative z-10 mt-14 pt-5 border-t border-white/8 text-center">
          <p className="text-gray-500 text-xs">
            Sister Company of Edge Infosys. CreaSo (c) {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
