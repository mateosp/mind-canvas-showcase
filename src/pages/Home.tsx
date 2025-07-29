import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Users, Eye, Palette, MapPin, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function Home() {
  const aboutSections = [
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Nuestra Misión",
      description: "Conectar artistas y amantes del arte a través de experiencias transformadoras."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Nuestro Equipo",
      description: "Profesionales apasionados por el arte y la cultura latinoamericana."
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Nuestros Servicios",
      description: "Viajes, asesorías, búsqueda de obras y proyectos culturales."
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Contáctanos",
      description: "Estamos aquí para ayudarte en tu journey artístico."
    }
  ]

  const availableSections = [
    {
      title: "Artistas",
      description: "Descubre talento emergente y establecido",
      image: "🎨",
      href: "/sections/artists"
    },
    {
      title: "Museos",
      description: "Explora las mejores galerías y museos",
      image: "🏛️",
      href: "/sections/museums"
    },
    {
      title: "Principales eventos",
      description: "No te pierdas los eventos más importantes",
      image: "🎭",
      href: "/sections/events"
    },
    {
      title: "Opinión",
      description: "Análisis y crítica del mundo artístico",
      image: "✍️",
      href: "/sections/opinion"
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="relative z-10 text-center space-y-12 px-4 max-w-4xl mx-auto">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-light tracking-wide text-foreground">
              OJOS DE ARTE
            </h1>
            <p className="text-lg md:text-xl font-light text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Descubre y conecta con el arte latinoamericano a través de experiencias únicas que transforman la manera de ver y vivir el arte.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in">
            <Link to="/sections">
              <Button size="lg" variant="default" className="min-w-[200px] font-light bg-primary hover:bg-primary/90 shadow-lg">
                Explorar Secciones
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="min-w-[200px] font-light border-foreground/30 hover:bg-foreground/10 backdrop-blur-sm">
                Conoce Más
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Colorful decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-accent/25 to-secondary/25 rounded-full blur-xl animate-pulse delay-700"></div>
      </section>

      {/* About Section - 4 columns */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-foreground">Nuestros servicios</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Conectamos artistas y amantes del arte a través de experiencias transformadoras en América Latina.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {aboutSections.map((section, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-gradient-card rounded-lg mb-6 overflow-hidden relative shadow-card hover:shadow-artistic transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center text-5xl text-primary/70">
                    {section.icon}
                  </div>
                  <div className="absolute inset-0 bg-white/40 group-hover:bg-white/20 transition-all duration-500"></div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm">
                    {section.description}
                  </p>
                  <div className="pt-2">
                    <span className="text-xs text-accent font-medium group-hover:underline">
                      Conoce más
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Sections */}
      <section className="py-32 bg-gradient-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light mb-6">Nuestras secciones</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Explora nuestro contenido especializado en arte, cultura y creatividad latinoamericana.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {availableSections.map((section, index) => (
              <Link key={index} to={section.href} className="group block">
                <div className="space-y-6">
                  <div className="aspect-[4/3] bg-card rounded-lg overflow-hidden relative shadow-card hover:shadow-artistic transition-all duration-500">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                      {section.image}
                    </div>
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-all duration-500"></div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground font-light leading-relaxed">
                      {section.description}
                    </p>
                    <div className="pt-2">
                      <span className="text-sm text-accent font-medium group-hover:underline">
                        Explorar sección
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}