"use client";

import { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { Download, Users, MessageSquare, Gift } from "lucide-react";
import { useTranslations } from 'next-intl';

// We'll get the steps from translations
const stepKeys = ['download', 'post', 'connect', 'rewards'] as const;
const stepIcons = [Download, MessageSquare, Users, Gift] as const;
const stepColors = [
  "from-main-purple to-purple-600",
  "from-orange-main to-red-500", 
  "from-gradient-app-main-1 to-gradient-app-main-2",
  "from-green-500 to-teal-500"
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
  const t = useTranslations();
  
  // Load the how it works translations
  const howItWorksTranslations = useMemo(() => {
    try {
      // We'll access the translations through the t function
      return {
        title: t('HowItWorks.title'),
        subtitle: t('HowItWorks.subtitle'),
        subtitleMobile: t('HowItWorks.subtitleMobile'),
        steps: stepKeys.map(key => ({
          title: t(`HowItWorks.steps.${key}.title`),
          description: t(`HowItWorks.steps.${key}.description`)
        }))
      };
    } catch (error) {
      // Fallback to English if translations fail
      return {
        title: "How it works",
        subtitle: "Join thousands of neighbors building stronger communities together",
        subtitleMobile: "Follow these simple steps to start helping your community",
        steps: [
          { title: "Download & Join", description: "Get the Helpsta app and create your community profile in minutes." },
          { title: "Post or Help", description: "Share problems you need solved or offer help to neighbors in need." },
          { title: "Connect & Solve", description: "Match with community members and collaborate to solve real problems." },
          { title: "Earn & Redeem", description: "Collect reward points for helping and redeem them at local partner stores." }
        ]
      };
    }
  }, [t]);
  
  // Create steps with icons and colors
  const steps = useMemo(() => 
    howItWorksTranslations.steps.map((step, i) => ({
      icon: stepIcons[i],
      title: step.title,
      desc: step.description,
      color: stepColors[i]
    })), [howItWorksTranslations.steps]);

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
        {/* Decorative animated path - hidden on mobile */}
        <div className="hidden md:block">
          <ArrowBG progress={progress} />
        </div>

        {/* Mobile-specific decorative elements */}
        <div className="md:hidden pointer-events-none absolute inset-0 -z-10">
          {/* Vertical connecting line */}
          <motion.div 
            className="absolute left-1/2 top-1/2 h-[60%] w-0.5 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-main-purple/20 via-orange-main/20 to-gradient-app-main-1/20"
            style={{ 
              scaleY: useTransform(progress, [0.2, 0.8], [0, 1]),
              opacity: useTransform(progress, [0.1, 0.3, 0.7, 0.9], [0, 0.6, 0.6, 0])
            }}
          />
          {/* Small decorative dots */}
          <div className="absolute left-1/2 top-1/3 h-2 w-2 -translate-x-1/2 rounded-full bg-main-purple/30" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-orange-main/30" />
          <div className="absolute left-1/2 top-2/3 h-2 w-2 -translate-x-1/2 rounded-full bg-gradient-app-main-1/30" />
        </div>

        {/* Soft gradient blobs */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ y: yClouds }}>
          <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-main-purple/10 to-orange-main/10 blur-3xl" />
          <div className="absolute -bottom-24 right-1/5 h-96 w-96 rounded-full bg-gradient-to-r from-gradient-app-main-1/10 to-gradient-app-main-2/10 blur-3xl" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-start md:justify-center px-6 py-4 md:py-0">
          {/* Title */}
          <motion.div
            style={{ opacity: titleReveal, y: useTransform(titleReveal, [0, 1], [24, 0]) }}
            className="mb-6 md:mb-8 text-center transform-gpu"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-main-purple lg:text-6xl">{howItWorksTranslations.title}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600 hidden md:block">{howItWorksTranslations.subtitle}</p>
            <p className="mx-auto mt-2 md:mt-3 max-w-2xl text-sm md:text-base text-gray-600 md:hidden">{howItWorksTranslations.subtitleMobile}</p>
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

          {/* MOBILE: vertical layout with 2x2 grid */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-sm sm:max-w-2xl mx-auto pb-8">
              {steps.map((s, i) => {
                const reveal = useSpring(inWindow(progress, windows[i + 1]), { stiffness: 160, damping: 20 });
                const dir = i % 2 === 0 ? 1 : -1;
                const drift = useTransform(progress, [0, 1], [dir * 4, -dir * 4]); // Further reduced drift for mobile
                const y = useSpring(drift, { stiffness: 120, damping: 18 });
                const scale = useTransform(reveal, [0, 1], [0.96, 1]);

                return (
                  <motion.div 
                    key={s.title} 
                    style={{ opacity: reveal, y, scale }} 
                    className="transform-gpu"
                  >
                    <motion.div
                      whileHover={{ rotateX: -2, rotateY: 2, translateZ: 4 }}
                      transition={{ type: "spring", stiffness: 220, damping: 16 }}
                      className="relative h-full rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-lg hover:-translate-y-1 hover:shadow-xl transform-gpu"
                    >
                      <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3">
                        <div className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-r ${s.color} text-white shadow-lg text-xs sm:text-sm font-bold`}>
                          {i + 1}
                        </div>
                      </div>

                      <div className={`mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-r ${s.color}`}>
                        <s.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                      </div>

                      <h3 className="mb-1 sm:mb-2 text-center text-base sm:text-lg font-bold text-gray-800">{s.title}</h3>
                      <p className="text-center text-xs sm:text-sm leading-relaxed text-gray-600">{s.desc}</p>

                      <motion.div 
                        style={{ scaleX: reveal }} 
                        className="mx-auto mt-3 sm:mt-4 h-0.5 w-12 sm:w-16 origin-left rounded-full bg-gradient-to-r from-gray-200 to-gray-100" 
                      />
                    </motion.div>
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
