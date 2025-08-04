import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Eye, Palette, MapPin, Globe, Heart, Star, Award } from "lucide-react"
import { Link } from "react-router-dom"

export default function About() {
  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Viajes",
      description: "Experiencias artísticas únicas alrededor del mundo con guías especializados."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Asesorías",
      description: "Consultoría personalizada para coleccionistas y amantes del arte."
    },
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

  const teamMembers = [
    {
      icon: <Eye className="h-12 w-12" />,
      title: "Nuestra Misión",
      content: "En Ojos de Arte, creemos que el arte es un puente entre culturas, una forma poderosa de transmitir historias y crear conexiones humanas profundas. Nuestra misión es democratizar el acceso al arte latinoamericano y crear espacios donde la creatividad y la expresión cultural puedan florecer."
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Nuestro Equipo",
      content: "Somos un equipo multidisciplinario de profesionales apasionados por el arte y la cultura. Contamos con curadores, historiadores del arte, gestores culturales y expertos en comunicación que trabajan juntos para ofrecer experiencias excepcionales y contenido de calidad."
    },
    {
      icon: <MapPin className="h-12 w-12" />,
      title: "Nuestra Presencia",
      content: "Con base en América Latina pero con una visión global, conectamos artistas locales con audiencias internacionales. Trabajamos desde México hasta Argentina, creando redes de colaboración que trascienden fronteras geográficas y culturales."
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-7xl font-semibold animate-fade-in text-foreground">
              Acerca de <span className="bg-gradient-hero bg-clip-text text-transparent">Nosotros</span>
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in text-foreground/80">
              Conectando el arte latinoamericano con el mundo
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Team, Presence */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {teamMembers.map((member, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
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
                  <div className="w-full h-64 bg-gradient-accent rounded-2xl shadow-artistic"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nuestros Servicios</h2>
            <div className="w-24 h-1 bg-gradient-card mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
              Ofrecemos una gama completa de servicios para conectarte con el mundo del arte
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-artistic transition-all duration-300 hover:scale-105 border-none bg-gradient-to-br from-card to-muted/30">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-card flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-card text-white relative">
        {/* Overlay para hacer el fondo más oscuro */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-white">
              ¿Listo para explorar el mundo del arte?
            </h2>
            <p className="text-xl text-white/95 font-medium">
              Únete a nuestra comunidad y descubre experiencias artísticas extraordinarias
            </p>
            <div className="flex justify-center">
              <Link to="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                  Contáctanos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}