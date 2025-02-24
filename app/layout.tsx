import type React from "react"
import "./globals.css"
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-great-vibes" })

export const metadata = {
  title: "Casamento de Vitor & Laura",
  description: "Junte-se a nós para celebrar o casamento de Vitor e Laura",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} font-sans`}>{children}</body>
    </html>
  )
}

