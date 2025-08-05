import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-card bg-clip-text text-transparent">
              OJOS DE ARTE
            </h3>
            <p className="text-sm text-muted-foreground">
              Arte - Identidad - Narrativa
            </p>
            <p className="text-sm text-muted-foreground">
              Conectando el arte latinoamericano con el mundo.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold">Navegación</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Inicio
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Acerca de
              </Link>
              <Link to="/sections" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Secciones
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contacto
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contacto</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@ojosdearte.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+57 (300) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Barranquilla, Colombia</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold">Síguenos</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-gradient-card text-white rounded-full hover:shadow-artistic transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gradient-card text-white rounded-full hover:shadow-artistic transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gradient-card text-white rounded-full hover:shadow-artistic transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Copyright © 2025 Ojos de arte - Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}