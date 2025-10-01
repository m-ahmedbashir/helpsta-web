'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, Globe, Clock, Check, Users, Heart, Zap } from 'lucide-react';

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

const businessCategories = [
  'restaurant',
  'retail',
  'grocery',
  'pharmacy',
  'electronics',
  'clothing',
  'beauty',
  'fitness',
  'entertainment',
  'automotive',
  'other',
] as const;

interface FormData {
  businessName: string;
  contactEmail: string;
  contactPhone: string;
  category: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  description: string;
  website: string;
}

const initialFormData: FormData = {
  businessName: '',
  contactEmail: '',
  contactPhone: '',
  category: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: 'United States',
  postalCode: '',
  description: '',
  website: '',
};

export default function BecomePartnerPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const totalSteps = 4;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    if (step === 1) {
      if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
      if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Email is required';
      if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
        newErrors.contactEmail = 'Please enter a valid email';
      }
      if (!formData.category) newErrors.category = 'Please select a category';
    } else if (step === 2) {
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    } else if (step === 3) {
      if (!formData.description.trim()) newErrors.description = 'Please add a short business description';
      if (formData.website && !/^https?:\/\/\S+\.\S+/.test(formData.website)) {
        newErrors.website = 'Please enter a valid URL (e.g., https://example.com)';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) setCurrentStep(s => Math.min(s + 1, totalSteps));
  };
  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navigation />
      
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

      <div className="container mx-auto px-6 py-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-main-purple mb-4">
            Become a Reward Partner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our partner network and reach thousands of nearby users. Simple onboarding, clear benefits, and a dashboard once approved.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Benefits Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Why Partner With Us */}
            <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl ring-1 ring-black/5">
              <h3 className="text-2xl font-bold text-main-purple mb-6">Why Partner With Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Reach More Customers</h4>
                    <p className="text-gray-600 text-sm">Connect with thousands of active users in your area looking for great deals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Increase Revenue</h4>
                    <p className="text-gray-600 text-sm">Boost sales with our reward system that encourages repeat visits.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-600 flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Build Loyalty</h4>
                    <p className="text-gray-600 text-sm">Create lasting relationships with customers through our loyalty program.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl ring-1 ring-black/5">
              <h3 className="text-2xl font-bold text-main-purple mb-6">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-main to-gradient-app-main-1 text-white flex items-center justify-center text-sm font-bold">1</div>
                  <span className="text-gray-700">Submit your application</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-main to-gradient-app-main-1 text-white flex items-center justify-center text-sm font-bold">2</div>
                  <span className="text-gray-700">Get verified within 2-3 days</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-main to-gradient-app-main-1 text-white flex items-center justify-center text-sm font-bold">3</div>
                  <span className="text-gray-700">Access your partner dashboard</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-main to-gradient-app-main-1 text-white flex items-center justify-center text-sm font-bold">4</div>
                  <span className="text-gray-700">Start earning with customers</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:sticky lg:top-24"
          >
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round((currentStep / totalSteps) * 100)}% Complete
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  key={currentStep}
                  className="h-2 rounded-full bg-gradient-to-r from-main-purple to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl ring-1 ring-black/5 p-6 md:p-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="mx-auto mb-4 grid place-items-center w-16 h-16 rounded-2xl bg-gradient-app-main">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Business Information</h3>
                    <p className="text-gray-600">Tell us about your business</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={e => updateFormData('businessName', e.target.value)}
                        placeholder="Enter your business name"
                        className={errors.businessName ? 'border-red-500' : ''}
                      />
                      {errors.businessName && (
                        <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactEmail">Contact Email *</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={formData.contactEmail}
                          onChange={e => updateFormData('contactEmail', e.target.value)}
                          placeholder="business@example.com"
                          className={errors.contactEmail ? 'border-red-500' : ''}
                        />
                        {errors.contactEmail && (
                          <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="contactPhone">Contact Phone</Label>
                        <Input
                          id="contactPhone"
                          type="tel"
                          value={formData.contactPhone}
                          onChange={e => updateFormData('contactPhone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Business Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={val => updateFormData('category', val)}
                      >
                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select your business category" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessCategories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="mx-auto mb-4 grid place-items-center w-16 h-16 rounded-2xl bg-gradient-app-main">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Business Location</h3>
                    <p className="text-gray-600">Where can customers find you?</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="addressLine1">Street Address *</Label>
                      <Input
                        id="addressLine1"
                        value={formData.addressLine1}
                        onChange={e => updateFormData('addressLine1', e.target.value)}
                        placeholder="123 Main Street"
                        className={errors.addressLine1 ? 'border-red-500' : ''}
                      />
                      {errors.addressLine1 && (
                        <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="addressLine2">Apartment, suite, etc.</Label>
                        <Input
                          id="addressLine2"
                          value={formData.addressLine2}
                          onChange={e => updateFormData('addressLine2', e.target.value)}
                          placeholder="Suite 100 (optional)"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code *</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={e => updateFormData('postalCode', e.target.value)}
                          placeholder="10001"
                          className={errors.postalCode ? 'border-red-500' : ''}
                        />
                        {errors.postalCode && (
                          <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={e => updateFormData('city', e.target.value)}
                          placeholder="New York"
                          className={errors.city ? 'border-red-500' : ''}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={e => updateFormData('state', e.target.value)}
                          placeholder="NY"
                          className={errors.state ? 'border-red-500' : ''}
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={e => updateFormData('country', e.target.value)}
                          placeholder="United States"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="mx-auto mb-4 grid place-items-center w-16 h-16 rounded-2xl bg-gradient-app-main">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Online Presence</h3>
                    <p className="text-gray-600">Tell customers about your business & website</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Business Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={e => updateFormData('description', e.target.value)}
                        placeholder="What do you offer? What makes your place special?"
                        rows={5}
                        className={errors.description ? 'border-red-500' : ''}
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={e => updateFormData('website', e.target.value)}
                        placeholder="https://www.yourbusiness.com"
                        className={errors.website ? 'border-red-500' : ''}
                      />
                      {errors.website && (
                        <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="mx-auto mb-4 grid place-items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Review & Submit</h3>
                    <p className="text-gray-600">Please review your information before submitting</p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-6 ring-1 ring-black/5">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Business Details</h4>
                        <p className="text-sm text-gray-700">Name: {formData.businessName}</p>
                        <p className="text-sm text-gray-700">Email: {formData.contactEmail}</p>
                        <p className="text-sm text-gray-700">Category: {formData.category}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                        <p className="text-sm text-gray-700">{formData.addressLine1}</p>
                        <p className="text-sm text-gray-700">
                          {formData.city}, {formData.state} {formData.postalCode}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Online Presence</h4>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Description:</span> {formData.description || '—'}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Website:</span>{' '}
                        {formData.website ? (
                          <a
                            href={formData.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-main-purple underline"
                          >
                            {formData.website}
                          </a>
                        ) : (
                          '—'
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl p-4 ring-1 ring-purple-200 bg-white">
                    <h4 className="font-semibold text-gray-900 mb-2">What happens next?</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• We review your application within 2–3 business days</li>
                      <li>• Our team contacts you for verification</li>
                      <li>• Once approved, you'll get partner dashboard access</li>
                      <li>• Start earning with thousands of active users</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6"
              >
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="px-6 bg-main-purple hover:bg-purple-700"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={async () => {
                    if (!validateStep(currentStep)) return;
                    setIsSubmitting(true);
                    try {
                      await new Promise(r => setTimeout(r, 1200));
                      // TODO: replace with real API call + toast
                      // router.push('/thank-you') etc.
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  disabled={isSubmitting}
                  className="px-8 bg-gradient-app-main hover:opacity-90"
                >
                  {isSubmitting ? 'Submitting…' : 'Submit Application'}
                </Button>
              )}
            </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}