'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, type MotionValue } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { useTranslations } from 'next-intl';


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
  const t = useTranslations('whyhelpsta');
  const outerRef = useRef<HTMLDivElement>(null);
  
  // Get translated data
  const whyHelpstaData = t.raw('cards') as Array<{
    question: string;
    answer: string;
    phoneImage: string;
  }>;
  
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
      className="relative h-[400svh] xs:h-[450svh] sm:h-[500svh] bg-gradient-to-b from-white to-gray-50"
    >
      <div className="sticky top-0 h-[100vh] overflow-hidden isolate flex flex-col">
        {/* Soft gradient background elements */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ y: yBackground }}>
          <div className="absolute -top-16 sm:-top-24 left-1/4 h-60 w-60 sm:h-80 sm:w-80 rounded-full bg-gradient-to-r from-orange-main/10 to-main-purple/10 blur-2xl sm:blur-3xl" />
          <div className="absolute -bottom-16 sm:-bottom-24 right-1/5 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gradient-to-r from-gradient-app-main-1/10 to-gradient-app-main-2/10 blur-2xl sm:blur-3xl" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-6 sm:mb-8 lg:mb-10 text-center transform-gpu flex-shrink-0"
          >
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 px-2 sm:px-0">
              {t('title').split(' ').map((word, index) => (
                word === 'Helpsta?' || word === 'Helpsta' ? (
                  <span key={index} className="text-orange-500">{word}</span>
                ) : (
                  <span key={index}>{word} </span>
                )
              ))}
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mx-auto mt-3 max-w-3xl text-base sm:text-lg lg:text-xl text-gray-600 hidden sm:block px-4"
            >
              {t('subtitle')}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mx-auto mt-2 max-w-2xl text-sm xs:text-base text-gray-600 sm:hidden px-4"
            >
              {t('subtitleMobile')}
            </motion.p>
          </motion.div>

          {/* Content Area */}
          <div className="flex-1 flex items-center justify-center">
            {/* DESKTOP & TABLET: Central phone with floating cards */}
            <div className="relative hidden sm:block w-full max-w-6xl">
              <div className="flex items-center justify-center">
                {/* Central Phone */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                  className="relative z-10 w-[200px] h-[400px] sm:w-[240px] sm:h-[480px] md:w-[280px] md:h-[560px] bg-gray-900 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl p-1.5 sm:p-2"
                >
                  <div className="w-full h-full bg-black rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
                    <img
                      src="/mobile-images/Home.png"
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
                  
                  // Responsive positioning - using CSS breakpoint logic
                  const finalDistance = 320; // Base distance, will be adjusted via CSS
                  const initialDistance = 420; // Start further out
                  
                  // Better vertical distribution to prevent overlap
                  const yPositions = [-200, -70, 70, 200, -135, 135]; // More spread out
                  const yOffset = yPositions[index] || 0;

                  return (
                    <motion.div
                      key={index}
                      className="absolute w-[20rem] sm:w-[24rem] md:w-[26rem] lg:w-[28rem] bg-white shadow-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
                      style={{
                        x: useTransform(currentReveal, [0, 1], [`${direction * initialDistance}px`, `${direction * finalDistance}px`]),
                        y: `${yOffset}px`,
                        opacity: finalOpacity,
                        scale: useTransform(currentReveal, [0, 1], [0.85, 1]),
                        rotate: useTransform(currentReveal, [0, 1], [direction * 8, direction * 2]),
                      }}
                    >
                      <div className="space-y-2 sm:space-y-3">
                        <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-gray-800 leading-tight">{item.question}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.answer}</p>
                        
                        {/* Decorative element */}
                        <motion.div 
                          className="mt-3 sm:mt-4 h-1 w-12 sm:w-16 bg-gradient-to-r from-orange-main to-main-purple rounded-full"
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

            {/* MOBILE: Cards overlaying on phone */}
            <div className="relative sm:hidden w-full max-w-md mx-auto px-4">
              <div className="relative flex justify-center items-center min-h-[500px] xs:min-h-[600px]">
                {/* Phone mockup - static background */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 60 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 120, 
                    damping: 20,
                    delay: 0.2
                  }}
                  viewport={{ once: true }}
                  className="relative w-[200px] h-[400px] xs:w-[240px] xs:h-[480px] bg-gray-900 rounded-[2rem] xs:rounded-[2.5rem] shadow-2xl p-2"
                >
                  {/* Phone screen area */}
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-[1.5rem] xs:rounded-[2rem] overflow-hidden">
                    {/* Background app image */}
                    <img
                      src="/mobile-images/05-Sign-In.png"
                      alt="Helpsta App"
                      className="w-full h-full object-cover opacity-20"
                    />
                    
                    {/* Dynamic card notifications - sliding from right like notifications */}
                    <div className="absolute inset-0 flex flex-col justify-start pt-4 xs:pt-6 px-2 xs:px-3 overflow-hidden">
                      {whyHelpstaData.map((item, index) => {
                        const reveal = useSpring(inWindow(progress, windows[index + 1]), { stiffness: 160, damping: 20 });
                        const isActive = reveal.get() > 0.3;
                        
                        return (
                          <motion.div
                            key={index}
                            style={{ 
                              x: useTransform(reveal, [0, 0.3, 0.7, 1], [200, 0, 0, -200]),
                              opacity: useTransform(reveal, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
                              scale: useTransform(reveal, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]),
                            }}
                            className="absolute top-4 xs:top-6 left-2 xs:left-3 right-2 xs:right-3 z-10"
                          >
                            {/* Notification card */}
                            <motion.div 
                              className="bg-white/95 backdrop-blur-sm shadow-lg rounded-lg xs:rounded-xl p-3 xs:p-4 border-l-4 border-l-orange-main border border-white/50"
                              animate={{
                                y: isActive ? [0, -2, 0] : 0,
                              }}
                              transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                            >
                              {/* Notification header */}
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 bg-gradient-to-r from-orange-main to-main-purple rounded-full"></div>
                                  <span className="text-[8px] xs:text-[9px] font-medium text-gray-500 uppercase tracking-wide">
                                    Helpsta Feature
                                  </span>
                                </div>
                                <div className="text-[8px] xs:text-[9px] text-gray-400">
                                  {index + 1}/{whyHelpstaData.length}
                                </div>
                              </div>
                              
                              {/* Notification content */}
                              <h3 className="font-bold text-[10px] xs:text-xs mb-1.5 xs:mb-2 text-gray-800 leading-tight">
                                {item.question}
                              </h3>
                              <p className="text-gray-600 text-[8px] xs:text-[9px] leading-relaxed">
                                {item.answer}
                              </p>
                              
                              {/* Notification progress bar */}
                              <motion.div 
                                className="mt-2 xs:mt-3 h-0.5 xs:h-1 w-full bg-gray-100 rounded-full overflow-hidden"
                              >
                                <motion.div 
                                  className="h-full bg-gradient-to-r from-orange-main to-main-purple rounded-full"
                                  style={{
                                    scaleX: useTransform(reveal, [0.2, 0.8], [0, 1]),
                                    originX: 0,
                                  }}
                                />
                              </motion.div>
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Phone reflection effect */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.4 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-[2rem] xs:rounded-[2.5rem] pointer-events-none"
                  />
                  
                  {/* Phone notch */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 xs:w-20 h-1 xs:h-1.5 bg-gray-800 rounded-full"></div>
                </motion.div>


              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extra runway so last card fully reveals before unpin */}
      <div className="h-[150vh] sm:h-[200vh]" />
    </section>
  );
}
