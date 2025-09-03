import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { useState, useEffect } from "react"
import { db } from "@/config/firebase"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface OpinionColumn {
  id: string
  titulo: string
  descripcion: string
  createdAt: Date
  images?: string[] // Added images property
}

export default function Opinion() {
  const [columns, setColumns] = useState<OpinionColumn[]>([])
  const [selectedColumn, setSelectedColumn] = useState<OpinionColumn | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showFanView, setShowFanView] = useState(true)

  useEffect(() => {
    fetchColumns()
  }, [])

  const fetchColumns = async () => {
    try {
      const q = query(collection(db, "columnas_opinion"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const columnsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        images: doc.data().images || []
      })) as OpinionColumn[]
      
      setColumns(columnsData)
    } catch (error) {
      console.error("Error fetching columns:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleColumnSelect = (column: OpinionColumn) => {
    setSelectedColumn(column)
    setShowFanView(false)
  }

  const handleCloseColumn = () => {
    setSelectedColumn(null)
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
              <p className="text-lg">Cargando columnas de opinión...</p>
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
              Columnas de <span className="bg-gradient-hero bg-clip-text text-transparent">Opinión</span>
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in text-black">
              Análisis y crítica especializada del mundo artístico
            </p>
          </div>
        </div>
      </section>

      {/* Opinion Columns Section */}
      <section className="py-20 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          {columns.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No hay columnas de opinión disponibles
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
                      {columns.map((column, index) => (
                        <motion.div
                          key={column.id}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200"
                          onClick={() => handleColumnSelect(column)}
                        >
                          <div className="p-6 hover:bg-gray-50 transition-colors duration-300">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                    {String(index + 1).padStart(2, '0')}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {column.createdAt.toLocaleDateString('es-ES', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300">
                                  {column.titulo}
                                </h2>
                                <p className="text-gray-600 line-clamp-2 leading-relaxed">
                                  {column.descripcion.substring(0, 150)}...
                                </p>
                                
                                {/* Show images indicator */}
                                {column.images && column.images.length > 0 && (
                                  <div className="flex items-center gap-2 mt-3">
                                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                    <span className="text-xs text-blue-600 font-medium">
                                      {column.images.length} imagen{column.images.length !== 1 ? 'es' : ''} adjunta{column.images.length !== 1 ? 's' : ''}
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
                  ) : selectedColumn && (
                    <motion.div
                      key="column-view"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-lg shadow-lg"
                    >
                      <div className="p-8">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="mb-6"
                        >
                          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {selectedColumn.titulo}
                          </h1>
                          <div className="w-16 h-1 bg-gradient-card rounded-full"></div>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                          className="prose prose-lg max-w-none"
                        >
                          <div className="text-gray-700 leading-relaxed space-y-6">
                            {selectedColumn.descripcion.split('\n').map((paragraph, index) => (
                              <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                                className="text-base leading-7"
                              >
                                {paragraph}
                              </motion.p>
                            ))}
                          </div>
                        </motion.div>

                        {/* Images Section */}
                        {selectedColumn.images && selectedColumn.images.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="mt-8 space-y-4"
                          >
                            <div className="flex justify-center gap-6 flex-wrap">
                              {selectedColumn.images.map((image, index) => (
                                <div key={index} className="group">
                                  <img
                                    src={image}
                                    alt={`Imagen ${index + 1} de ${selectedColumn.titulo}`}
                                    className="w-96 h-96 object-contain rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 cursor-pointer hover:scale-110 shadow-md hover:shadow-lg bg-gray-50"
                                    onError={(e) => {
                                      // Fallback para imágenes que no cargan
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          className="mt-8 pt-6 border-t border-gray-200"
                        >
                          <p className="text-sm text-gray-500">
                            Publicado el {selectedColumn.createdAt.toLocaleDateString('es-ES', {
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
                          transition={{ duration: 0.5, delay: 1 }}
                          className="flex justify-center mt-8"
                        >
                          <button
                            onClick={handleCloseColumn}
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