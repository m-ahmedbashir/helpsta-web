'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations, useLocale } from 'next-intl';
import contactConfig from '@/config/contact.json';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { FooterBackground } from '../ui/FooterBackground';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { icon: Linkedin, href: contactConfig.social.linkedin, label: 'LinkedIn' },
];



export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Define footer links with proper routing
  const footerLinks = {
    [t('sections.company.title')]: [
      { label: t('sections.company.about'), href: `/${locale}/about` },
      { label: t('sections.company.team'), href: `/${locale}/team` },
      { label: t('sections.legal.privacy'), href: `/${locale}/privacy` },
      { label: t('sections.legal.terms'), href: `/${locale}/terms` },
    ],
    [t('sections.support.title')]: [
      { label: t('sections.support.faq'), href: `/${locale}/faq` },
      { label: t('sections.support.contact'), href: `/${locale}/contact` },
    ],
  };



  return (
    <footer ref={ref} id="contact" className="bg-gradient-to-br from-main-purple via-purple-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <FooterBackground />

      <div className="container mx-auto px-6 relative z-20 pointer-events-auto">


        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 relative"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4"
            >
              <img 
                src="/logo-bg-none.png" 
                alt="Helpsta Logo" 
                className="h-12 md:h-16 w-auto object-contain"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-300 mb-6 text-lg leading-relaxed"
            >
              {t('description')}
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5" />
                <span>{contactConfig.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5" />
                <span>{contactConfig.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5" />
                <span>{contactConfig.address.city}, {contactConfig.address.country}</span>
              </div>
            </motion.div>

 
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-4 mt-8"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-main transition-all duration-300 backdrop-blur-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Links Sections */}
          
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + categoryIndex * 0.1 }}
            >

              <h4 className="text-xl font-semibold mb-6">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + categoryIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    {link.href.startsWith('/') ? (
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
              
              {/* Add Language Switcher to Support section */}
              {category === t('sections.support.title') && (
                <div className="mt-6">
                  <h5 className="text-lg font-semibold mb-3 text-white">{t('sections.language.title')}</h5>
                  <div>
                    <LanguageSwitcher className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 transition-all duration-300" />
                  </div>
                </div>
              )}
            </motion.div>

          ))}



            

            
        </div>

        



        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-300 flex items-center gap-2">
            © 2025 {t('brand')}. {t('madeWith')} <Heart className="w-4 h-4 text-red-500 fill-red-500" /> {t('in')} {`Bielefeld`}
          </p>
          <div className="flex gap-6 text-sm text-gray-400 items-center">
            <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{t('privacyPolicy')}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{t('termsOfService')}</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}