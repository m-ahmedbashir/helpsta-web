'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/navigation/Navigation';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { RewardPartners } from '@/components/sections/RewardPartners';
import { CommunityPartners } from '@/components/sections/CommunityPartners';
import { Footer } from '@/components/sections/Footer';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure minimum loading time for better UX
    const minLoadTime = setTimeout(() => {
      setIsLoading(false);
    }, 4800); // 6 steps × 800ms = 4800ms

    return () => clearTimeout(minLoadTime);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : (
          <main key="main" className="relative">
            <Navigation />
            <Hero />
            <HowItWorks />
            <RewardPartners />
            <CommunityPartners />
            
          </main>
        )}
      </AnimatePresence>
    </>
  );
}