import { useState } from "react";

const faqItems = [
  { id: 1, question: "What digital marketing services do you offer in Nepal?" },
  { id: 2, question: "Can you help with digital marketing for businesses in specific industries in Nepal?" },
  { id: 3, question: "What is your process for developing a marketing campaign in Nepal?" },
  { id: 4, question: "How do you stay up to date with Nepalese market trends and changes in digital marketing?" },
  { id: 5, question: "Can you help with local search optimization for businesses in Nepal?" },
  { id: 6, question: "How do you handle client communication and reporting for Nepalese clients?" },
];

const answers = {
  1: "We offer a full suite of digital marketing services including social media management, SEO, paid advertising, content creation, branding, and email marketing — all tailored for the Nepali market.",
  2: "Yes! We have experience across multiple industries including retail, hospitality, education, healthcare, and e-commerce in Nepal. We customize our approach for each sector.",
  3: "We start with a discovery call, followed by market research and competitor analysis. We then craft a strategy, present it for approval, and execute with regular performance reviews.",
  4: "Our team actively monitors local news, industry publications, Google Trends, and social platforms to stay ahead of Nepalese market shifts and digital behavior changes.",
  5: "Absolutely. We specialize in local SEO strategies including Google Business Profile optimization, local keyword targeting, and citation building for Nepali businesses.",
  6: "We provide dedicated account managers, weekly check-ins, and monthly reports in clear, understandable formats — fully adapted for our Nepalese clients' needs.",
};

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section className="relative w-full py-4 px-4 md:px-12 lg:px-10 bg-[#0e0d0a] overflow-hidden">

        {/* Section label */}
          <h1 className="text-yellow-400 text-xl font-semibold tracking-wide">
            Frequently Asked Questions (FAQ)
          </h1>
        {/* Ambient glow blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-full px-10 relative z-10">

        {/* FAQ List */}
        <div className="flex flex-col divide-y divide-white/10">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>

                {/* Question row */}
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left group"
                >
                  <span
                    className={`text-sm md:text-base font-medium leading-snug transition-colors duration-200
                      ${isOpen ? "text-yellow-400" : "text-white group-hover:text-yellow-100"}`}
                  >
                    {item.question}
                  </span>

                  {/* Yellow chevron circle */}
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center
                      transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                  >
                    <svg
                      className="w-4 h-4 text-black"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Answer — smooth accordion */}
                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    opacity: isOpen ? 1 : 0,
                    transition: "max-height 0.4s ease, opacity 0.3s ease",
                  }}
                >
                  <p className="pb-5 pr-14 text-sm text-gray-400 leading-relaxed">
                    {answers[item.id]}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;