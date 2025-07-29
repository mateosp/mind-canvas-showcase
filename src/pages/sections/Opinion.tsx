import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Newspaper, PenTool, MessageSquare } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { OpinionCard } from "@/components/OpinionCard"
import { pressOpinions, columnOpinions } from "@/data/opinionData"

export default function Opinion() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold animate-fade-in">
              Opinión
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in">
              Análisis y crítica especializada del mundo artístico
            </p>
          </div>
        </div>
      </section>

      {/* Opinion Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Secciones de Opinión</h2>
            <div className="w-24 h-1 bg-gradient-card mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-artistic transition-all duration-300 hover:scale-105 border-none bg-gradient-to-br from-card to-muted/30">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-card flex items-center justify-center text-white">
                  <PenTool className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">Columnas</h3>
                <p className="text-muted-foreground">
                  Artículos de opinión por expertos en arte
                </p>
                <Badge variant="secondary" className="bg-gradient-card text-white">
                  Análisis Especializado
                </Badge>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-artistic transition-all duration-300 hover:scale-105 border-none bg-gradient-to-br from-card to-muted/30">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-card flex items-center justify-center text-white">
                  <Newspaper className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold">Prensa</h3>
                <p className="text-muted-foreground">
                  Cobertura de noticias del mundo artístico
                </p>
                <Badge variant="secondary" className="bg-gradient-card text-white">
                  Actualidad Artística
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Press Opinions Carousel */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Lo que dice la Prensa</h2>
            <p className="text-xl text-muted-foreground mb-4">
              Cobertura y críticas de los medios especializados
            </p>
            <div className="w-24 h-1 bg-gradient-card mx-auto rounded-full"></div>
          </div>
          
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {pressOpinions.map((opinion) => (
                  <CarouselItem key={opinion.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <OpinionCard opinion={opinion} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Column Opinions Carousel */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Opiniones de Expertos</h2>
            <p className="text-xl text-muted-foreground mb-4">
              Análisis especializado de críticos y teóricos del arte
            </p>
            <div className="w-24 h-1 bg-gradient-card mx-auto rounded-full"></div>
          </div>
          
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {columnOpinions.map((opinion) => (
                  <CarouselItem key={opinion.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <OpinionCard opinion={opinion} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}