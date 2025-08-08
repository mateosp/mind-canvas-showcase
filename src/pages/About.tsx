import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Eye, Palette, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

// Importar imágenes
import misionImg from "@/images/mision.avif"
import equipoImg from "@/images/fundadora.avif"
import presenciaImg from "@/images/presencia.avif"

export default function About() {
  // Hooks para animaciones
  const heroAnimation = useScrollAnimation();
  const missionAnimation = useScrollAnimation();
  const teamAnimation = useScrollAnimation();
  const presenceAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();

  const teamMembers = [
    {
      icon: <Eye className="h-12 w-12" />,
      title: "Nuestra Misión",
      content: "En Ojos de Arte, creemos que el arte es un puente entre culturas, una forma poderosa de transmitir historias y crear conexiones humanas profundas. Nuestra misión es democratizar el acceso al arte latinoamericano y crear espacios donde la creatividad y la expresión cultural puedan florecer.",
      image: misionImg
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Una Mirada a La Fundadora",
      content: "Somos un equipo multidisciplinario de profesionales apasionados por el arte y la cultura. Contamos con curadores, historiadores del arte, gestores culturales y expertos en comunicación que trabajan juntos para ofrecer experiencias excepcionales y contenido de calidad.",
      image: equipoImg
    },
    {
      icon: <MapPin className="h-12 w-12" />,
      title: "Nuestra Presencia",
      content: "Con base en América Latina pero con una visión global, conectamos artistas locales con audiencias internacionales. Trabajamos en todo el continente Americano, creando redes de colaboración que trascienden fronteras geográficas y culturales.",
      image: presenciaImg
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
              Acerca de <span className="bg-gradient-hero bg-clip-text text-transparent">Nosotros</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-foreground/80">
              Conectando el arte latinoamericano con el mundo
            </p>
          </div>
        </motion.div>
      </section>

      {/* Mission, Team, Presence */}
      <section className="py-20 bg-white relative">
        {/* Colorful decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-accent/25 to-secondary/25 rounded-full blur-xl animate-pulse delay-700"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="space-y-16">
            {teamMembers.map((member, index) => {
              const animation = index === 0 ? missionAnimation : index === 1 ? teamAnimation : presenceAnimation;
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
                        {member.icon}
                      </div>
                      <h2 className="text-3xl font-bold">{member.title}</h2>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {member.content}
                    </p>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="w-full h-80 bg-gradient-card rounded-2xl overflow-hidden relative shadow-card hover:shadow-artistic transition-all duration-500 group">
                      <img 
                        src={member.image} 
                        alt={member.title}
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
              ¿Listo para explorar el mundo del arte?
            </h2>
            <p className="text-xl text-white/95 font-medium">
            Da el primer paso, contáctanos y haz realidad tu experiencia artística.
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