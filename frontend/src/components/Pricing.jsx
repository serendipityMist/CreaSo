import React, { useState } from "react";

const Pricing = () => {
  const [activePlan, setActivePlan] = useState("startup");

  const plans = [
    {
      id: "basic",
      name: "BASIC",
      price: "15,000",
      features: [
        "Social Media Page Management",
        "Advertisement/Promotions",
        "Graphics Posts",
      ],
    },
    {
      id: "startup",
      name: "STARTUP",
      price: "20,000",
      popular: true,
      features: [
        "Social Media Page Management",
        "Advertisement/Promotions",
        "Graphics Posts",
        "Planning and Strategy",
        "Monthly Reporting",
      ],
    },
    {
      id: "enterprise",
      name: "ENTERPRISE",
      price: "55,000",
      features: [
        "Social Media Page Management",
        "Advertisement/Promotions",
        "Graphics Posts",
        "Planning and Strategy",
        "Monthly Reporting",
        "Competitor Analysis",
        "Organic Promotion",
      ],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Header */}
        <h2 className="text-4xl font-bold mb-4">Subscription Plan</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-10">
          In this section, you can learn more about available pricing plans and
          included services. Even if you own a small business and don’t need big
          marketing campaign, we have what to offer.
        </p>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <span className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium">
            Monthly
          </span>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isActive = plan.id === activePlan;

            return (
              <div
                key={plan.id}
                onClick={() => setActivePlan(plan.id)}
                className={`rounded-2xl p-8 border transition-all cursor-pointer ${
                  isActive
                    ? "bg-black text-white shadow-xl scale-105"
                    : "bg-white text-black shadow-md"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <span className="absolute mt-[-20px] ml-[-8px] px-4 py-1 bg-gray-800 text-white text-xs rounded-full">
                    Popular
                  </span>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>

                {/* Price */}
                <div className="my-4">
                  <span className="text-sm">RS</span>
                  <span className="text-4xl font-bold ml-1">
                    {plan.price}
                  </span>
                  <span className="text-sm opacity-70"> /month</span>
                </div>

                {/* Features */}
                <ul className="text-left space-y-2 my-6 text-sm">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <span>•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  className={`mt-4 w-full py-3 rounded-full text-sm font-semibold border transition ${
                    isActive
                      ? "bg-white text-black"
                      : "bg-white text-black border-gray-300"
                  }`}
                >
                  Choose Plan ▶
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
