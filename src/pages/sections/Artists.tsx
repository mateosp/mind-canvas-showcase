import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { useState, useEffect } from "react"
import { db } from "@/config/firebase"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { ChevronRight, X, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Artist {
  id: string
  titulo: string
  ubicacion: string
  texto: string
  imagen: string
  createdAt: Date
}

export default function Artists() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showFanView, setShowFanView] = useState(true)

  useEffect(() => {
    fetchArtists()
  }, [])

  const fetchArtists = async () => {
    try {
      const q = query(collection(db, "artistas"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const artistsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Artist[]
      
      setArtists(artistsData)
    } catch (error) {
      console.error("Error fetching artists:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleArtistSelect = (artist: Artist) => {
    setSelectedArtist(artist)
    setShowFanView(false)
  }

  const handleCloseArtist = () => {
    setSelectedArtist(null)
    setShowFanView(true)
    
    // Scroll suave al inicio de la sección después de un pequeño delay
    setTimeout(() => {
      const section = document.querySelector('section[class*="py-20"]')
      if (section) {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 100)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg">Cargando artistas...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-semibold animate-fade-in text-foreground">
              <span className="bg-gradient-hero bg-clip-text text-transparent">Artistas</span>
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in text-black">
              Descubre el talento emergente y establecido de América Latina
            </p>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section className="py-20 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          {artists.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No hay artistas disponibles
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Main Content Area */}
              <div>
                <AnimatePresence mode="wait">
                  {showFanView ? (
                    <motion.div
                      key="fan-view"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      {artists.map((artist, index) => (
                        <motion.div
                          key={artist.id}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200"
                          onClick={() => handleArtistSelect(artist)}
                        >
                          <div className="p-6 hover:bg-gray-50 transition-colors duration-300">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                    {String(index + 1).padStart(2, '0')}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {artist.createdAt.toLocaleDateString('es-ES', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300">
                                  {artist.titulo}
                                </h2>
                                <div className="flex items-center gap-2 mb-3">
                                  <MapPin className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-600">{artist.ubicacion}</span>
                                </div>
                                <p className="text-gray-600 line-clamp-2 leading-relaxed">
                                  {artist.texto.substring(0, 150)}...
                                </p>
                                
                                {/* Show image indicator */}
                                {artist.imagen && (
                                  <div className="flex items-center gap-2 mt-3">
                                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                    <span className="text-xs text-green-600 font-medium">
                                      Imagen disponible
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <div className="w-12 h-12 bg-gradient-card rounded-full flex items-center justify-center text-white">
                                  <ChevronRight className="w-6 h-6" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : selectedArtist && (
                    <motion.div
                      key="artist-view"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-lg shadow-lg"
                    >
                      <div className="p-8">
                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          
                          {/* Left Column - Image */}
                          {selectedArtist.imagen && (
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, delay: 0.3 }}
                              className="flex justify-center lg:justify-start"
                            >
                              <img
                                src={selectedArtist.imagen}
                                alt={`Imagen de ${selectedArtist.titulo}`}
                                className="w-full max-w-md h-auto object-contain rounded-lg border-2 border-gray-200 shadow-lg"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            </motion.div>
                          )}
                          
                          {/* Right Column - Content */}
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="space-y-6"
                          >
                            {/* Title and Location */}
                            <div>
                              <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                              >
                                {selectedArtist.titulo}
                              </motion.h1>
                              
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="flex items-center gap-3 mb-6"
                              >
                                <MapPin className="h-5 w-5 text-gray-500" />
                                <span className="text-lg text-gray-600">{selectedArtist.ubicacion}</span>
                              </motion.div>
                              
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="w-16 h-1 bg-gradient-card rounded-full"
                              ></motion.div>
                            </div>
                            
                            {/* Text Content */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.6, delay: 0.8 }}
                              className="prose prose-lg max-w-none"
                            >
                              <div className="text-gray-700 leading-relaxed space-y-6">
                                {selectedArtist.texto.split('\n').map((paragraph, index) => (
                                  <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.9 + (index * 0.1) }}
                                    className="text-base leading-7"
                                  >
                                    {paragraph}
                                  </motion.p>
                                ))}
                              </div>
                            </motion.div>
                            
                          </motion.div>
                        </div>
                        
                        {/* Publication Date - Below both columns */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.2 }}
                          className="pt-8 border-t border-gray-200 mt-8"
                        >
                          <p className="text-sm text-gray-500 text-center">
                            Publicado el {selectedArtist.createdAt.toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </motion.div>
                        
                        {/* Close Button */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.4 }}
                          className="flex justify-center mt-8"
                        >
                          <button
                            onClick={handleCloseArtist}
                            className="w-12 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}