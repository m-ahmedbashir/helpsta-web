'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Heart, Zap, Globe, Award, Sparkles } from 'lucide-react';

const communityPartners = [
  {
    name: 'TechCorp',
    logo: 'TC',
    category: 'Technology',
    description: 'Leading innovation in mobile solutions',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100',
  },
  {
    name: 'GreenEarth',
    logo: 'GE',
    category: 'Sustainability',
    description: 'Environmental impact solutions',
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100',
  },
  {
    name: 'HealthPlus',
    logo: 'H+',
    category: 'Healthcare',
    description: 'Digital health and wellness',
    color: 'from-red-500 to-pink-500',
    bgColor: 'from-red-50 to-pink-50',
  },
  {
    name: 'EduTech',
    logo: 'ET',
    category: 'Education',
    description: 'Learning platform innovations',
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'from-purple-50 to-indigo-50',
  },
  {
    name: 'FinanceFlow',
    logo: 'FF',
    category: 'Finance',
    description: 'Next-gen financial services',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-50',
  },
  {
    name: 'SocialHub',
    logo: 'SH',
    category: 'Social',
    description: 'Community building platform',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'from-pink-50 to-rose-50',
  },
  {
    name: 'CloudSync',
    logo: 'CS',
    category: 'Cloud Services',
    description: 'Seamless data synchronization',
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'from-cyan-50 to-blue-50',
  },
  {
    name: 'AIVision',
    logo: 'AI',
    category: 'Artificial Intelligence',
    description: 'Machine learning solutions',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'from-indigo-50 to-purple-50',
  },
];

const stats = [
  { icon: Users, value: '50+', label: 'Active Partners' },
  { icon: Globe, value: '25', label: 'Countries' },
  { icon: Award, value: '100K+', label: 'Users Served' },
  { icon: Heart, value: '99%', label: 'Satisfaction' },
];

export function CommunityPartners() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={ref}
      id="community-partners"
      className="relative py-24 bg-gradient-to-br from-main-purple/5 via-white to-orange-main/5 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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
          className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-main-purple/10 to-purple-600/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-orange-main/10 to-gradient-app-main-1/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-main-purple to-purple-600 text-white px-6 py-3 rounded-full mb-6"
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold">Community Partners</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl lg:text-6xl font-bold text-main-purple mb-6"
          >
            Building the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-main to-gradient-app-main-1">
              Future Together
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Join our thriving ecosystem of innovative partners who are shaping the future of mobile technology and creating meaningful connections worldwide.
          </motion.p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {communityPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${partner.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 backdrop-blur-sm relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-current rounded-full transform translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-current rounded-full transform -translate-x-12 translate-y-12"></div>
                </div>

                <div className="relative z-10">
                  {/* Logo */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 bg-gradient-to-r ${partner.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <span className="text-white font-bold text-lg">{partner.logo}</span>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-main-purple transition-colors">
                    {partner.name}
                  </h3>
                  <div className="text-sm text-gray-500 mb-3 font-medium">{partner.category}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{partner.description}</p>

                  {/* Hover Effect */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center gap-2 text-main-purple font-semibold"
                  >
                    <span className="text-sm">Learn More</span>
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center bg-gradient-to-r from-main-purple to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-64 h-64 bg-orange-main/20 rounded-full transform translate-x-32 -translate-y-32"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-app-main-1/20 rounded-full transform -translate-x-24 translate-y-24"
            />
          </div>

          <div className="relative z-10">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="text-3xl lg:text-4xl font-bold mb-4"
            >
              Ready to Join Our Community?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.7 }}
              className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
            >
              Partner with us to reach millions of users and be part of the mobile revolution.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-main to-gradient-app-main-1 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Zap className="w-5 h-5" />
              Become a Partner
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}