import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Calendar, Users, FileText } from "lucide-react"
import { Link } from "react-router-dom"

export default function Sections() {
  const sections = [
    {
      title: "Artistas",
      icon: <Users className="h-8 w-8" />,
      description: "Descubre talento emergente y establecido de América Latina",
      features: ["Mapa interactivo LATAM", "Perfiles detallados", "Portafolios digitales"],
      image: "🎨",
      href: "/sections/artists",
      color: "from-pink-500 to-purple-600"
    },
    {
      title: "Museos",
      icon: <MapPin className="h-8 w-8" />,
      description: "Explora las mejores galerías y museos de la región",
      features: ["Mapa interactivo LATAM", "Exhibiciones actuales", "Tours virtuales"],
      image: "🏛️",
      href: "/sections/museums",
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Principales eventos",
      icon: <Calendar className="h-8 w-8" />,
      description: "No te pierdas los eventos artísticos más importantes",
      features: ["LATAM", "Worldwide", "Agenda personalizada"],
      image: "🎭",
      href: "/sections/events",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Opinión",
      icon: <FileText className="h-8 w-8" />,
      description: "Análisis y crítica especializada del mundo artístico",
      features: ["Columnas", "Prensa", "Críticas especializadas"],
      image: "✍️",
      href: "/sections/opinion",
      color: "from-orange-500 to-red-600"
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold animate-fade-in">
              Secciones
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in">
              Explora nuestro contenido organizado por categorías
            </p>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Secciones Disponibles</h2>
            <div className="w-24 h-1 bg-gradient-card mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
              Cada sección está diseñada para ofrecerte una experiencia única y enriquecedora
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-artistic transition-all duration-500 hover:scale-[1.02] border-none bg-gradient-to-br from-card to-muted/30">
                <div className={`relative h-48 bg-gradient-to-br ${section.color} flex items-center justify-center text-6xl`}>
                  {section.image}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                      {section.icon}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {section.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {section.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="secondary" className="bg-gradient-card text-white">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <Link to={section.href}>
                      <Button className="w-full mt-6 bg-gradient-card hover:shadow-artistic transition-all duration-300 group">
                        Explorar {section.title}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-xl text-muted-foreground">
              Contáctanos y te ayudaremos a encontrar exactamente lo que necesitas
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-card hover:shadow-artistic transition-all duration-300">
                Contactar
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}