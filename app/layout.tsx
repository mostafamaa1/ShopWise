import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  openGraph: {
    title: 'ShopWise',
    description: 'Track product prices effortlessly and save money on your online shopping.',
    url: 'https://shopwise-inky.vercel.app',
    siteName: 'Shopwise',
    images: [
      {
        url: '../public/shopwise1.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: '../public/shopwise1.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: '',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='max-w-10xl mx-auto'>
          <Navbar />
        {children}
        </main>
        </body>
    </html>
  )
}
