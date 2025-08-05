import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Trash2, Download, Search, Mail, ArrowLeft } from "lucide-react"
import { auth, db } from "@/config/firebase"
import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc,
  orderBy,
  query,
  where
} from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

interface Suscripcion {
  id: string
  email: string
  fecha: Date
  activo: boolean
}

export default function Suscripciones() {
  const [suscripciones, setSuscripciones] = useState<Suscripcion[]>([])
  const [filteredSuscripciones, setFilteredSuscripciones] = useState<Suscripcion[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        fetchSuscripciones()
      } else {
        navigate("/login")
      }
    })

    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSuscripciones(suscripciones)
    } else {
      const filtered = suscripciones.filter(suscripcion =>
        suscripcion.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredSuscripciones(filtered)
    }
  }, [searchTerm, suscripciones])

  const fetchSuscripciones = async () => {
    try {
      setIsLoading(true)
      console.log("Iniciando fetch de suscripciones...")
      const q = query(collection(db, "suscripciones"), orderBy("fecha", "desc"))
      const querySnapshot = await getDocs(q)
      console.log("Suscripciones encontradas:", querySnapshot.docs.length)
      const suscripcionesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        fecha: doc.data().fecha?.toDate() || new Date()
      })) as Suscripcion[]
      setSuscripciones(suscripcionesData)
      setFilteredSuscripciones(suscripcionesData)
      console.log("Suscripciones cargadas:", suscripcionesData.length)
    } catch (error: any) {
      console.error("Error fetching suscripciones:", error)
      console.error("Código de error:", error.code)
      console.error("Mensaje de error:", error.message)
      
      let errorMessage = "No se pudieron cargar las suscripciones"
      
      if (error.code === "permission-denied") {
        errorMessage = "No tienes permisos para leer la base de datos. Verifica las reglas de Firestore."
      } else if (error.code === "unavailable") {
        errorMessage = "La base de datos no está disponible. Verifica tu conexión a internet."
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta suscripción?")) {
      return
    }

    try {
      await deleteDoc(doc(db, "suscripciones", id))
      toast({
        title: "Éxito",
        description: "Suscripción eliminada correctamente"
      })
      fetchSuscripciones()
    } catch (error) {
      console.error("Error deleting suscripcion:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar la suscripción",
        variant: "destructive"
      })
    }
  }

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Email,Fecha,Activo\n" +
      filteredSuscripciones.map(s => 
        `${s.email},${s.fecha.toLocaleDateString()},${s.activo ? 'Sí' : 'No'}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `suscripciones_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Éxito",
      description: "Lista de suscripciones exportada correctamente"
    })
  }

  const handleBack = () => {
    navigate("/dashboard")
  }

  if (!user) {
    return <div>Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-semibold animate-fade-in text-foreground">
              <span className="bg-gradient-hero bg-clip-text text-transparent">Suscripciones</span>
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in text-black">
              Gestiona las suscripciones al newsletter
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="border-none bg-white shadow-lg">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Devolver
                  </Button>
                  <div>
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                      <Mail className="h-6 w-6" />
                      Suscripciones ({filteredSuscripciones.length})
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">
                      Total de suscriptores: {suscripciones.length}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleExport}
                    disabled={filteredSuscripciones.length === 0}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Exportar CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Suscripciones List */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-2">Cargando suscripciones...</p>
                  </div>
                ) : filteredSuscripciones.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {searchTerm ? "No se encontraron suscripciones con ese email" : "No hay suscripciones aún"}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredSuscripciones.map((suscripcion, index) => (
                      <div 
                        key={suscripcion.id} 
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-muted-foreground">
                                #{index + 1}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                suscripcion.activo 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {suscripcion.activo ? 'Activo' : 'Inactivo'}
                              </span>
                            </div>
                            <p className="font-medium text-lg">{suscripcion.email}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Suscrito: {suscripcion.fecha.toLocaleDateString()} a las {suscripcion.fecha.toLocaleTimeString()}
                            </p>
                          </div>
                          
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(suscripcion.id)}
                              className="flex items-center gap-1"
                            >
                              <Trash2 className="h-3 w-3" />
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
} 