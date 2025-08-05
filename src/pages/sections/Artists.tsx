import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function Artists() {
  const handleMapClick = () => {
    window.open("https://storymaps.arcgis.com/stories/92dfadfc835845eb9d08fb9599cd7d7b?header", "_blank")
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold animate-fade-in bg-gradient-hero bg-clip-text text-transparent">
              Artistas
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in text-black">
              Descubre el talento emergente y establecido de América Latina
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card 
              className="group hover:shadow-artistic transition-all duration-300 hover:scale-105 border-none bg-gradient-to-br from-card to-muted/30 cursor-pointer"
              onClick={handleMapClick}
            >
              <CardContent className="p-8 text-center space-y-6">
                <div className="text-6xl">🗺️</div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">Explora el Mapa de Artistas</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Descubre artistas de toda América Latina en nuestro mapa interactivo. 
                    Haz clic para explorar las ubicaciones y obras de artistas destacados.
                  </p>
                  <Button 
                    className="bg-gradient-card hover:shadow-artistic transition-all duration-300"
                    size="lg"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Abrir Mapa Interactivo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}