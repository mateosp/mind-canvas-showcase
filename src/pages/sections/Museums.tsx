import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building, Calendar, ExternalLink, Star } from "lucide-react"
import InteractiveMap from "@/components/InteractiveMap"
import { museumsData } from "@/data/mapData"

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
            <h2 className="text-4xl font-bold mb-4">Mapa Interactivo de Colombia</h2>
            <div className="w-24 h-1 bg-gradient-card mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-4">Explora museos y galerías por toda Colombia</p>
          </div>
          
          <InteractiveMap type="museums" data={museumsData} />
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}