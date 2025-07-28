import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building, Calendar, ExternalLink, Star } from "lucide-react"

export default function Museums() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold animate-fade-in">
              Museos
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in">
              Explora las mejores galerías y museos de la región
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Mapa Interactivo LATAM</h2>
            <div className="w-24 h-1 bg-gradient-card mx-auto rounded-full"></div>
          </div>
          
          <Card className="border-none shadow-artistic">
            <CardContent className="p-0">
              <div className="h-96 bg-gradient-accent rounded-lg flex items-center justify-center">
                <div className="text-center text-white space-y-4">
                  <Building className="h-16 w-16 mx-auto" />
                  <h3 className="text-2xl font-bold">Mapa Interactivo</h3>
                  <p className="text-lg opacity-90">Museos y Galerías por Región</p>
                  <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm mt-4">
                    Explorar Mapa <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}