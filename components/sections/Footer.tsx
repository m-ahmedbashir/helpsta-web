'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const footerLinks = {
    [t('sections.product.title')]: [
      t('sections.product.features'),
      t('sections.product.pricing'),
      t('sections.product.security'),
      t('sections.product.updates')
    ],
    [t('sections.company.title')]: [
      t('sections.company.about'),
      t('sections.company.careers'),
      t('sections.company.blog'),
      t('sections.company.press')
    ],
    [t('sections.support.title')]: [
      t('sections.support.helpCenter'),
      t('sections.support.contact'),
      t('sections.support.documentation'),
      t('sections.support.community')
    ],
    [t('sections.legal.title')]: [
      t('sections.legal.privacy'),
      t('sections.legal.terms'),
      t('sections.legal.cookies'),
      t('sections.legal.licenses')
    ],
  };

  const switchLanguage = () => {
    const newLocale = locale === 'de' ? 'en' : 'de';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <footer ref={ref} id="contact" className="bg-gradient-to-br from-main-purple via-purple-800 to-indigo-900 text-white relative overflow-hidden">
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

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold mb-4 text-orange-main"
            >
              {t('brand')}
            </motion.h3>
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
                <span>hello@mobileapp.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5" />
                <span>San Francisco, CA</span>
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
              transition={{ duration: 0.6, delay: 0.2 + categoryIndex * 0.1 }}
            >
              <h4 className="text-xl font-semibold mb-6">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + categoryIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="py-8 border-t border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-semibold mb-2">{t('stayUpdated')}</h4>
              <p className="text-gray-300">{t('stayUpdatedDesc')}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex gap-3"
            >
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gradient-app-main-1 backdrop-blur-sm placeholder-gray-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-orange-main hover:bg-gradient-app-main-1 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                {t('subscribe')}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-300 flex items-center gap-2">
            © 2024 {t('brand')}. {t('madeWith')} <Heart className="w-4 h-4 text-red-500 fill-red-500" /> {t('in')} {t('city')}
          </p>
          <div className="flex gap-6 text-sm text-gray-400 items-center">
            <a href="#" className="hover:text-white transition-colors">{t('privacyPolicy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('termsOfService')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('cookies')}</a>
            <button
              onClick={switchLanguage}
              className="flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <span className="text-xs font-medium">
                {locale === 'de' ? '🇩🇪 DE' : '🇺🇸 EN'}
              </span>
              <span className="text-xs">{t('switchLanguage')}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}