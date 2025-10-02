'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations, useLocale } from 'next-intl';
import { 
  Users, 
  Target, 
  Heart, 
  Zap, 
  Award, 
  TrendingUp, 
  Globe, 
  Shield,
  Lightbulb,
  Star,
  MapPin,
  Calendar,
  Eye
} from 'lucide-react';

import { Navigation } from '@/components/navigation/Navigation';
import { Footer } from '@/components/sections/Footer';
import { AuroraBackground } from '@/components/aurora-background';
import { GrainOverlay } from '@/components/grain-overlay';

const teamMembers = [
  {
    id: 'ceo',
    name: 'Sarah Chen',
    position: 'Chief Executive Officer',
    image: '/team/sarah-chen.jpg',
    bio: 'Former tech executive with 15+ years in mobile innovation.',
  },
  {
    id: 'cto',
    name: 'Marcus Weber',
    position: 'Chief Technology Officer',
    image: '/team/marcus-weber.jpg',
    bio: 'Leading our technical vision with expertise in scalable systems.',
  },
  {
    id: 'design',
    name: 'Emma Rodriguez',
    position: 'Head of Design',
    image: '/team/emma-rodriguez.jpg',
    bio: 'Award-winning designer focused on user-centered experiences.',
  },
  {
    id: 'product',
    name: 'David Kim',
    position: 'VP of Product',
    image: '/team/david-kim.jpg',
    bio: 'Product strategist with a passion for solving real-world problems.',
  },
];

const companyStats = [
  { id: 'users', value: '50K+', iconKey: 'users' },
  { id: 'partners', value: '1,200+', iconKey: 'partners' },
  { id: 'cities', value: '75+', iconKey: 'cities' },
  { id: 'founded', value: '2024', iconKey: 'founded' },
];

const coreValues = [
  { id: 'community', icon: Users },
  { id: 'trust', icon: Shield },
  { id: 'empowerment', icon: Zap },
  { id: 'dignity', icon: Heart },
];

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();
  
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
          className="pt-32 pb-20 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-main-purple mb-6"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-500 max-w-3xl mx-auto"
          >
            {t('hero.description')}
          </motion.p>
        </motion.section>

        {/* Company Stats */}
        {/* <motion.section
          ref={statsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="py-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-main to-main-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.iconKey === 'users' && <Users className="w-6 h-6 text-white" />}
                  {stat.iconKey === 'partners' && <Target className="w-6 h-6 text-white" />}
                  {stat.iconKey === 'cities' && <MapPin className="w-6 h-6 text-white" />}
                  {stat.iconKey === 'founded' && <Calendar className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-3xl font-bold text-main-purple mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{t(`stats.${stat.id}`)}</p>
              </motion.div>
            ))}
          </div>
        </motion.section> */}

        {/* Company Story */}
        <motion.section
          ref={storyRef}
          initial={{ opacity: 0, y: 50 }}
          animate={storyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="py-20"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-main-purple mb-6">
                {t('story.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('story.paragraph1')}
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t('story.paragraph2')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('story.paragraph3')}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-main-purple mb-2">{t('mission.title')}</h3>
                    <p className="text-gray-600">{t('mission.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-main-purple mb-2">{t('vision.title')}</h3>
                    <p className="text-gray-600">{t('vision.description')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Core Values */}
        <motion.section
          ref={valuesRef}
          initial={{ opacity: 0, y: 50 }}
          animate={valuesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-main-purple mb-6">
              {t('values.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('values.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 50 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-main to-main-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-main-purple mb-4 text-center">
                  {t(`values.items.${value.id}.title`)}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {t(`values.items.${value.id}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section
        <motion.section
          ref={teamRef}
          initial={{ opacity: 0, y: 50 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-main-purple mb-6">
              {t('team.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('team.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-orange-main to-main-purple rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-main-purple mb-2 text-center">
                  {t(`team.members.${member.id}.name`)}
                </h3>
                <p className="text-orange-main font-semibold mb-4 text-center">
                  {t(`team.members.${member.id}.position`)}
                </p>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {t(`team.members.${member.id}.bio`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section> */}

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="py-20 text-center"
        >
          <div className="bg-white/80 backdrop-blur rounded-3xl p-12 shadow-xl max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-main-purple mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex justify-center">
              <motion.a
                href={`/${locale}/contact`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-orange-main hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('cta.contact')}
              </motion.a>
            </div>
          </div>
        </motion.section>
      </div>
      
      <Footer />
    </main>
  );
}