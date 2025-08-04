import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Globe, MapPin, Clock } from "lucide-react"

export default function Events() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-semibold animate-fade-in text-foreground">
              <span className="bg-gradient-hero bg-clip-text text-transparent">Eventos</span>
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in text-foreground/80">
              No te pierdas los eventos artísticos más importantes
            </p>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-20 bg-white relative">
        {/* Colorful decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-accent/25 to-secondary/25 rounded-full blur-xl animate-pulse delay-700"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Categorías de Eventos</h2>
            <div className="w-24 h-1 bg-gradient-card mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card 
              className="group hover:shadow-artistic transition-all duration-300 hover:scale-105 border-none bg-gradient-to-br from-card to-muted/30 cursor-pointer"
              onClick={() => window.open("https://storymaps.arcgis.com/stories/2c549946805a4232b733879661808f02?header", "_blank")}
            >
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-card flex items-center justify-center text-white">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">LATAM</h3>
                <p className="text-muted-foreground">
                  Eventos destacados en América Latina
                </p>
                <Badge variant="secondary" className="bg-gradient-card text-white">
                  Eventos Regionales
                </Badge>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-artistic transition-all duration-300 hover:scale-105 border-none bg-gradient-to-br from-card to-muted/30 cursor-pointer"
              onClick={() => window.open("https://storymaps.arcgis.com/stories/20b164e7a49d45ff9b65398b7a1f8466?header", "_blank")}
            >
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-card flex items-center justify-center text-white">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">Worldwide</h3>
                <p className="text-muted-foreground">
                  Eventos internacionales imperdibles
                </p>
                <Badge variant="secondary" className="bg-gradient-card text-white">
                  Eventos Globales
                </Badge>
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