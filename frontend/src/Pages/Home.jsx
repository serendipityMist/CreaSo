import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel/Carousel";
import CircularStats from "../components/CircularStats";
import FloatingToolbar from "../components/FloatingBar/FloatingtoolBar";
import FAQSection from "../components/FAQSection/FAQSection";

const FACT_LAYOUTS = [
  {
    id: 0,
    title: "Creative Photoshop Tools",
    description:
      "Professional image editing workflows and advanced creative retouching systems.",
    cards: [
      { id: 1, label: "Ps", tip: "Image Editing", offsetY: 30, sizeClass: "w-28 h-28", iconSize: "text-4xl" },
      { id: 2, label: "Ps", tip: "Photo Retouching", offsetY: 0, sizeClass: "w-32 h-32", iconSize: "text-5xl" },
      { id: 3, label: "Ps", tip: "Compositing", offsetY: 55, sizeClass: "w-28 h-28", iconSize: "text-4xl" },
      { id: 4, label: "Ps", tip: "Smart Filters", offsetY: 10, sizeClass: "w-32 h-32", iconSize: "text-5xl" },
      { id: 5, label: "Ps", tip: "Asset Export", offsetY: 40, sizeClass: "w-24 h-24", iconSize: "text-3xl" },
    ],
  },

  {
    id: 1,
    title: "Motion Graphics",
    description:
      "Animated visual storytelling and engaging motion assets for digital campaigns.",
    cards: [
      { id: 1, label: "Ae", tip: "After Effects", offsetY: 40, sizeClass: "w-32 h-32", iconSize: "text-5xl" },
      { id: 2, label: "Ae", tip: "Transitions", offsetY: 10, sizeClass: "w-28 h-28", iconSize: "text-4xl" },
      { id: 3, label: "Ae", tip: "Animation", offsetY: 60, sizeClass: "w-32 h-32", iconSize: "text-5xl" },
      { id: 4, label: "Ae", tip: "Visual FX", offsetY: 20, sizeClass: "w-28 h-28", iconSize: "text-4xl" },
    ],
  },

  {
    id: 2,
    title: "Marketing & Broadcasting",
    description:
      "Strategic promotion systems designed to maximize visibility and conversions.",
    cards: [
      { id: 1, label: "Ad", tip: "Ad Campaigns", offsetY: 20, sizeClass: "w-28 h-28", iconSize: "text-4xl" },
      { id: 2, label: "Ad", tip: "Growth Strategy", offsetY: 0, sizeClass: "w-36 h-36", iconSize: "text-6xl" },
      { id: 3, label: "Ad", tip: "Audience Targeting", offsetY: 45, sizeClass: "w-28 h-28", iconSize: "text-4xl" },
    ],
  },

  {
    id: 3,
    title: "3D & Product Visualization",
    description:
      "Modern 3D product mockups and immersive visual experiences.",
    cards: [
      { id: 1, label: "3D", tip: "3D Assets", offsetY: 40, sizeClass: "w-32 h-32", iconSize: "text-5xl" },
      { id: 2, label: "3D", tip: "Product Mockups", offsetY: 0, sizeClass: "w-40 h-40", iconSize: "text-6xl" },
      { id: 3, label: "3D", tip: "Rendering", offsetY: 55, sizeClass: "w-32 h-32", iconSize: "text-5xl" },
    ],
  },

  {
    id: 4,
    title: "Layer & Design Systems",
    description:
      "Organized scalable design systems for modern creative workflows.",
    cards: [
      { id: 1, label: "UI", tip: "UI Systems", offsetY: 25, sizeClass: "w-28 h-28", iconSize: "text-4xl" },
      { id: 2, label: "UX", tip: "UX Flow", offsetY: 0, sizeClass: "w-36 h-36", iconSize: "text-6xl" },
      { id: 3, label: "DS", tip: "Design Tokens", offsetY: 45, sizeClass: "w-28 h-28", iconSize: "text-4xl" },
      { id: 4, label: "DS", tip: "Wireframes", offsetY: 10, sizeClass: "w-32 h-32", iconSize: "text-5xl" },
    ],
  },

  {
    id: 5,
    title: "Transfer & Delivery",
    description:
      "Smooth project delivery pipelines and collaborative export systems.",
    cards: [
      { id: 1, label: "Ex", tip: "Exporting", offsetY: 20, sizeClass: "w-28 h-28", iconSize: "text-4xl" },
      { id: 2, label: "Ex", tip: "Cloud Transfer", offsetY: 0, sizeClass: "w-32 h-32", iconSize: "text-5xl" },
      { id: 3, label: "Ex", tip: "Optimization", offsetY: 50, sizeClass: "w-28 h-28", iconSize: "text-4xl" },
    ],
  },

  {
    id: 6,
    title: "Clipboard & Documentation",
    description:
      "Documentation systems and collaborative content management.",
    cards: [
      { id: 1, label: "Doc", tip: "Documentation", offsetY: 35, sizeClass: "w-32 h-32", iconSize: "text-4xl" },
      { id: 2, label: "Doc", tip: "Project Notes", offsetY: 0, sizeClass: "w-36 h-36", iconSize: "text-5xl" },
      { id: 3, label: "Doc", tip: "Task Boards", offsetY: 45, sizeClass: "w-28 h-28", iconSize: "text-4xl" },
    ],
  },
];


const PLANS = [
  {
    name: "Basic",
    monthly: 15000,
    highlight: false,
    features: ["Social Media Page Management", "Advertisement/Promotions", "Graphics Posts","a","b","c","d"],
  },
  {
    name: "Startup",
    monthly: 20000,
    highlight: true,
    features: ["Social Media Page Management", "Advertisement/Promotions", "Graphics Posts", "Planning and Strategy", "Monthly Reporting"],
  },
  {
    name: "Enterprise",
    monthly: 55000,
    highlight: false,
    features: ["Social Media Page Management", "Advertisement/Promotions", "Graphics Posts", "Planning and Strategy", "Monthly Reporting", "Competitor Analysis", "Organic Promotion"],
  },
];

const PORTFOLIO_ITEMS = [
  { id: 1, image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80", title: "Abstract Design", link: "/portfolio/1" },
  { id: 2, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80", title: "Brand Identity", link: "/portfolio/2" },
  { id: 3, image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=600&q=80", title: "Digital Art", link: "/portfolio/3" },
  { id: 4, image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80", title: "Team Strategy", link: "/portfolio/4" },
  { id: 5, image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80", title: "Collaboration", link: "/portfolio/5" },
  { id: 6, image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80", title: "Planning", link: "/portfolio/6" },
  { id: 7, image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80", title: "Audio Visual", link: "/portfolio/7" },
  { id: 8, image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80", title: "Mobile Design", link: "/portfolio/8" },
  { id: 9, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", title: "Development", link: "/portfolio/9" },
];

const PRODUCTS = [
  {
    id: 1,
    title: "Social Pack",
    description: "Monthly content + basic ad optimization.",
    price: 50,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    ],
  },
  {
    id: 2,
    title: "Brand Kit",
    description: "Logo refinements + typography and color system.",
    price: 50,
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
    ],
  },
  {
    id: 3,
    title: "Creative Ads",
    description: "High-converting static and motion creatives.",
    price: 50,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    ],
  },
  {
    id: 4,
    title: "Landing Page",
    description: "One-page site designed for conversions.",
    price: 50,
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    ],
  },
];

const TESTIMONIALS = [
  { id: 1, name: "Client Name", position: "Position", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", text: "Smart ideas, clean execution, and great communication from start to finish." },
  { id: 2, name: "Sarah Williams", position: "Marketing Director", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", text: "Outstanding creativity. The campaign assets came in fast and performed better than our previous set." },
  { id: 3, name: "Michael Chen", position: "Founder, StartupX", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", text: "Reliable partner with a strong eye for detail. We finally have a cohesive brand system." },
  { id: 4, name: "Emily Davis", position: "Creative Lead", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", text: "Strategic thinking plus strong design. Our landing pages feel premium and convert." },
];

function FactCard({ card }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center" style={{ marginTop: `${card.offsetY}px` }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div
        className={`absolute -top-10 left-1/2 -translate-x-1/2 z-10 bg-[#1a1a1a] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap transition-all duration-300 ease-out ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
      >
        {card.tip}
        <div className="w-2 h-2 bg-[#1a1a1a] rotate-45 mx-auto -mb-2.5 rounded-sm" />
      </div>

      <div
        className={`${card.sizeClass} rounded-2xl cursor-pointer relative overflow-hidden shadow-lg`}
        style={{
          background: hovered ? "linear-gradient(135deg, #c8b8e8 0%, #b8c8e8 50%, #d8c0f0 100%)" : "linear-gradient(135deg, #d8cce8 0%, #c8d4e8 50%, #e0d0f0 100%)",
          transform: hovered ? "translateY(-12px) scale(1.05)" : "translateY(0px) scale(1)",
          boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.2)" : "0 4px 12px rgba(0,0,0,0.1)",
          transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div className="absolute inset-0 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%)", opacity: hovered ? 0.3 : 0 }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`${card.iconSize} font-black select-none transition-transform duration-300 ${hovered ? "scale-110" : "scale-100"}`}
            style={{ background: "linear-gradient(135deg, #1f6fff 0%, #0d3eb5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Georgia', serif", letterSpacing: "-2px" }}
          >
            Ps
          </span>
        </div>
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/40" />
      </div>
    </div>
  );
}

export default function Home() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [factDot, setFactDot] = useState(3);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const [currentImageIndexes, setCurrentImageIndexes] = useState(() =>
    PRODUCTS.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {})
  );

  const prices = useMemo(() => {
    return PLANS.map((plan) => ({
      ...plan,
      price: isMonthly ? plan.monthly : plan.monthly * 12,
      cadence: isMonthly ? "month" : "year",
    }));
  }, [isMonthly]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndexes((prev) => {
        const next = { ...prev };
        for (const product of PRODUCTS) {
          next[product.id] = ((next[product.id] ?? 0) + 1) % product.images.length;
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToImage = (productId, index) => setCurrentImageIndexes((prev) => ({ ...prev, [productId]: index }));

  return (
    <main className="pt-16">
      <Carousel />
      {/* {//this is the below section of the carousel/image slider} */}
      <section className="relative w-full py-5 px-4 bg-white z-10">

        <div className="max-w-7xl mx-auto">
          <div className=" mb-5">
            <p className="text-xl font-bold mb-2">Subscription Plan</p>
            <h2 className="text-xl md:text-xl  text-black">In this section, you can learn more about available pricing plans and included services. Even if you own a small business and don’t
              need big marketing campaign, we have what to offer.</h2>
          </div>
          <div className="flex justify-center mb-6 relative z-20">
            <div className="relative bg-gray-200 rounded-full w-56 h-12 flex items-center p-1">
              <div className={`absolute top-1 left-1 h-10 w-[calc(50%-0.25rem)] rounded-full bg-black transition-transform duration-300 ease-in-out ${isMonthly ? "translate-x-0" : "translate-x-[calc(100%+0.25rem)]"}`} />
              <button type="button" onClick={() => setIsMonthly(true)} className={`relative z-10 w-1/2 text-sm font-medium transition-colors duration-300 ${isMonthly ? "text-white" : "text-gray-600"}`}>
                Monthly
              </button>
              <button type="button" onClick={() => setIsMonthly(false)} className={`relative z-10 w-1/2 text-sm font-medium transition-colors duration-300 ${!isMonthly ? "text-white" : "text-gray-600"}`}>
                Yearly
              </button>
            </div>
          </div>
          {/* three boxes for subscription */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prices.map((plan) => (
              <div key={plan.name} className={`rounded-xl p-8 shadow-lg transition-transform hover:-translate-y-2 ${plan.highlight ? "bg-gradient-to-b from-gray-700 to-black text-white" : "bg-white text-black border"}`}>
                <h3 className="text-2xl  font-bold mb-2">{plan.name.toUpperCase()}</h3>
                <div className="mb-2">
                  <span className="text-sm">RS</span>
                  <span className="text-4xl font-bold ml-1">{plan.price.toLocaleString()}</span>
                  <span className="text-sm opacity-70 ml-1">/{plan.cadence}</span>
                </div>
                <ul className="space-y-1 mb-8 text-sm list-disc list-inside">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link to="/contact" className={`block text-center w-full py-2 rounded-full text-sm font-medium transition ${plan.highlight ? "bg-white text-black hover:bg-yellow-500" : "border border-black hover:bg-black hover:text-white"}`}>
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why creaso section */}
      <section className="relative w-full py-16 px-4 md:px-8 lg:px-10 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-6">
              <div className="flex items-start ">
                <h2 className="text-yellow-500 text-xl md:text-2xl font-semibold">Why CreaSo?</h2>
              </div>
              <p className="text-white text-base md:text-lg leading-relaxed max-w-xl">
                A small team with a sharp process: design, iterate, ship. We focus on consistent quality and measurable improvements across content, ads, and landing pages.
              </p>

              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300">
                <span className="font-medium">Get Started</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Team working together" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our portfolio */}
      <section className="relative w-full py-4 px-4 md:px-8 lg:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-2">
            <div className="flex items-start  mb-4">
              <h2 className="text-gray-700 text-xl md:text-2xl font-semibold">Our Portfolio</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 auto-rows-[200px]">
            {PORTFOLIO_ITEMS.map((item, idx) => {
              const sizeClass = idx === 1 || idx === 2 ? "col-span-2 row-span-2" : "col-span-2 row-span-1";
              return (
                <Link key={item.id} to={item.link} className={`group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 ${sizeClass}`}>
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full text-sm font-medium">
                        View Project
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {/* Store Section */}
      <section className="relative w-full py-4 px-4 md:px-8 lg:px-10 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">

          <div className="flex items-start gap-3 mb-4">
            <h2 className="text-yellow-500 text-lg md:text-xl font-medium">Store</h2>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
            {PRODUCTS.map((product) => {
              const currentIndex = currentImageIndexes[product.id] || 0;
              return (
                <div key={product.id} className="flex flex-col">
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden mb-4">
                    <div className="aspect-square p-6">
                      <img src={product.images[currentIndex]} alt={`${product.title} - image ${currentIndex + 1}`} className="w-full h-full object-cover rounded-lg transition-opacity duration-500" />
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {product.images.map((_, index) => (
                        <button key={index} type="button" onClick={() => goToImage(product.id, index)} className={`transition-all duration-300 ${index === currentIndex ? "w-8 h-2 bg-white rounded-full" : "w-2 h-2 bg-white/50 rounded-full hover:bg-white/80"}`} aria-label={`Show image ${index + 1}`} />
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-black font-bold text-base mb-1">{product.title}</h3>
                        <p className="text-gray-600 text-xs">{product.description}</p>
                      </div>
                      <div className="text-right ml-3">
                        <div className="flex items-start gap-1">
                          <span className="text-xs text-gray-600 mt-0.5">RS</span>
                          <span className="text-xl font-bold text-black">{product.price}</span>
                        </div>
                      </div>
                    </div>
                    <Link to="/store" className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                      <span>View Details</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CircularStats />
      {/* Testimonials Section */}
      <section className="relative w-full  py-4 px-4 md:px-8 lg:px-10 bg-black overflow-hidden border border-red">
        <div className="max-w-full relative z-10">
          <div className="mb-5 border rounded-lg">
            <div className="flex items-start gap-3">
              <h2 className="text-yellow-500 text-lg md:text-xl font-medium">Testimonials</h2>
            </div>
          </div>

          <div className="relative">
            <div className="bg-black backdrop-blur-sm rounded-2xl p-8 md:p-10 ">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ">
                    <img src={TESTIMONIALS[currentTestimonial].image} alt={TESTIMONIALS[currentTestimonial].name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-lg md:text-xl font-bold mb-1">{TESTIMONIALS[currentTestimonial].name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{TESTIMONIALS[currentTestimonial].position}</p>
                  <p className="text-white text-sm md:text-base leading-relaxed">{TESTIMONIALS[currentTestimonial].text}</p>
                </div>
              </div>
            </div>

            <div className="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
              {TESTIMONIALS.map((_, index) => (
                <button key={index} type="button" onClick={() => setCurrentTestimonial(index)} className={`transition-all duration-300 rounded-full ${index === currentTestimonial ? "w-2.5 h-2.5 bg-yellow-500 shadow-md" : "w-2 h-2 bg-white hover:bg-gray-500"}`} aria-label={`Show testimonial ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Simple Facts about Us Section */}
      <section
        className="relative w-full overflow-hidden py-6 mt-0"
        style={{
          background: "#f0eef5",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="px-10   max-w-full">
          <div className="flex flex-col gap-2 mb-1">
            <span className="text-xl font-semibold text-gray-500 tracking-widest uppercase">
              Some Fact About Us
            </span>
            <p className="text-lg text-slate-400 font-medium mb-2 ">
            In this section, you can learn more about available pricing plans and included services. 
            Even if you own a small business and don’t need big marketing campaign, we have what to offer.
          </p>
          </div>
          <div className="flex flex-col items-center">
          <h2 className="text-xl font-black text-black mb-2">
            {FACT_LAYOUTS[factDot].title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            {FACT_LAYOUTS[factDot].description}
          </p>
          </div>
        </div>

        {/* Animated Cards */}
        <div className="flex items-center justify-center mb-2 gap-5 px-10 md:px-16 pb-0 flex-wrap">

          {FACT_LAYOUTS[factDot].cards.map((card) => (
            <FactCard key={card.id} card={card} />
          ))}

        </div>
        <div className="flex justify-center mt-10 mb-6">
          <FloatingToolbar
            active={factDot}
            setActive={setFactDot}
          />
        </div>
        {/* Right Side Dots */}
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {FACT_LAYOUTS.map((_, i) => (

            <button
              key={i}
              type="button"
              onClick={() => setFactDot(i)}
              aria-label={`Select fact ${i + 1}`}

              className={`
        rounded-full
        transition-all duration-300 ease-out

        ${factDot === i
                  ? "w-2 h-8 bg-[#FFC107]"
                  : "w-1.5 h-1.5 bg-slate-400/40 hover:bg-slate-400"
                }
      `}
            />

          ))}

        </div>
      </section>

      <FAQSection />
    </main>
  );
}

