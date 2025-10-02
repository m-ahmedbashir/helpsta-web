import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a Helpsta Partner - Join Our Community Business Network',
  description: 'Partner with Helpsta and connect with 50K+ community members. Offer reward discounts to neighbors who help each other, boost local engagement, and grow your business through community support.',
  keywords: ['helpsta partner', 'local business partnership', 'community rewards', 'neighborhood business', 'discount partner', 'local community engagement', 'reward partner program'],
  openGraph: {
    title: 'Become a Helpsta Partner - Community Business Network',
    description: 'Partner with us to connect with 50K+ community members and grow your business through neighborhood engagement.',
    images: ['/logo.png'],
  },
};

export default function BecomePartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}