'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation/Navigation';
import { Footer } from '@/components/sections/Footer';
import { AuroraBackground } from '@/components/aurora-background';
import { GrainOverlay } from '@/components/grain-overlay';

interface TeamMember {
  name: string;
  title: string;
  image: string;
  linkedin?: string;
}

export default function TeamPage() {
  const t = useTranslations('team');

  // Team members data array (hardcoded)
  const teamMembers: TeamMember[] = [
    {
      name: "Johannes Kick",
      title: "CEO & CO-Founder",
      image: "/team/member-1.jpeg",
      linkedin: "https://www.linkedin.com/in/johannes-kick-b23593305/"
    },
    {
      name: "Eslam Khalifa",
      title: "Co-Founder",
      image: "/team/member-2.jpeg",
      linkedin: "https://www.linkedin.com/in/eslam-khalifa-4b9996253/"
    },
    {
      name: "Zuraiz",
      title: "Developer",
      image: "/team/member-3.jpeg",
      linkedin: "https://www.linkedin.com/in/zuraiz-/"
    },
    {
      name: "Ahmed Bashir",
      title: "Developer",
      image: "/team/member-4.jpg",
      linkedin: "https://www.linkedin.com/in/ahmed-bashir-2118651aa/"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <Navigation />

      {/* Aurora Background */}
      <div className="fixed inset-0 z-0">
        <AuroraBackground />
        <GrainOverlay />
      </div>

      {/* Main Content */}
      <div className="relative z-10 bg-white/5 backdrop-blur-[1px] min-h-screen">

      {/* Hero Section */}
      <section className="relative py-10 sm:py-20 lg:py-22 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('title')}
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-8 sm:py-12 lg:py-16 pb-16 sm:pb-20 lg:pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100/50">
                  {/* Member Image */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="aspect-square">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="p-6 lg:p-8 text-center">
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-main transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-sm lg:text-base font-medium text-main-purple uppercase tracking-wide mb-4">
                      {member.title}
                    </p>
                    
                    {/* LinkedIn Icon */}
                    {member.linkedin && (
                      <motion.a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 bg-main-purple hover:bg-orange-main text-white rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}