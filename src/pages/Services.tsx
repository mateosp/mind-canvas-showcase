import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Heart, Star, Award, Palette } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

// Importar imágenes de los servicios
import viajesImg from "@/images/viajes.avif"
import asesoriasImg from "@/images/asesorias.avif"

export default function Services() {
  // Hooks para animaciones
  const heroAnimation = useScrollAnimation();
  const viajesAnimation = useScrollAnimation();
  const asesoriasAnimation = useScrollAnimation();
  const adicionalesAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();

  const servicios = [
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Viajes",
      content: (
        <>
          ¿Planeando tu próxima aventura? Te ayudamos a convertirla en una experiencia curada, pensada especialmente para ti.
          Diseñamos itinerarios que giran en torno al arte, la cultura y tus intereses personales, desde museos escondidos hasta recorridos que cuentan historias locales. <br /> <br />
          Además, te compartimos los mejores tips para viajar con estilo y estrategia: promociones, descuentos y secretos que solo se descubren cuando se mira con ojos de arte.
        </>
      ),
      image: viajesImg,
      showContactButton: true
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Asesorías",
      content: "¿Eres amante del arte, coleccionista o gestor cultural en busca de guía experta y mirada sensible? Te acompañamos en cada paso con asesoría personalizada que une estrategia, estética y propósito.",
      image: asesoriasImg,
      showContactButton: false
    }
  ]

  const serviciosAdicionales = [
    {
      icon: <Star className="h-12 w-12" />,
      title: "Colecciones con sentido",
      content: <>¿Quieres iniciar o expandir tu colección de arte? Te ayudamos a encontrar de forma <strong>gratuita</strong> obras que no solo embellecen, sino que cuentan <strong>historias</strong>. Cada pieza es elegida con criterio curatorial y conexión emocional.</> 
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: "Proyectos culturales que dejan huella",
      content: "Diseñamos y desarrollamos iniciativas que fortalecen el tejido cultural local, conectando comunidades, espacios y narrativas."
    },
    {
      icon: <Palette className="h-12 w-12" />,
      title: "Patrimonio en contexto",
      content: "Impulsamos proyectos centrados en la preservación, diagnóstico y puesta en valor del patrimonio material. Desde edificios históricos hasta espacios urbanos con memoria, trabajamos con rigor técnico y sensibilidad cultural."
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <motion.div 
          ref={heroAnimation.ref}
          initial={{ opacity: 0, y: 30 }}
          animate={heroAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center"
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-7xl font-semibold text-foreground">
              <span className="bg-gradient-hero bg-clip-text text-transparent">Servicios</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-foreground/80">
              Ofrecemos una gama completa de servicios para conectarte con el mundo del arte
            </p>
          </div>
        </motion.div>
      </section>

      {/* Servicios Principales */}
      <section className="py-20 bg-white relative">
        {/* Colorful decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-accent/25 to-secondary/25 rounded-full blur-xl animate-pulse delay-700"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="space-y-16">
            {servicios.map((servicio, index) => {
              const animation = index === 0 ? viajesAnimation : asesoriasAnimation;
              return (
                <motion.div 
                  key={index} 
                  ref={animation.ref}
                  initial={{ opacity: 0, y: 50 }}
                  animate={animation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
                >
                  <div className="lg:w-1/2 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-card flex items-center justify-center text-white">
                        {servicio.icon}
                      </div>
                      <h2 className="text-3xl font-bold">{servicio.title}</h2>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {servicio.content}
                    </p>
                    {servicio.showContactButton && (
                      <div className="flex justify-center pt-4">
                        <Link to="/contact">
                          <Button 
                            size="lg" 
                            variant="default" 
                            className="min-w-[200px] font-light bg-gradient-card hover:shadow-artistic transition-all duration-300"
                          >
                            Contáctanos
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="lg:w-1/2">
                    <div className="w-full h-80 bg-gradient-card rounded-2xl overflow-hidden relative shadow-card hover:shadow-artistic transition-all duration-500 group">
                      <img 
                        src={servicio.image} 
                        alt={servicio.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Servicios Adicionales */}
      <section className="py-20 bg-gradient-card text-white relative">
        {/* Overlay para hacer el fondo más oscuro */}
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div 
          ref={adicionalesAnimation.ref}
          initial={{ opacity: 0, y: 50 }}
          animate={adicionalesAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Asesorías Especializadas</h2>
            <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
            <p className="text-white/95 mt-6 max-w-2xl mx-auto">
              Complementamos nuestros servicios principales con soluciones especializadas para satisfacer todas tus necesidades artísticas
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {serviciosAdicionales.map((servicio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={adicionalesAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="w-full sm:w-80 lg:w-96"
              >
                <Card className="h-full group hover:shadow-artistic transition-all duration-300 hover:scale-105 border-none bg-white/10 backdrop-blur-sm">
                  <CardContent className="p-8 text-center h-full flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        {servicio.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{servicio.title}</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {servicio.content}
                      </p>
                    </div>
                    <div className="pt-4">
                      <Link to="/contact">
                        <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                          Contáctanos
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-card text-white relative">
        {/* Overlay para hacer el fondo más oscuro */}
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div 
          ref={ctaAnimation.ref}
          initial={{ opacity: 0, y: 50 }}
          animate={ctaAnimation.isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-white">
              ¿Listo para experimentar nuestros servicios?
            </h2>
            <p className="text-xl text-white/95 font-medium">
              Contáctanos para descubrir cómo podemos ayudarte a conectar con el mundo del arte de manera única y personalizada.
            </p>
            <div className="flex justify-center">
              <Link to="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                  Contáctanos
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
} 