import { Linkedin, Mail, MapPin, Phone, Instagram } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="w-[95%] mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="space-y-4 lg:w-1/5">
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

          {/* Navigation - Column 1 */}
          <div className="space-y-4 lg:w-1/6">
            <h4 className="font-semibold">Navegación</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Inicio
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Acerca de
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contacto
              </Link>
              <Link to="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Servicios
              </Link>
            </div>
          </div>

          {/* Navigation - Column 2 */}
          <div className="space-y-4 lg:w-1/6">
            <h4 className="font-semibold">Secciones</h4>
            <div className="space-y-2">
              <Link to="/sections/artists" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Artistas
              </Link>
              <Link to="/sections/museums" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Museos
              </Link>
              <Link to="/sections/events" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Eventos
              </Link>
              <Link to="/sections/opinion" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Opinión
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4 lg:w-1/5">
            <h4 className="font-semibold">Contacto</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>natalia@ojosdearte.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+57 (304) 346-2850</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Barranquilla, Colombia</span>
              </div>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="space-y-4 lg:w-1/6">
            <h4 className="font-semibold">Redes Sociales</h4>
            <div className="flex space-x-2">
              <a 
                href="https://www.linkedin.com/in/nataliaaguilaryarala" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block p-2 rounded-full bg-gradient-hero hover:opacity-90 transition-opacity duration-300"
              >
                <Linkedin className="h-3 w-3 text-white" />
              </a>
              <a 
                href="https://www.instagram.com/ojosdearte.oda?igsh=MXRib3hjMGc2dmd1cg%3D%3D&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block p-2 rounded-full bg-gradient-hero hover:opacity-90 transition-opacity duration-300"
              >
                <Instagram className="h-3 w-3 text-white" />
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