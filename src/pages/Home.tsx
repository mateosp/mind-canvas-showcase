import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Eye, Palette, MapPin, ArrowRight, Globe, Heart, Star, Award } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { useState } from "react"

// Importar imágenes para las secciones
import artistasImg from "@/images/artistas.avif"
import museosImg from "@/images/museos.avif"
import eventosImg from "@/images/eventos.avif"
import opinionImg from "@/images/opinion.avif"

// Importar imágenes para los servicios
import viajesImg from "@/images/viajes.avif"
import asesoriasImg from "@/images/asesorias.avif"

export default function Home() {
  const sectionsAnimation = useScrollAnimation();
  const servicesAnimation = useScrollAnimation();
  const [showAdditionalServices, setShowAdditionalServices] = useState(false);

  const mainServices = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Viajes",
      description: "Experiencias artísticas únicas alrededor del mundo con guías especializados.",
      image: viajesImg
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Asesorías",
      description: "Consultoría personalizada para coleccionistas y amantes del arte.",
      isExpandable: true,
      image: asesoriasImg
    }
  ]

  const additionalServices = [
    {
      icon: <Star className="h-8 w-8" />,
      title: "Búsqueda y compra de obras de arte",
      description: "Te ayudamos a encontrar la pieza perfecta para tu colección."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Proyectos culturales",
      description: "Desarrollo de iniciativas que fortalecen la cultura local."
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Proyectos patrimoniales",
      description: "Preservación y promoción del patrimonio artístico."
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
              className="min-w-[200px] font-light bg-gradient-card hover:shadow-artistic transition-all duration-300"
              onClick={() => {
                document.getElementById('nuestras-secciones')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Explorar Secciones
            </Button>
            <Link to="/about">
              <Button 
                size="lg" 
                variant="outline" 
                className="min-w-[200px] font-light border-foreground/30 hover:bg-foreground/10 backdrop-blur-sm"
              >
                Conoce Más
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Colorful decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-accent/25 to-secondary/25 rounded-full blur-xl animate-pulse delay-700"></div>
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
            <p className="text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
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

      {/* Services */}
      <section id="nuestros-servicios" className="py-20 bg-gradient-card text-white relative">
        {/* Overlay para hacer el fondo más oscuro */}
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div 
          ref={servicesAnimation.ref}
          initial={{ opacity: 0, y: 50 }}
          animate={servicesAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Nuestros Servicios</h2>
            <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
            <p className="text-white/95 mt-6 max-w-2xl mx-auto">
              Ofrecemos una gama completa de servicios para conectarte con el mundo del arte
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className={`h-full group hover:shadow-artistic transition-all duration-300 hover:scale-105 border-none bg-white/10 backdrop-blur-sm ${service.isExpandable ? 'cursor-pointer' : ''}`}
                  onClick={service.isExpandable ? () => setShowAdditionalServices(!showAdditionalServices) : undefined}
                >
                  <CardContent className="p-8 text-center h-full flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      {/* Imagen del servicio */}
                      <div className="aspect-[4/3] bg-white/10 rounded-lg overflow-hidden relative shadow-card hover:shadow-artistic transition-all duration-500 group-hover:scale-105 transform">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                      </div>
                      
                      {/* Icono y título */}
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                          {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                      </div>
                      
                      <p className="text-white/80 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <div className="pt-2 min-h-[2rem] flex items-center justify-center">
                      {service.isExpandable && (
                        <span className="text-sm text-white/90 font-medium group-hover:underline">
                          {showAdditionalServices ? 'Ocultar servicios adicionales' : 'Ver más servicios'}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Servicios adicionales */}
          {showAdditionalServices && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {additionalServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-artistic transition-all duration-300 hover:scale-105 border-none bg-white/10 backdrop-blur-sm">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}