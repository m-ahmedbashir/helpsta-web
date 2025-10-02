import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Helpsta - Community Support & Partnership Inquiries',
  description: 'Contact Helpsta for community support, partnership opportunities, or platform inquiries. Join our mission to build stronger neighborhoods through mutual help and local business partnerships.',
  keywords: ['contact helpsta', 'community support', 'partnership inquiries', 'neighbor help support', 'local business partnerships', 'community platform help'],
  openGraph: {
    title: 'Contact Helpsta - Community Support & Partnership',
    description: 'Contact us for community support, partnerships, or to join our mission of building stronger neighborhoods.',
    images: ['/logo.png'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}