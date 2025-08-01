import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Sections() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold animate-fade-in">
              Secciones
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in">
              Explora nuestro contenido organizado por categorías
            </p>
          </div>
        </div>
      </section>

      {/* Redirect Message */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              Explora nuestras secciones
            </h2>
            <p className="text-xl text-muted-foreground">
              Haz clic en "Secciones" en la navegación para ver todas nuestras categorías disponibles
            </p>
            <Link to="/">
              <Button size="lg" className="bg-gradient-card hover:shadow-artistic transition-all duration-300">
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}