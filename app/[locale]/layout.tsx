import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { Footer } from '@/components/sections/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Helpsta - Revolutionary Mobile Experience',
  description: 'Experience the future of mobile applications with our innovative platform',
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScrollProvider>
            {children}
            <Footer />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}