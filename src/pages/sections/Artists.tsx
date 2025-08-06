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

      {/* Consultancy Link Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-500 hover:scale-[1.02] cursor-pointer"
              onClick={() => {
                if (window.location.pathname === '/') {
                  document.getElementById('nuestros-servicios')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                } else {
                  window.location.href = '/#nuestros-servicios'
                }
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <p className="text-lg mb-6 leading-relaxed">
                <span className="text-black font-semibold hover:text-gray-700 transition-all duration-300">
                  Te ofrecemos consultorías personalizadas para coleccionistas y amantes del arte.
                </span>
              </p>
              <div className="flex justify-center">
                <div className="w-24 h-1 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}