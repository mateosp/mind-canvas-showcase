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
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center space-y-8 px-4">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold tracking-wider">
              OJOS DE ARTE
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-widest">
              ARTE - IDENTIDAD - NARRATIVA
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Link to="/sections">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                SECCIONES
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                OBTÉN MAS INFORMACIÓN
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Acerca de Ojos de arte</h2>
            <div className="w-24 h-1 bg-gradient-card mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutSections.map((section, index) => (
              <Card key={index} className="group hover:shadow-artistic transition-all duration-300 hover:scale-105 border-none bg-gradient-to-br from-card to-muted/30">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-card flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold">{section.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {section.description}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-4 group-hover:text-primary">
                    Ver más <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Available Sections */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">SECCIONES DISPONIBLES</h2>
            <div className="w-24 h-1 bg-gradient-card mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {availableSections.map((section, index) => (
              <Link key={index} to={section.href}>
                <Card className="group overflow-hidden hover:shadow-artistic transition-all duration-500 hover:scale-[1.02] border-none bg-gradient-to-br from-card to-muted/50">
                  <div className="relative h-64 bg-gradient-card flex items-center justify-center text-6xl">
                    {section.image}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
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