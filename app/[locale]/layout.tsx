import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Helpsta - Community Helping Platform | Neighbors Helping Neighbors',
    template: '%s | Helpsta'
  },
  description: 'Join Helpsta\'s community platform where neighbors help each other solve problems. Post challenges, help others, earn reward points, and redeem them for discounts at partner stores. Building stronger communities together.',
  keywords: [
    'community helping platform', 'neighbor help', 'helpsta', 'community support', 
    'local help', 'problem solving', 'reward points', 'community rewards', 
    'neighborhood assistance', 'peer help network', 'local community app',
    'helping neighbors', 'community engagement', 'mutual aid platform'
  ],
  authors: [{ name: 'Helpsta Team' }],
  creator: 'Helpsta',
  publisher: 'Helpsta',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://helpsta.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'de': '/de',
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['de_DE'],
    url: 'https://helpsta.com',
    siteName: 'Helpsta',
    title: 'Helpsta - Community Helping Platform | Neighbors Helping Neighbors',
    description: 'Join our community platform where neighbors help each other solve problems. Earn reward points and redeem them for partner store discounts.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Helpsta - Community Helping Platform',
      },
      {
        url: '/mobile-images/Home.png',
        width: 800,
        height: 600,
        alt: 'Helpsta Mobile App - Community Help Interface',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@helpsta',
    creator: '@helpsta',
    title: 'Helpsta - Community Helping Platform',
    description: 'Neighbors helping neighbors. Join our community platform, solve problems together, earn rewards!',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

const locales = ['de', 'en'];

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid.
  // Do NOT call `notFound()` inside a root layout — it's disallowed.
  // Instead, fall back to the default locale and messages.
  const defaultLocale = 'de';
  let usedLocale = locale;
  if (!locales.includes(locale as any)) {
    usedLocale = defaultLocale;
  }

  let messages;
  try {
    messages = (await import(`../../translations/${usedLocale}.json`)).default;
  } catch (error) {
    // If messages fail to load, fall back to default locale messages.
    if (usedLocale !== defaultLocale) {
      try {
        messages = (await import(`../../translations/${defaultLocale}.json`)).default;
        usedLocale = defaultLocale;
      } catch (err) {
        // As a last resort, use an empty messages object so the app can render.
        messages = {};
      }
    } else {
      messages = {};
    }
  }

  return (
  <html lang={usedLocale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} font-poppins`}>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Prevent Radix UI from causing layout shifts
            (function() {
              function preventScrollLock() {
                const body = document.body;
                const observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-scroll-locked') {
                      // Remove the scroll lock immediately
                      body.removeAttribute('data-scroll-locked');
                      body.style.overflow = '';
                      body.style.paddingRight = '';
                      body.style.marginRight = '';
                      body.style.pointerEvents = '';
                    }
                  });
                });
                
                observer.observe(body, {
                  attributes: true,
                  attributeFilter: ['data-scroll-locked']
                });
              }
              
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', preventScrollLock);
              } else {
                preventScrollLock();
              }
            })();
          `
        }} />
        
        {/* Structured Data for Community Helping Platform */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://helpsta.com/#organization",
                  name: "Helpsta",
                  url: "https://helpsta.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://helpsta.com/logo.png",
                    width: 512,
                    height: 512
                  },
                  description: "Community helping platform where neighbors help each other solve problems and earn rewards",
                  foundingDate: "2024",
                  sameAs: [
                    "https://play.google.com/store/apps/details?id=com.helpsta.app",
                    "https://apps.apple.com/app/helpsta/id123456789"
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    availableLanguage: ["English", "German"]
                  },
                  areaServed: "Worldwide",
                  serviceType: "Community Support Platform"
                },
                {
                  "@type": "WebSite",
                  "@id": "https://helpsta.com/#website",
                  url: "https://helpsta.com",
                  name: "Helpsta",
                  description: "Community helping platform where neighbors help each other solve problems, earn reward points, and redeem them for partner store discounts",
                  publisher: {
                    "@id": "https://helpsta.com/#organization"
                  },
                  inLanguage: ["en", "de"],
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://helpsta.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "MobileApplication",
                  name: "Helpsta - Community Help",
                  applicationCategory: "SocialNetworkingApplication",
                  operatingSystem: ["Android", "iOS"],
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD"
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "50000",
                    bestRating: "5",
                    worstRating: "1"
                  },
                  featureList: [
                    "Post community problems",
                    "Help neighbors solve issues", 
                    "Earn reward points",
                    "Redeem points for partner discounts",
                    "Local community networking"
                  ],
                  screenshot: [
                    "https://helpsta.com/mobile-images/Home.png",
                    "https://helpsta.com/mobile-images/05-Sign-In.png"
                  ]
                },
                {
                  "@type": "Service",
                  "@id": "https://helpsta.com/#service",
                  name: "Community Helping Platform",
                  description: "Platform connecting neighbors to help each other solve problems and build stronger communities",
                  provider: {
                    "@id": "https://helpsta.com/#organization"
                  },
                  serviceType: "Community Support",
                  areaServed: "Worldwide",
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Community Help Services",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Problem Posting",
                          description: "Post problems to get help from community"
                        }
                      },
                      {
                        "@type": "Offer", 
                        itemOffered: {
                          "@type": "Service",
                          name: "Community Help",
                          description: "Help neighbors solve their problems"
                        }
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service", 
                          name: "Reward Points System",
                          description: "Earn points for helping and redeem for partner discounts"
                        }
                      }
                    ]
                  }
                }
              ]
            })
          }}
        />
        
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScrollProvider>
            {children}

          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}