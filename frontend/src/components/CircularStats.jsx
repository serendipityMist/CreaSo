import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { label: "Hours of Support", value: 1500, percent: 85, color: "#F97316" },
  { label: "Projects", value: 500, percent: 65, color: "#FB923C" },
  { label: "Happy Clients", value: 50, percent: 35, color: "#FBBF24" },
  { label: "Hard Workers", value: 15, percent: 20, color: "#D97706" },
];

const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CircularStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <div
      ref={ref}
      className="flex items-center justify-center gap-16 py-32 bg-white"
    >
      {/* SVG GRAPH */}
      <div className="relative w-65 h-65">
        <svg viewBox="0 0 260 260" className="w-full h-full -rotate-90">
          {stats.map((stat, index) => {
            const offset =
              CIRCUMFERENCE -
              (stat.percent / 100) * CIRCUMFERENCE;

            return (
              <motion.circle
                key={index}
                cx="130"
                cy="130"
                r={RADIUS - index * 14}
                fill="transparent"
                stroke={stat.color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE}
                animate={
                  isInView
                    ? { strokeDashoffset: offset }
                    : { strokeDashoffset: CIRCUMFERENCE }
                }
                transition={{
                  duration: 1.6,
                  delay: index * 0.3,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* LABELS */}
      <div className="space-y-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.3 }}
            className="flex items-start gap-4"
          >
            <span
              className="w-3 h-3 rounded-full mt-2"
              style={{ backgroundColor: stat.color }}
            />
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
