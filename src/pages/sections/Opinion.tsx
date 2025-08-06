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
        createdAt: doc.data().createdAt?.toDate() || new Date()
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
              Columna de <span className="bg-gradient-hero bg-clip-text text-transparent">Opinión</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar - Selector oscuro */}
              <div className="order-1 lg:order-2 lg:col-span-1">
                <div className="bg-gray-900 text-white rounded-lg p-6 lg:sticky lg:top-8">
                  <div className="flex items-center mb-6">
                    <div className="w-1 h-6 bg-blue-500 mr-3"></div>
                    <h3 className="text-lg font-bold">Las {columns.length} columnas más leídas</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {columns.map((column, index) => (
                      <Button
                        key={column.id}
                        variant="ghost"
                        className={`w-full justify-between p-3 h-auto text-left ${
                          selectedColumn?.id === column.id 
                            ? 'bg-blue-600 text-white' 
                            : 'text-white hover:bg-gray-800'
                        }`}
                        onClick={() => handleColumnSelect(column)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium opacity-70 flex-shrink-0">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="text-sm font-semibold truncate block">
                              {column.titulo}
                            </span>
                          </div>
                        </div>
                        <span className="text-2xl opacity-50 flex-shrink-0 ml-2">"</span>
                      </Button>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400 text-center">Publicidad</p>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="order-2 lg:order-1 lg:col-span-3">
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