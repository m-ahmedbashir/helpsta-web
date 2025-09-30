"use client";

import { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { Download, Smartphone, Zap, Users } from "lucide-react";

const steps = [
  { icon: Download,   title: "Download & Install", desc: "Start in seconds.",            color: "from-main-purple to-purple-600" },
  { icon: Smartphone, title: "Setup Your Profile", desc: "Personalize your experience.", color: "from-orange-main to-red-500" },
  { icon: Zap,        title: "Use Key Features",    desc: "Powerful tools, simple UI.",   color: "from-gradient-app-main-1 to-gradient-app-main-2" },
  { icon: Users,      title: "Connect & Share",     desc: "Join the local community.",    color: "from-green-500 to-teal-500" },
] as const;

/** Build staggered reveal windows: title + one per card across 0.16..0.9 */
function useRevealWindows(count: number) {
  return useMemo(() => {
    const windows: Array<readonly [number, number]> = [];
    windows.push([0.06, 0.16] as const); // title
    const start = 0.16, end = 0.9;
    const slice = (end - start) / Math.max(count, 1);
    for (let i = 0; i < count; i++) {
      const a = start + i * slice;
      const b = a + slice * 0.8;
      windows.push([a, Math.min(b, end)] as const);
    }
    return windows;
  }, [count]);
}

const PATH_D = `
  M 720 60
  C 660 140, 520 210, 380 300
  C 230 395, 250 540, 430 560
  C 640 585, 860 470, 975 420
  C 1120 358, 1200 410, 1170 520
  C 1135 650, 880 690, 640 700
  C 860 770, 1100 820, 1340 820
`;

function ArrowBG({ progress }: { progress: MotionValue<number> }) {
  const pathLength = useSpring(progress, { stiffness: 120, damping: 24, mass: 0.6 });
  const headOpacity = useTransform(progress, [0.9, 1], [0, 1]);

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2"
      viewBox="0 0 1440 900"
      fill="none"
    >
      <path d={PATH_D} stroke="rgba(67,53,167,0.14)" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
      <motion.path
        d={PATH_D}
        stroke="#4335A7"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength }}
        strokeDasharray="1 1"
      />
      <motion.path
        d="M 1298 820 l -42 -24 m 42 24 l -42 24"
        stroke="#4335A7"
        strokeWidth="14"
        strokeLinecap="round"
        style={{ opacity: headOpacity }}
      />
    </svg>
  );
}

export function HowItWorks() {
  const outerRef = useRef<HTMLDivElement>(null);

  // Pin a bit longer so last card fully shows
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end center"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const windows = useRevealWindows(steps.length);

  const inWindow = (p: MotionValue<number>, [a, b]: readonly [number, number]) =>
    useTransform(p, [a, b], [0, 1], { clamp: true });

  const titleReveal = useSpring(inWindow(progress, windows[0]), { stiffness: 160, damping: 20 });

  // Background blob parallax
  const yClouds = useTransform(progress, [0, 1], ["-40px", "40px"]);

  return (
    <section
      ref={outerRef}
      id="how-it-works"
      className="relative h-[500svh] bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="sticky top-0 h-[100vh] overflow-hidden isolate">
        {/* Decorative animated path */}
        <ArrowBG progress={progress} />

        {/* Soft gradient blobs */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ y: yClouds }}>
          <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-main-purple/10 to-orange-main/10 blur-3xl" />
          <div className="absolute -bottom-24 right-1/5 h-96 w-96 rounded-full bg-gradient-to-r from-gradient-app-main-1/10 to-gradient-app-main-2/10 blur-3xl" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
          {/* Title */}
          <motion.div
            style={{ opacity: titleReveal, y: useTransform(titleReveal, [0, 1], [24, 0]) }}
            className="mb-8 text-center transform-gpu"
          >
            <h2 className="text-4xl font-extrabold text-main-purple lg:text-6xl">How it works</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">Scroll—cards stay in one line with a gentle parallax.</p>
          </motion.div>

          {/* DESKTOP: one horizontal line, equal cards */}
          <div className="relative hidden md:block">
            <div className="grid grid-cols-4 gap-6">
              {steps.map((s, i) => {
                // Reveal per card (staggered)
                const reveal = useSpring(inWindow(progress, windows[i + 1]), { stiffness: 160, damping: 20 });
                // Parallax drift up/down; alternate direction for variety
                const dir = i % 2 === 0 ? 1 : -1;
                const drift = useTransform(progress, [0, 1], [dir * 10, -dir * 10]); // px
                const y = useSpring(drift, { stiffness: 120, damping: 18 });
                const scale = useTransform(reveal, [0, 1], [0.98, 1]);

                return (
                  <motion.div key={s.title} style={{ opacity: reveal, y, scale }} className="transform-gpu">
                    <motion.div
                      whileHover={{ rotateX: -3, rotateY: 3, translateZ: 6 }}
                      transition={{ type: "spring", stiffness: 220, damping: 16 }}
                      className="relative h-full rounded-3xl border border-gray-100 bg-white p-7 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transform-gpu"
                    >
                      <div className="absolute -top-4 -left-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${s.color} text-white shadow-lg`}>
                          {i + 1}
                        </div>
                      </div>

                      <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${s.color}`}>
                        <s.icon className="h-8 w-8 text-white" />
                      </div>

                      <h3 className="mb-2 text-center text-xl font-bold text-gray-800">{s.title}</h3>
                      <p className="text-center leading-relaxed text-gray-600">{s.desc}</p>

                      <motion.div style={{ scaleX: reveal }} className="mx-auto mt-6 h-1 w-24 origin-left rounded-full bg-gradient-to-r from-gray-200 to-gray-100" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* MOBILE: one horizontal line with scroll-snap (still a single row) */}
          <div className="md:hidden">
            <div className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {steps.map((s, i) => {
                const reveal = useSpring(inWindow(progress, windows[i + 1]), { stiffness: 160, damping: 20 });
                const dir = i % 2 === 0 ? 1 : -1;
                const drift = useTransform(progress, [0, 1], [dir * 10, -dir * 10]);
                const y = useSpring(drift, { stiffness: 120, damping: 18 });
                const scale = useTransform(reveal, [0, 1], [0.98, 1]);

                return (
                  <motion.div key={s.title} style={{ opacity: reveal, y, scale }} className="snap-center shrink-0 w-[78vw] max-w-[380px] transform-gpu">
                    <div className="relative h-full rounded-3xl border border-gray-100 bg-white p-6 shadow">
                      <div className="absolute -top-3 -left-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${s.color} text-white shadow-lg`}>
                          {i + 1}
                        </div>
                      </div>

                      <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${s.color}`}>
                        <s.icon className="h-7 w-7 text-white" />
                      </div>

                      <h3 className="mb-1 text-center text-lg font-semibold">{s.title}</h3>
                      <p className="text-center text-sm leading-relaxed text-gray-600">{s.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Extra runway so last card fully reveals before unpin */}
      <div className="h-[200vh]" />
    </section>
  );
}
