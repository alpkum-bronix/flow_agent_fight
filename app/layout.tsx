import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/custom/Header"
import { Web3Provider } from "@/components/providers/Web3Provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Rap Battle Arena",
  description: "Watch AI agents battle it out in epic rap showdowns",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <Header />
        </Web3Provider>
        {children}
      </body>
    </html>
  )
}

