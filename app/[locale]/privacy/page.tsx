'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLocale } from 'next-intl';
import { 
  Shield, 
  Database, 
  Eye, 
  Share2, 
  Clock,
  UserX,
  Cookie,
  Lock,
  Mail
} from 'lucide-react';
import { useState, useEffect } from 'react';

import { Navigation } from '@/components/navigation/Navigation';
import { Footer } from '@/components/sections/Footer';
import { AuroraBackground } from '@/components/aurora-background';
import { GrainOverlay } from '@/components/grain-overlay';

const privacySections = [
  {
    id: 'dataCollection',
    icon: Database,
    titleKey: 'dataCollection.title',
    contentKey: 'dataCollection.content'
  },
  {
    id: 'dataUsage',
    icon: Eye,
    titleKey: 'dataUsage.title',
    contentKey: 'dataUsage.content'
  },
  {
    id: 'dataSharing',
    icon: Share2,
    titleKey: 'dataSharing.title',
    contentKey: 'dataSharing.content'
  },
  {
    id: 'dataStorage',
    icon: Clock,
    titleKey: 'dataStorage.title',
    contentKey: 'dataStorage.content'
  },
  {
    id: 'userRights',
    icon: UserX,
    titleKey: 'userRights.title',
    contentKey: 'userRights.content'
  },
  {
    id: 'cookies',
    icon: Cookie,
    titleKey: 'cookies.title',
    contentKey: 'cookies.content'
  },
  {
    id: 'security',
    icon: Lock,
    titleKey: 'security.title',
    contentKey: 'security.content'
  },
  {
    id: 'contact',
    icon: Mail,
    titleKey: 'contact.title',
    contentKey: 'contact.content'
  }
];

export default function PrivacyPage() {
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
    // Load privacy translations from separate file
    import(`@/translations/privacy/${locale}.json`)
      .then((module) => {
        setTranslations(module.default);
      })
      .catch((error) => {
        console.error('Error loading privacy translations:', error);
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
            <Shield className="w-8 h-8 text-white" />
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

        {/* Privacy Content */}
        <motion.section
          ref={contentRef}
          initial={{ opacity: 0, y: 50 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="pb-20"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            {privacySections.map((section, index) => (
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

        {/* GDPR Notice */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pb-12"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-orange-main/10 to-main-purple/10 backdrop-blur rounded-3xl p-8 border border-orange-main/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-main to-main-purple rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-main-purple">
                {translations.gdpr?.title}
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {translations.gdpr?.description}
            </p>
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
              {translations.contactUs?.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {translations.contactUs?.description}
            </p>
            <motion.a
              href="mailto:privacy@helpsta.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-orange-main hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {translations.contactUs?.email}
            </motion.a>
          </div>
        </motion.section>
      </div>
      
      <Footer />
    </main>
  );
}