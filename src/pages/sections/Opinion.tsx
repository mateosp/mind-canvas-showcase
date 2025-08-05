import { Navbar } from "@/components/ui/navbar"
import { Newsletter } from "@/components/ui/newsletter"
import { Footer } from "@/components/ui/footer"
import { useState, useEffect } from "react"
import { db } from "@/config/firebase"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"



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
      if (columnsData.length > 0 && !selectedColumn) {
        setSelectedColumn(columnsData[0])
      }
    } catch (error) {
      console.error("Error fetching columns:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleColumnSelect = (column: OpinionColumn) => {
    setSelectedColumn(column)
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
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-semibold animate-fade-in text-foreground">
              <span className="bg-gradient-hero bg-clip-text text-transparent">Opinión</span>
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in text-black">
              Análisis y crítica especializada del mundo artístico
            </p>
          </div>
        </div>
      </section>

      {/* Opinion Columns Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Columna de Opiniones</h2>
            <div className="w-24 h-1 bg-gradient-card mx-auto rounded-full"></div>
          </div>
          
          {columns.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No hay columnas de opinión disponibles
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {selectedColumn && (
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="mb-6">
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {selectedColumn.titulo}
                      </h1>
                      <div className="w-16 h-1 bg-gradient-card rounded-full"></div>
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <div className="text-gray-700 leading-relaxed space-y-6">
                        {selectedColumn.descripcion.split('\n').map((paragraph, index) => (
                          <p key={index} className="text-base leading-7">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        Publicado el {selectedColumn.createdAt.toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900 text-white rounded-lg p-6 sticky top-8">
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
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium opacity-70">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="text-sm font-semibold truncate">
                              {column.titulo}
                            </span>
                          </div>
                        </div>
                        <span className="text-2xl opacity-50">"</span>
                      </Button>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400 text-center">Publicidad</p>
                  </div>
                </div>
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