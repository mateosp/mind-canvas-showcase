import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, ChevronDown } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog"
import { Button } from "./button"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Acerca de" },
  { href: "/sections", label: "Secciones", hasModal: true },
  { href: "/contact", label: "Contacto" },
]

const sectionsData = [
  {
    title: "Artistas",
    description: "Descubre talento emergente y establecido",
    href: "/sections/artists"
  },
  {
    title: "Museos", 
    description: "Explora las mejores galerías y museos",
    href: "/sections/museums"
  },
  {
    title: "Principales eventos",
    description: "No te pierdas los eventos más importantes", 
    href: "/sections/events"
  },
  {
    title: "Opinión",
    description: "Análisis y crítica del mundo artístico",
    href: "/sections/opinion"
  }
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSectionsModalOpen, setIsSectionsModalOpen] = useState(false)
  const [isSectionsSubmenuOpen, setIsSectionsSubmenuOpen] = useState(false)
  const location = useLocation()

  // Check if current location is a sections page
  const isSectionsPage = location.pathname.startsWith('/sections/')

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
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.href} className="relative">
                  {item.hasModal ? (
                    <button
                      onClick={() => setIsSectionsModalOpen(true)}
                      className={cn(
                        "relative px-3 py-2 text-sm font-medium transition-all duration-300",
                        "hover:text-primary",
                        (location.pathname === item.href || isSectionsPage)
                          ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-card after:rounded-full"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </button>
                  ) : (
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
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-border animate-fade-in">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.href}>
                    {item.hasModal ? (
                      <div>
                        <button
                          onClick={() => setIsSectionsSubmenuOpen(!isSectionsSubmenuOpen)}
                          className={cn(
                            "flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors",
                            (location.pathname === item.href || isSectionsPage)
                              ? "bg-gradient-card text-white"
                              : "text-muted-foreground hover:text-primary hover:bg-muted"
                          )}
                        >
                          {item.label}
                          <ChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            isSectionsSubmenuOpen && "rotate-180"
                          )} />
                        </button>
                        
                        {isSectionsSubmenuOpen && (
                          <div className="ml-4 mt-2 space-y-1">
                            {sectionsData.map((section) => (
                              <Link
                                key={section.href}
                                to={section.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "block px-3 py-2 rounded-md text-sm transition-colors",
                                  location.pathname === section.href
                                    ? "bg-accent text-white"
                                    : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                                )}
                              >
                                {section.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
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
                    )}
                  </div>
                ))}
                
                {/* Mobile Theme Toggle */}
                <div className="flex justify-center pt-2 pb-1">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Sections Modal */}
      <Dialog open={isSectionsModalOpen} onOpenChange={setIsSectionsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Nuestras Secciones</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 p-6">
            {sectionsData.map((section, index) => (
              <Link
                key={index}
                to={section.href}
                onClick={() => setIsSectionsModalOpen(false)}
                className="group p-6 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}