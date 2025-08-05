import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"

export default function Museums() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-muted/30 text-black">
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

      {/* ArcGIS Map Section */}
      <section className="py-30 bg-background">
        <div className="w-[90%] h-[80vh] mx-auto museums-iframe">
          <iframe 
            src="https://storymaps.arcgis.com/stories/4a0bcac304d3492283e37cca2537b6cd?cover=false" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allowFullScreen 
            allow="geolocation"
            className="w-full h-full"
            loading="lazy"
            title="Mapa de Museos en Colombia"
          ></iframe>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}