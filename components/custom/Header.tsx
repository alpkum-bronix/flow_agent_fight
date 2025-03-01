"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ConnectKitButton } from "connectkit"
import { ThemeToggle } from "./ThemeToggle"

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-primary">AI Rap Battle</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={
                pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary transition-colors"
              }
            >
              Home
            </Link>
            <Link
              href="/agents"
              className={
                pathname.startsWith("/agents")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary transition-colors"
              }
            >
              Agents
            </Link>
            <Link
              href="/battles"
              className={
                pathname.startsWith("/battles")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary transition-colors"
              }
            >
              Battles
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">{/* Add search functionality here if needed */}</div>
          <nav className="flex items-center space-x-4">
            <ThemeToggle />
            <ConnectKitButton.Custom>
              {({ show, isConnected, truncatedAddress }) => (
                <Button
                  variant="outline"
                  onClick={show}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
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

