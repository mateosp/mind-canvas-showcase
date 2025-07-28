import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, User, Palette, Star, ExternalLink } from "lucide-react"

export default function Artists() {
  const featuredArtists = [
    {
      name: "María González",
      country: "México",
      style: "Abstracto Contemporáneo",
      rating: 4.9,
      image: "👩‍🎨",
      description: "Artista emergente especializada en técnicas mixtas y expresionismo abstracto."
    },
    {
      name: "Carlos Silva",
      country: "Argentina",
      style: "Realismo Mágico",
      rating: 4.8,
      image: "👨‍🎨",
      description: "Pintor reconocido internacionalmente por sus obras de realismo mágico."
    },
    {
      name: "Ana Rodríguez",
      country: "Colombia",
      style: "Arte Digital",
      rating: 4.7,
      image: "👩‍💻",
      description: "Pionera en arte digital y nuevas tecnologías aplicadas al arte."
    },
    {
      name: "Diego Martínez",
      country: "Perú",
      style: "Escultura Moderna",
      rating: 4.9,
      image: "👨‍🏭",
      description: "Escultor innovador que combina técnicas tradicionales con materiales modernos."
    }
  ]

  const categories = [
    "Pintura", "Escultura", "Arte Digital", "Fotografía", "Arte Textil", "Cerámica"
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold animate-fade-in">
              Artistas
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in">
              Descubre el talento emergente y establecido de América Latina
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Mapa Interactivo LATAM</h2>
            <div className="w-24 h-1 bg-gradient-card mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-6">
              Explora artistas por ubicación geográfica
            </p>
          </div>
          
          <Card className="border-none shadow-artistic">
            <CardContent className="p-0">
              <div className="h-96 bg-gradient-accent rounded-lg flex items-center justify-center">
                <div className="text-center text-white space-y-4">
                  <MapPin className="h-16 w-16 mx-auto" />
                  <h3 className="text-2xl font-bold">Mapa Interactivo</h3>
                  <p className="text-lg opacity-90">América Latina - Artistas por Región</p>
                  <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm mt-4">
                    Explorar Mapa <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Artistas Destacados</h2>
            <div className="w-24 h-1 bg-gradient-card mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredArtists.map((artist, index) => (
              <Card key={index} className="group hover:shadow-artistic transition-all duration-300 hover:scale-105 border-none bg-gradient-to-br from-card to-muted/30">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="text-6xl">{artist.image}</div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{artist.name}</h3>
                    <div className="flex items-center justify-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{artist.country}</span>
                    </div>
                    <Badge variant="secondary" className="bg-gradient-card text-white">
                      {artist.style}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {artist.description}
                  </p>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{artist.rating}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-gradient-card group-hover:text-white transition-all">
                    Ver Portafolio
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Categorías de Arte</h2>
            <div className="w-24 h-1 bg-gradient-card mx-auto rounded-full"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="hover:bg-gradient-card hover:text-white transition-all duration-300"
              >
                <Palette className="mr-2 h-4 w-4" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}