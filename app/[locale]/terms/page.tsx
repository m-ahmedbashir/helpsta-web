'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLocale } from 'next-intl';
import { 
  Shield, 
  FileText, 
  Scale, 
  Users, 
  AlertTriangle,
  Lock,
  Gavel,
  UserCheck
} from 'lucide-react';
import { useState, useEffect } from 'react';

import { Navigation } from '@/components/navigation/Navigation';
import { Footer } from '@/components/sections/Footer';
import { AuroraBackground } from '@/components/aurora-background';
import { GrainOverlay } from '@/components/grain-overlay';

const termssections = [
  {
    id: 'acceptance',
    icon: UserCheck,
    titleKey: 'acceptance.title',
    contentKey: 'acceptance.content'
  },
  {
    id: 'description',
    icon: FileText,
    titleKey: 'description.title',
    contentKey: 'description.content'
  },
  {
    id: 'userAccounts',
    icon: Users,
    titleKey: 'userAccounts.title',
    contentKey: 'userAccounts.content'
  },
  {
    id: 'userConduct',
    icon: Shield,
    titleKey: 'userConduct.title',
    contentKey: 'userConduct.content'
  },
  {
    id: 'fees',
    icon: Scale,
    titleKey: 'fees.title',
    contentKey: 'fees.content'
  },
  {
    id: 'privacy',
    icon: Lock,
    titleKey: 'privacy.title',
    contentKey: 'privacy.content'
  },
  {
    id: 'intellectualProperty',
    icon: Lock,
    titleKey: 'intellectualProperty.title',
    contentKey: 'intellectualProperty.content'
  },
  {
    id: 'limitations',
    icon: AlertTriangle,
    titleKey: 'limitations.title',
    contentKey: 'limitations.content'
  },
  {
    id: 'termination',
    icon: UserCheck,
    titleKey: 'termination.title',
    contentKey: 'termination.content'
  },
  {
    id: 'disputes',
    icon: Gavel,
    titleKey: 'disputes.title',
    contentKey: 'disputes.content'
  }
];

export default function TermsPage() {
  const locale = useLocale();
  const [translations, setTranslations] = useState<any>(null);
  
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Load terms translations from separate file
    import(`@/translations/terms/${locale}.json`)
      .then((module) => {
        setTranslations(module.default);
      })
      .catch((error) => {
        console.error('Error loading terms translations:', error);
      });
  }, [locale]);

  if (!translations) {
    return <div>Loading...</div>;
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navigation />
      
      {/* Background Elements */}
      <AuroraBackground />
      <GrainOverlay />
      
      {/* Additional subtle animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-main rounded-full mix-blend-multiply filter blur-3xl opacity-5"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-main-purple rounded-full mix-blend-multiply filter blur-3xl opacity-5"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="pt-32 pb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-16 h-16 bg-gradient-to-r from-orange-main to-main-purple rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Scale className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-main-purple mb-6"
          >
            {translations.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4"
          >
            {translations.subtitle}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm text-gray-500 max-w-2xl mx-auto"
          >
            {translations.lastUpdated}: {translations.effectiveDate}
          </motion.p>
        </motion.section>

        {/* Terms Content */}
        <motion.section
          ref={contentRef}
          initial={{ opacity: 0, y: 50 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="pb-20"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            {termssections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 50 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-main to-main-purple rounded-2xl flex items-center justify-center shrink-0 mt-1">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-main-purple mb-4">
                      {translations.sections[section.id]?.title}
                    </h2>
                    
                    <div className="prose prose-gray max-w-none">
                      <div 
                        className="text-gray-700 leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{ 
                          __html: translations.sections[section.id]?.content || ''
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pb-20"
        >
          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl text-center">
            <h2 className="text-2xl font-bold text-main-purple mb-4">
              {translations.contact?.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {translations.contact?.description}
            </p>
            <motion.a
              href="mailto:legal@helpsta.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-orange-main hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {translations.contact?.email}
            </motion.a>
          </div>
        </motion.section>
      </div>
      
      <Footer />
    </main>
  );
}