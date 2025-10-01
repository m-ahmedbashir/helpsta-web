'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { Navigation } from '@/components/navigation/Navigation';
import { Footer } from '@/components/sections/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GrainOverlay } from '@/components/grain-overlay';
import { AuroraBackground } from '@/components/aurora-background';

export default function FAQPage() {
  const t = useTranslations('faq');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqItems = [
    {
      id: 'what-is-helpsta',
      question: t('items.whatIsHelpsta.question'),
      answer: t('items.whatIsHelpsta.answer'),
    },
    {
      id: 'how-to-download',
      question: t('items.howToDownload.question'),
      answer: t('items.howToDownload.answer'),
    },
    {
      id: 'reward-partners',
      question: t('items.rewardPartners.question'),
      answer: t('items.rewardPartners.answer'),
    },
    {
      id: 'become-partner',
      question: t('items.becomePartner.question'),
      answer: t('items.becomePartner.answer'),
    },
    {
      id: 'data-security',
      question: t('items.dataSecurity.question'),
      answer: t('items.dataSecurity.answer'),
    },
    {
      id: 'support',
      question: t('items.support.question'),
      answer: t('items.support.answer'),
    },
  ];

  return (
    <>
      <Navigation />
      
      {/* Main Content */}
      <main className="relative min-h-screen bg-gradient-to-br from-main-purple via-purple-800 to-indigo-900 overflow-hidden">
        {/* Background Elements */}
        <AuroraBackground />
        <GrainOverlay />
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-0 left-0 w-96 h-96 bg-orange-main rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-app-main-1 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          />
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-6 relative z-20 pt-32 pb-20">
          {/* Header Section */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              {t('title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              {t('subtitle')}
            </motion.p>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <AccordionItem 
                    value={item.id}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left text-white hover:bg-white/5 transition-colors duration-300 text-lg font-semibold">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-300 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mt-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('stillHaveQuestions')}
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('contactUsText')}
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-orange-main hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t('contactUs')}
            </motion.a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}