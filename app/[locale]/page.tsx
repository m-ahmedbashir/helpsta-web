'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/navigation/Navigation';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { RewardPartners } from '@/components/sections/RewardPartners';
import { CommunityPartners } from '@/components/sections/CommunityPartners';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Footer } from '@/components/sections/Footer';
import { useHashScrollOnLoad } from '@/hooks/useHashScrollOnLoad';
import WhyHelpsta  from '@/components/sections/WhyHelpsta';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Handle hash scrolling after loading completes
  useHashScrollOnLoad({ 
    isLoading,
    debug: process.env.NODE_ENV === 'development' // Enable debug logs in development
  });

  useEffect(() => {
    // TODO: Replace this with API-based loading state
    // When you implement API loading, replace this timeout with your API call
    // Example:
    // const loadData = async () => {
    //   try {
    //     setIsLoading(true);
    //     await Promise.all([
    //       fetchUserData(),
    //       fetchPartners(),
    //       fetchCommunityData()
    //     ]);
    //   } catch (error) {
    //     console.error('Failed to load data:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // loadData();
    
    // Current implementation with timer (remove when API is implemented)
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
            <WhyHelpsta/>
            <Footer />
          </main>
        )}
      </AnimatePresence>
    </>
  );
}