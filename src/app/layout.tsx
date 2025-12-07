import './globals.css'
import type { Metadata } from 'next'
import { Inter, Cinzel, Great_Vibes } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-cinzel' })
const script = Great_Vibes({ subsets: ['latin'], weight: ['400'], variable: '--font-script' })

export const metadata: Metadata = {
  title: 'Gotham Nightfall Blog',
  description:
    'A Gotham City-inspired interactive blog world with neon night skies, Three.js lighting, and dramatic category beacons.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} ${cinzel.variable} ${script.variable}`}>
        {children}
      </body>
    </html>
  )
}
