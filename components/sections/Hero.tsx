'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Download, Star } from 'lucide-react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-main/90 via-gradient-app-main-1/80 to-gradient-app-main-2/70"
      style={{ y, opacity }}
      id="home"
    >
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
          <motion.div
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
              Revolutionary
              <br />
              <span className="text-white drop-shadow-lg">
                Mobile Experience
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl opacity-90 mb-8 leading-relaxed"
            >
              Transform your daily routine with our cutting-edge mobile application. 
              Experience seamless functionality, stunning design, and unparalleled performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="bg-main-purple hover:bg-purple-700 text-white border-0 px-8 py-6 text-lg font-semibold rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ scale }}
            className="relative"
          >
            <motion.div
              className="relative mx-auto w-80 h-[600px]"
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Screen Content */}
                  <div className="relative h-full bg-gradient-to-br from-orange-main to-gradient-app-main-1 p-6">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center mb-8 text-white">
                      <div className="text-sm font-semibold text-white">9:41</div>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-white rounded-full opacity-60"></div>
                        <div className="w-4 h-2 bg-white rounded-full"></div>
                        <div className="w-6 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
                        <p className="text-white/80">Sign in to continue</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-main-purple rounded-2xl"></div>
                        <div>
                          <div className="h-4 bg-white/20 rounded w-24 mb-2"></div>
                          <div className="h-3 bg-white/10 rounded w-16"></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="h-16 bg-white/10 rounded-2xl shadow-sm border border-white/20 backdrop-blur-sm"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                          />
                        ))}
                      </div>
                      
                      <button className="w-full bg-main-purple text-white py-4 rounded-2xl font-semibold mt-6">
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-16 h-16 bg-main-purple rounded-2xl shadow-xl flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/20 rounded-full shadow-xl backdrop-blur-sm"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
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
    </motion.section>
  );
}