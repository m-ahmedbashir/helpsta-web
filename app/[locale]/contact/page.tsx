'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, User, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import contactConfig from '@/config/contact.json';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Navigation } from '@/components/navigation/Navigation';
import { Footer } from '@/components/sections/Footer';
import { AuroraBackground } from '@/components/aurora-background';
import { GrainOverlay } from '@/components/grain-overlay';
import { Turnstile } from '@/components/ui/Turnstile';

const subjectOptions = [
  'general-inquiry',
  'technical-support',
  'partnership',
  'feedback',
  'billing',
  'other',
] as const;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  turnstileToken: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  turnstile?: string;
}

export default function ContactPage() {
  const t = useTranslations('contact');
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    turnstileToken: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field !== 'turnstileToken' && errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('form.errors.firstNameRequired');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('form.errors.lastNameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('form.errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('form.errors.emailInvalid');
    }

    if (!formData.subject) {
      newErrors.subject = t('form.errors.subjectRequired');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('form.errors.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('form.errors.messageTooShort');
    }

    if (!formData.turnstileToken) {
      newErrors.turnstile = t('form.errors.turnstileRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          turnstileToken: '',
        });
      } else {
        // Handle API errors
        console.error('Form submission failed:', result.error);
        setErrors({ turnstile: result.error || 'Submission failed. Please try again.' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ turnstile: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
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

        <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center bg-white/80 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl ring-1 ring-black/5"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-main-purple mb-4">
              {t('success.title')}
            </h1>
            <p className="text-gray-600 mb-6">
              {t('success.message')}
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-orange-main hover:bg-orange-600 text-white"
            >
              {t('success.sendAnother')}
            </Button>
          </motion.div>
        </div>
        
        <Footer />
      </main>
    );
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

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-main-purple mb-3 sm:mb-4">
            {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
          {/* Left Side - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact Info Card */}
            <div className="bg-white/80 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl ring-1 ring-black/5">
              <h3 className="text-xl sm:text-2xl font-bold text-main-purple mb-4 sm:mb-6">{t('info.title')}</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('info.email.title')}</h4>
                    <p className="text-gray-600 text-sm">{contactConfig.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('info.phone.title')}</h4>
                    <p className="text-gray-600 text-sm">{contactConfig.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('info.address.title')}</h4>
                    <p className="text-gray-600 text-sm">
                      {/* {contactConfig.address.street}<br /> */}
                      {/* {contactConfig.address.postalCode}  */}
                      {contactConfig.address.city}, {contactConfig.address.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('info.hours.title')}</h4>
                    <p className="text-gray-600 text-sm">
                      {contactConfig.hours.weekdays}<br />
                      {contactConfig.hours.weekend}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Card */}
            <div className="bg-white/80 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl ring-1 ring-black/5">
              <h3 className="text-xl sm:text-2xl font-bold text-main-purple mb-3 sm:mb-4">{t('response.title')}</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                {t('response.description')}
              </p>
              <div className="bg-gradient-to-r from-orange-main/10 to-main-purple/10 rounded-2xl p-3 sm:p-4">
                <p className="text-sm text-gray-700 font-medium">
                  {t('response.timeframe')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/80 backdrop-blur rounded-3xl p-6 sm:p-8 shadow-xl ring-1 ring-black/5">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-r from-orange-main to-gradient-app-main-1 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-main-purple">{t('form.title')}</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-900 font-medium">
                      {t('form.firstName')} *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      className={`bg-white/50 border-gray-200 focus:border-orange-main focus:ring-orange-main/20 ${
                        errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                      }`}
                      placeholder={t('form.placeholders.firstName')}
                      autoComplete="given-name"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-900 font-medium">
                      {t('form.lastName')} *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      className={`bg-white/50 border-gray-200 focus:border-orange-main focus:ring-orange-main/20 ${
                        errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                      }`}
                      placeholder={t('form.placeholders.lastName')}
                      autoComplete="family-name"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 font-medium">
                    {t('form.email')} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={`bg-white/50 border-gray-200 focus:border-orange-main focus:ring-orange-main/20 ${
                      errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                    }`}
                    placeholder={t('form.placeholders.email')}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-900 font-medium">
                    {t('form.phone')}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="bg-white/50 border-gray-200 focus:border-orange-main focus:ring-orange-main/20"
                    placeholder={t('form.placeholders.phone')}
                    autoComplete="off"
                    data-form-type="other"
                  />
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-900 font-medium">
                    {t('form.subject')} *
                  </Label>
                  <Select onValueChange={(value) => updateField('subject', value)}>
                    <SelectTrigger className={`bg-white/50 border-gray-200 focus:border-orange-main focus:ring-orange-main/20 ${
                      errors.subject ? 'border-red-500 focus:border-red-500' : ''
                    }`}>
                      <SelectValue placeholder={t('form.placeholders.subject')} />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {t(`form.subjects.${option}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.subject && (
                    <p className="text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-900 font-medium">
                    {t('form.message')} *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    className={`bg-white/50 border-gray-200 focus:border-orange-main focus:ring-orange-main/20 min-h-[120px] resize-none ${
                      errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                    }`}
                    placeholder={t('form.placeholders.message')}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* Turnstile Security Check */}
                <div className="space-y-2">
                  <Label className="text-gray-900 font-medium">
                    {t('form.security')} *
                  </Label>
                  <div className="flex justify-center">
                    <Turnstile
                      sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
                      onVerify={(token) => updateField('turnstileToken', token)}
                      onError={() => {
                        setErrors(prev => ({ ...prev, turnstile: t('form.errors.turnstileError') }));
                      }}
                      onExpire={() => {
                        updateField('turnstileToken', '');
                        setErrors(prev => ({ ...prev, turnstile: t('form.errors.turnstileExpired') }));
                      }}
                      theme="auto"
                      size="normal"
                    />
                  </div>
                  {errors.turnstile && (
                    <p className="text-sm text-red-600">{errors.turnstile}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-main hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('form.sending')}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t('form.send')}
                    </div>
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  {t('form.required')}
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}