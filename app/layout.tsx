import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

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
        <header className="border-b">
          <div className="container flex flex-col sm:flex-row h-auto sm:h-16 items-center justify-between px-4 py-2 sm:py-0 md:px-6">
            <Link href="/" className="flex items-center gap-2 mb-2 sm:mb-0">
              <span className="text-xl font-bold">AI Rap Battle</span>
            </Link>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
                Home
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                Agents
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                Battles
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t py-6 md:py-8">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI Rap Battle Arena. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}

