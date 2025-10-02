import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Helpsta - Building Stronger Communities Together',
  description: 'Learn about Helpsta\'s mission to connect neighbors and build stronger communities. Discover how our platform helps people solve problems together, earn rewards, and support local businesses.',
  keywords: ['about helpsta', 'community building', 'neighbor helping', 'community platform', 'local support', 'mutual aid', 'community mission'],
  openGraph: {
    title: 'About Helpsta - Building Stronger Communities Together',
    description: 'Learn about our mission to connect neighbors and build stronger communities through mutual help.',
    images: ['/logo.png'],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}