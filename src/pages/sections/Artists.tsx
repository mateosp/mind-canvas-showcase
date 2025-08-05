import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"

export default function Artists() {
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
        <div className="w-[90%] mx-auto h-[80vh]">
          <iframe
            src="https://storymaps.arcgis.com/stories/92dfadfc835845eb9d08fb9599cd7d7b?header"
            title="Mapa Interactivo de Artistas"
            className="w-full h-full border-0 rounded-lg shadow-lg"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}