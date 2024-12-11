import { Inter } from "next/font/google";
import "./globals.css";
import Warnings from "./components/warnings";
import { assistantId } from "./assistant-config";
import type { Metadata } from 'next'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'YC Query – Find YC Company Talent',
  description: 'Find the right people from YC companies who have specific skills or knowledge you need',
  openGraph: {
    title: 'YC Query – Find YC Company Talent',
    description: 'Find the right people from YC companies who have specific skills or knowledge you need',
    type: 'website',
    locale: 'en_US',
    siteName: 'YC Query',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'YC Query',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YC Query – Find YC Company Talent',
    description: 'Find the right people from YC companies who have specific skills or knowledge you need',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: '#FF6B6B',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const hasRequiredEnvVars = process.env.OPENAI_API_KEY && process.env.ASSISTANT_ID;

  return (
    <html lang="en">
      <body className={inter.className}>
        {hasRequiredEnvVars ? children : <Warnings />}
      </body>
    </html>
  );
}
