'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, type MotionValue } from 'framer-motion';
import { useRef, useMemo } from 'react';

const whyHelpstaData = [
  {
    q: "„Kennst du deine Nachbarn eigentlich?“",
    a: "Viele Menschen leben anonym in der Stadt – man wohnt Tür an Tür und bleibt trotzdem Fremde. 👉 Mit Helpsta findest du Menschen in deiner Nähe, lernst deine Nachbarschaft kennen und stärkst den Zusammenhalt."
  },
  {
    q: "„Du brauchst Hilfe, aber ein Profi ist zu teuer?“",
    a: "Ob Möbel aufbauen, Einkäufe tragen oder kleine Reparaturen – nicht jeder kann oder will gleich einen Dienstleister beauftragen. 👉 Auf Helpsta findest du schnell jemanden aus deiner Nachbarschaft, der dir hilft – kostenlos, im Tausch oder gegen Bezahlung."
  },
  {
    q: "„Dir fällt es schwer, direkt jemanden um Hilfe zu bitten?“",
    a: "Im echten Leben ist die Hemmschwelle groß: Wen frage ich? Wird es unangenehm? 👉 Mit Helpsta stellst du deine Anfrage digital – klar und offen sichtbar für deine Nachbarschaft. Wer helfen möchte, meldet sich direkt bei dir. Einfach, unkompliziert und sicher."
  },
  {
    q: "„Warum sollte überhaupt jemand helfen?“",
    a: "Helfen ist schön – und bei Helpsta wird es zusätzlich belohnt. 👉 Für jede abgeschlossene Hilfe erhalten beide Seiten Helpsta Coins. Diese kannst du bei Cafés, Restaurants oder Shops einlösen – oder für Premium-Features in der App nutzen."
  },
  {
    q: "„Was bringt das den Partnern?“",
    a: "Lokale Cafés, Restaurants und Läden wollen neue Kundschaft gewinnen. 👉 Mit Helpsta werden sie Teil der Nachbarschaftshilfe, gewinnen Sichtbarkeit und neue Stammkunden – eine Win-Win-Situation für alle."
  },
  {
    q: "„Wo startet Helpsta?“",
    a: "Wir starten in Nürnberg-Gostenhof und wachsen Schritt für Schritt in weitere Stadtteile und Städte. 👉 Schon bald kannst du in jeder Stadt unkompliziert Hilfe finden oder selbst helfen – und dabei Teil einer starken Gemeinschaft werden."
  }
];

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

export default function WhyHelpsta() {
  const outerRef = useRef<HTMLDivElement>(null);
  
  // Pin a bit longer so last card fully shows
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end center"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const windows = useRevealWindows(whyHelpstaData.length);

  const inWindow = (p: MotionValue<number>, [a, b]: readonly [number, number]) =>
    useTransform(p, [a, b], [0, 1], { clamp: true });

  // Background parallax
  const yBackground = useTransform(progress, [0, 1], ["-20px", "20px"]);

  return (
    <section
      ref={outerRef}
      id="why-helpsta"
      className="relative h-[500svh] bg-gradient-to-b from-white to-gray-50"
    >
      <div className="sticky top-0 h-[100vh] overflow-hidden isolate flex flex-col">
        {/* Soft gradient background elements */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ y: yBackground }}>
          <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-orange-main/10 to-main-purple/10 blur-3xl" />
          <div className="absolute -bottom-24 right-1/5 h-96 w-96 rounded-full bg-gradient-to-r from-gradient-app-main-1/10 to-gradient-app-main-2/10 blur-3xl" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-4 sm:px-6 py-4">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8 text-center transform-gpu flex-shrink-0"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Warum <span className="text-orange-500">Helpsta?</span>
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mx-auto mt-3 max-w-2xl text-lg text-gray-600 hidden md:block"
            >
              Entdecke, wie Helpsta echte Probleme in deiner Nachbarschaft löst und eine starke Gemeinschaft aufbaut
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 md:hidden px-4"
            >
              Nachbarschaftshilfe neu gedacht – digital, einfach und belohnend
            </motion.p>
          </motion.div>

          {/* Content Area */}
          <div className="flex-1 flex items-center justify-center">
            {/* DESKTOP: Central phone with floating cards */}
            <div className="relative hidden md:block w-full max-w-5xl">
              <div className="flex items-center justify-center">
                {/* Central Phone */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                  className="relative z-10 w-[280px] h-[560px] bg-gray-900 rounded-[2.5rem] shadow-2xl p-2"
                >
                  <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden">
                    <img
                      src="/mobile-images/05-Sign-In.png"
                      alt="Helpsta App"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Floating Cards - Sequential display */}
                {whyHelpstaData.map((item, index) => {
                  const currentReveal = useSpring(inWindow(progress, windows[index + 1]), { stiffness: 160, damping: 20 });
                  
                  // Hide previous cards when new ones appear
                  const nextCardWindow = windows[index + 2];
                  const hideWhenNext = nextCardWindow ? 
                    useTransform(progress, [nextCardWindow[0], nextCardWindow[0] + 0.05], [1, 0], { clamp: true }) : 
                    useMotionValue(1);
                  
                  const finalOpacity = useTransform([currentReveal, hideWhenNext], ([current, hide]) => (current as number) * (hide as number));
                  
                  // Better positioning to prevent overlap
                  const isLeft = index % 2 === 0;
                  const direction = isLeft ? -1 : 1;
                  
                  // Improved positioning with more space between cards
                  const finalDistance = 380; // Increased distance from center
                  const initialDistance = 480; // Start even further out
                  
                  // Better vertical distribution to prevent overlap
                  const yPositions = [-220, -80, 80, 220, -150, 150]; // More spread out
                  const yOffset = yPositions[index] || 0;

                  return (
                    <motion.div
                      key={index}
                      className="absolute w-[28rem] bg-white shadow-xl rounded-2xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
                      style={{
                        x: useTransform(currentReveal, [0, 1], [`${direction * initialDistance}px`, `${direction * finalDistance}px`]),
                        y: `${yOffset}px`,
                        opacity: finalOpacity,
                        scale: useTransform(currentReveal, [0, 1], [0.85, 1]),
                        rotate: useTransform(currentReveal, [0, 1], [direction * 8, direction * 2]),
                      }}
                    >
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg mb-3 text-gray-800 leading-tight">{item.q}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                        
                        {/* Decorative element */}
                        <motion.div 
                          className="mt-4 h-1 w-16 bg-gradient-to-r from-orange-main to-main-purple rounded-full"
                          style={{
                            scaleX: useTransform(currentReveal, [0.5, 1], [0, 1]),
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* MOBILE: Vertical layout */}
            <div className="relative md:hidden w-full max-w-sm mx-auto">
              <div className="flex flex-col space-y-6">
                {/* Phone mockup on mobile - with bottom-up animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 60 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 120, 
                    damping: 20,
                    delay: 0.4
                  }}
                  viewport={{ once: true }}
                  className="mx-auto w-[200px] h-[400px] bg-gray-900 rounded-[2rem] shadow-xl p-1.5"
                >
                  <div className="w-full h-full bg-black rounded-[1.5rem] overflow-hidden">
                    <img
                      src="/mobile-images/05-Sign-In.png"
                      alt="Helpsta App"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Phone reflection effect */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.6 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-[2rem] pointer-events-none"
                  />
                </motion.div>

                {/* Cards in vertical layout with enhanced animations */}
                {whyHelpstaData.slice(0, 4).map((item, index) => {
                  const reveal = useSpring(inWindow(progress, windows[index + 1]), { stiffness: 160, damping: 20 });
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div
                      key={index}
                      style={{ 
                        opacity: reveal, 
                        scale: useTransform(reveal, [0, 1], [0.9, 1]),
                        y: useTransform(reveal, [0, 1], [40, 0]),
                        x: useTransform(reveal, [0, 1], [isEven ? -20 : 20, 0]),
                      }}
                      className="transform-gpu"
                    >
                      <motion.div 
                        className="bg-white shadow-lg rounded-xl p-5 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                        whileHover={{ 
                          scale: 1.02,
                          rotateY: isEven ? 2 : -2,
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      >
                        <h3 className="font-semibold text-base mb-3 text-gray-800 leading-tight">{item.q}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.a}</p>
                        
                        {/* Progress indicator */}
                        <motion.div 
                          className="h-1 w-full bg-gray-100 rounded-full overflow-hidden"
                        >
                          <motion.div 
                            className="h-full bg-gradient-to-r from-orange-main to-main-purple rounded-full"
                            style={{
                              scaleX: useTransform(reveal, [0.3, 1], [0, 1]),
                              originX: 0,
                            }}
                          />
                        </motion.div>
                        
                        {/* Card number indicator */}
                        <motion.div 
                          className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-main to-main-purple text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                          style={{
                            scale: useTransform(reveal, [0.5, 1], [0, 1]),
                          }}
                        >
                          {index + 1}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extra runway so last card fully reveals before unpin */}
      <div className="h-[200vh]" />
    </section>
  );
}
