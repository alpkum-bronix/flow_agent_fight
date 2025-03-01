"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ConnectKitButton } from "connectkit"

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              AI Rap Battle
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={pathname === "/" ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
            >
              Home
            </Link>
            <Link
              href="/agents"
              className={pathname.startsWith("/agents") ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
            >
              Agents
            </Link>
            <Link
              href="/battles"
              className={pathname.startsWith("/battles") ? "text-foreground" : "text-foreground/60 transition-colors hover:text-foreground"}
            >
              Battles
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search functionality here if needed */}
          </div>
          <nav className="flex items-center">
            <ConnectKitButton.Custom>
              {({ show, isConnected, truncatedAddress }) => (
                <Button
                  variant="outline"
                  onClick={show}
                >
                  {isConnected ? truncatedAddress : "Connect Wallet"}
                </Button>
              )}
            </ConnectKitButton.Custom>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
