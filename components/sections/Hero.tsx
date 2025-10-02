'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Star } from 'lucide-react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end center']
  });

  // Phone transforms for deck card effect (no opacity or scaling changes)
  const phone1Rotate = useTransform(scrollYProgress, [0, 0.4], [-15, 0]);
  const phone1X = useTransform(scrollYProgress, [0, 0.4], [-40, 0]);
  const phone1Y = useTransform(scrollYProgress, [0, 0.4], [30, 0]);
  
  const phone2Rotate = useTransform(scrollYProgress, [0, 0.4], [15, 0]);
  const phone2X = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const phone2Y = useTransform(scrollYProgress, [0, 0.4], [50, 0]);

  return (
    <motion.section
      ref={containerRef}
      className="relative h-[300svh] bg-gradient-to-br from-orange-main/90 via-gradient-app-main-1/80 to-gradient-app-main-2/70"
      id="home"
      aria-label="Hero section - Helpsta community helping platform"
      role="banner"
    >
      {/* Pinned Content Container */}
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle overlay to tone down the gradient */}
        <div className="absolute inset-0 bg-white/5"></div>
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-main-purple rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.header
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm opacity-90">4.9 • 50K+ Reviews</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-white drop-shadow-lg">
                Have a problem<br />
                that you can solve?
              </span>
              <br />
              <span className="text-yellow-400 drop-shadow-lg">
                Don't worry, let's<br />
                get started.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl opacity-90 mb-8 leading-relaxed"
            >
              Join Helpsta's community platform where neighbors help each other solve problems. 
              Post your challenges, help others, earn reward points, and redeem them for discounts 
              at partner stores. Building stronger communities, one helping hand at a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              {/* Google Play Store Badge */}
              <motion.a
                href="https://play.google.com/store/apps/details?id=com.helpsta.app"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
                aria-label="Download Helpsta app on Google Play Store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/download-icons/google play.png"
                  alt="Get it on Google Play"
                  className="h-14 w-auto object-contain"
                  loading="eager"
                />
              </motion.a>

              {/* Apple App Store Badge */}
              <motion.a
                href="https://apps.apple.com/app/helpsta/id123456789"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
                aria-label="Download Helpsta app on Apple App Store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/download-icons/app store.png"
                  alt="Download on the App Store"
                  className="h-14 w-auto object-contain"
                  loading="eager"
                />
              </motion.a>
            </motion.div>
          </motion.header>

          {/* Dual Phone Mockup with Parallax Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center items-center"
            role="img"
            aria-label="Helpsta mobile app screenshots showing community help interface"
          >
            {/* First Phone - Home Screen (Left Tilted Initially) */}
            <motion.div
              className="relative w-64 h-[500px] z-20"
              style={{ 
                rotateZ: phone1Rotate,
                x: phone1X,
                y: phone1Y
              }}
            >
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                  {/* Home Screen */}
                  <img
                    src="/mobile-images/Home.png"
                    alt="Helpsta mobile app home screen showing community problems and helping interface"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </motion.div>

            {/* Second Phone - Sign In Screen (Right Tilted Initially) */}
            <motion.div
              className="relative w-64 h-[500px] -ml-20 z-10"
              style={{ 
                rotateZ: phone2Rotate,
                x: phone2X,
                y: phone2Y
              }}
            >
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
                  {/* Sign In Screen */}
                  <img
                    src="/mobile-images/05-Sign-In.png"
                    alt="Helpsta mobile app sign-in screen for community members to access helping platform"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-16 h-16 bg-main-purple rounded-2xl shadow-xl flex items-center justify-center z-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/20 rounded-full shadow-xl backdrop-blur-sm z-30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
        
      {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
        </div>
      </div>
    </motion.section>
  );
}