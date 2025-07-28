import { useState } from "react"
import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast({
      title: "¡Mensaje enviado!",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    })
    
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "info@ojosdearte.com",
      description: "Escríbenos cualquier duda"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Teléfono",
      content: "+1 (555) 123-4567",
      description: "Lunes a Viernes, 9AM - 6PM"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Ubicación",
      content: "Ciudad de México, México",
      description: "América Latina"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Horarios",
      content: "Lun - Vie: 9AM - 6PM",
      description: "Tiempo estándar de México"
    }
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold animate-fade-in">
              Contacto
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in">
              Estamos aquí para ayudarte en tu journey artístico
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Envíanos un mensaje</h2>
                <p className="text-muted-foreground">
                  Complete el formulario y nos pondremos en contacto contigo lo antes posible.
                </p>
              </div>
              
              <Card className="border-none shadow-card-elegant">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Nombre *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Asunto *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="¿En qué podemos ayudarte?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Mensaje *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Cuéntanos más detalles..."
                        rows={6}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-card hover:shadow-artistic transition-all duration-300"
                      size="lg"
                    >
                      {isSubmitting ? (
                        "Enviando..."
                      ) : (
                        <>
                          Enviar mensaje
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">Información de contacto</h2>
                <p className="text-muted-foreground">
                  Puedes contactarnos a través de cualquiera de estos medios.
                </p>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="group hover:shadow-artistic transition-all duration-300 border-none bg-gradient-to-br from-card to-muted/30">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-card flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                          <p className="text-primary font-medium">{info.content}</p>
                          <p className="text-sm text-muted-foreground">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Map placeholder */}
              <Card className="border-none shadow-card-elegant">
                <CardContent className="p-0">
                  <div className="h-64 bg-gradient-accent rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <MapPin className="h-12 w-12 mx-auto mb-4" />
                      <p className="text-lg font-medium">Mapa interactivo</p>
                      <p className="text-sm opacity-80">Ciudad de México, México</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}