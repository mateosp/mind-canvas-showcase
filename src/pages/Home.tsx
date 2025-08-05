import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Eye, Palette, MapPin, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

// Importar imágenes
import misionImg from "@/images/mision2.avif"
import equipoImg from "@/images/equipo.avif"
import serviciosImg from "@/images/servicios.avif"
import contactanosImg from "@/images/contactanos.avif"

// Importar imágenes para las secciones
import artistasImg from "@/images/artistas.avif"
import museosImg from "@/images/museos.jpg"
import eventosImg from "@/images/PrincipalesEventos.avif"
import opinionImg from "@/images/opinion.jpg"

export default function Home() {
  const aboutAnimation = useScrollAnimation();
  const sectionsAnimation = useScrollAnimation();

  const aboutSections = [
    {
      image: misionImg,
      title: "Nuestra Misión",
      description: "Conectar artistas y amantes del arte a través de experiencias transformadoras."
    },
    {
      image: equipoImg,
      title: "Nuestro Equipo",
      description: "Profesionales apasionados por el arte y la cultura latinoamericana."
    },
    {
      image: serviciosImg,
      title: "Nuestros Servicios",
      description: "Viajes, asesorías, búsqueda de obras y proyectos culturales."
    },
    {
      image: contactanosImg,
      title: "Contáctanos",
      description: "Estamos aquí para ayudarte en tu journey artístico."
    }
  ]

  const availableSections = [
    {
      title: "Artistas",
      description: "Descubre talento emergente y establecido",
      image: artistasImg,
      href: "/sections/artists"
    },
    {
      title: "Museos",
      description: "Explora las mejores galerías y museos",
      image: museosImg,
      href: "/sections/museums"
    },
    {
      title: "Principales eventos",
      description: "No te pierdas los eventos más importantes",
      image: eventosImg,
      href: "/sections/events"
    },
    {
      title: "Opinión",
      description: "Análisis y crítica del mundo artístico",
      image: opinionImg,
      href: "/sections/opinion"
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-white">
        <div className="relative z-10 text-center space-y-12 px-4 max-w-4xl mx-auto">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-semibold tracking-wide text-foreground">
              OJOS DE <span className="bg-gradient-hero bg-clip-text text-transparent">ARTE</span>
            </h1>
            <p className="text-lg md:text-xl font-light text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Descubre y conecta con el arte latinoamericano a través de experiencias únicas que transforman la manera de ver y vivir el arte.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button 
              size="lg" 
              variant="default" 
              className="min-w-[200px] font-light bg-primary hover:bg-primary/90 shadow-lg"
              onClick={() => {
                document.getElementById('nuestras-secciones')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Explorar Secciones
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="min-w-[200px] font-light border-foreground/30 hover:bg-foreground/10 backdrop-blur-sm"
              onClick={() => {
                document.getElementById('nuestros-servicios')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Conoce Más
            </Button>
          </motion.div>
        </div>
        
        {/* Colorful decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-accent/25 to-secondary/25 rounded-full blur-xl animate-pulse delay-700"></div>
      </section>

      {/* About Section - 4 columns */}
      <section id="nuestros-servicios" className="py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            ref={aboutAnimation.ref}
            initial={{ opacity: 0, y: 50 }}
            animate={aboutAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-foreground">Nuestros servicios</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Conectamos artistas y amantes del arte a través de experiencias transformadoras en América Latina.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {aboutSections.map((section, index) => (
              <motion.div 
                key={index} 
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={aboutAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="aspect-[4/3] bg-gradient-card rounded-lg mb-6 overflow-hidden relative shadow-card hover:shadow-artistic transition-all duration-500">
                  <img 
                    src={section.image} 
                    alt={section.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm">
                    {section.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Botón centralizado */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={aboutAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link to="/about">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white font-medium px-12 py-3 h-auto"
              >
                Conoce más
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Available Sections */}
      <section id="nuestras-secciones" className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            ref={sectionsAnimation.ref}
            initial={{ opacity: 0, y: 50 }}
            animate={sectionsAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">Nuestras secciones</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Explora nuestro contenido especializado en arte, cultura y creatividad latinoamericana.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {availableSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={sectionsAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Link to={section.href} className="group block">
                  <div className="space-y-3">
                    <div className="aspect-[4/3] bg-card rounded-lg overflow-hidden relative shadow-card hover:shadow-artistic transition-all duration-500 group-hover:scale-105 transform">
                      <img 
                        src={section.image} 
                        alt={section.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}