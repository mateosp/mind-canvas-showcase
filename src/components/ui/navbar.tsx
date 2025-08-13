import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/about", label: "Acerca de" },
  { href: "/services", label: "Servicios" },
  { href: "/sections/artists", label: "Artistas" },
  { href: "/sections/museums", label: "Museos" },
  { href: "/sections/opinion", label: "Opinión" },
  { href: "/sections/events", label: "Eventos" },
  { href: "/contact", label: "Contacto" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-card bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              O.D.A
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.href} className="relative">
                  <Link
                    to={item.href}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium transition-all duration-300",
                      "hover:text-primary",
                      location.pathname === item.href
                        ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-card after:rounded-full"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile/Tablet menu button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Navigation */}
          {isOpen && (
            <div className="lg:hidden border-t border-border animate-fade-in">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                      location.pathname === item.href
                        ? "bg-gradient-card text-white"
                        : "text-muted-foreground hover:text-primary hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}