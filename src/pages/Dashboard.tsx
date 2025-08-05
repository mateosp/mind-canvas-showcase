import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Save, X, Mail } from "lucide-react"
import { auth, db } from "@/config/firebase"
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  updateDoc, 
  doc,
  orderBy,
  query
} from "firebase/firestore"
import { useNavigate, Link } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

interface OpinionColumn {
  id: string
  titulo: string
  descripcion: string
  createdAt: Date
}

export default function Dashboard() {
  const [columns, setColumns] = useState<OpinionColumn[]>([])
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        fetchColumns()
      } else {
        navigate("/login")
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const fetchColumns = async () => {
    try {
      console.log("Iniciando fetch de columnas...")
      const q = query(collection(db, "columnas_opinion"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      console.log("Documentos encontrados:", querySnapshot.docs.length)
      const columnsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as OpinionColumn[]
      setColumns(columnsData)
      console.log("Columnas cargadas:", columnsData.length)
    } catch (error: any) {
      console.error("Error fetching columns:", error)
      console.error("Código de error:", error.code)
      console.error("Mensaje de error:", error.message)
      
      let errorMessage = "No se pudieron cargar las columnas de opinión"
      
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
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo.trim() || !descripcion.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      console.log("Iniciando guardado de columna...")
      console.log("Usuario autenticado:", user)
      
      if (isEditing) {
        // Update existing column
        console.log("Actualizando columna existente:", isEditing)
        await updateDoc(doc(db, "columnas_opinion", isEditing), {
          titulo: titulo.trim(),
          descripcion: descripcion.trim(),
          updatedAt: new Date()
        })
        toast({
          title: "Éxito",
          description: "Columna de opinión actualizada correctamente"
        })
        setIsEditing(null)
      } else {
        // Add new column
        console.log("Creando nueva columna...")
        const docRef = await addDoc(collection(db, "columnas_opinion"), {
          titulo: titulo.trim(),
          descripcion: descripcion.trim(),
          createdAt: new Date()
        })
        console.log("Columna creada con ID:", docRef.id)
        toast({
          title: "Éxito",
          description: "Columna de opinión creada correctamente"
        })
      }
      
      setTitulo("")
      setDescripcion("")
      fetchColumns()
    } catch (error: any) {
      console.error("Error detallado:", error)
      console.error("Código de error:", error.code)
      console.error("Mensaje de error:", error.message)
      
      let errorMessage = "No se pudo guardar la columna de opinión"
      
      if (error.code === "permission-denied") {
        errorMessage = "No tienes permisos para escribir en la base de datos. Verifica las reglas de Firestore."
      } else if (error.code === "unavailable") {
        errorMessage = "La base de datos no está disponible. Verifica tu conexión a internet."
      } else if (error.code === "unauthenticated") {
        errorMessage = "No estás autenticado. Por favor, inicia sesión nuevamente."
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

  const handleEdit = (column: OpinionColumn) => {
    setTitulo(column.titulo)
    setDescripcion(column.descripcion)
    setIsEditing(column.id)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta columna de opinión?")) {
      return
    }

    try {
      await deleteDoc(doc(db, "columnas_opinion", id))
      toast({
        title: "Éxito",
        description: "Columna de opinión eliminada correctamente"
      })
      fetchColumns()
    } catch (error) {
      console.error("Error deleting column:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar la columna de opinión",
        variant: "destructive"
      })
    }
  }

  const handleCancel = () => {
    setTitulo("")
    setDescripcion("")
    setIsEditing(null)
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
              <span className="bg-gradient-hero bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in text-black">
              Gestiona las columnas de opinión y suscripciones
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-none bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Edit className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">Columnas de Opinión</h3>
                    <p className="text-muted-foreground text-sm">
                      Gestiona las columnas de opinión del sitio web
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Link to="/suscripciones">
              <Card className="border-none bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">Suscripciones</h3>
                      <p className="text-muted-foreground text-sm">
                        Gestiona las suscripciones al newsletter
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Form Section */}
            <Card className="border-none bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {isEditing ? "Editar Columna" : "Nueva Columna de Opinión"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título</Label>
                    <Input
                      id="titulo"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      placeholder="Ingresa el título de la columna"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea
                      id="descripcion"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      placeholder="Ingresa la descripción de la columna"
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="flex items-center gap-2"
                    >
                      {isLoading ? (
                        "Guardando..."
                      ) : (
                        <>
                          {isEditing ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                          {isEditing ? "Actualizar" : "Guardar"}
                        </>
                      )}
                    </Button>
                    
                    {isEditing && (
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleCancel}
                        className="flex items-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Columns List */}
            <Card className="border-none bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Columnas Existentes ({columns.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {columns.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No hay columnas de opinión creadas aún
                    </p>
                  ) : (
                    columns.map((column, index) => (
                      <div 
                        key={column.id} 
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-muted-foreground">
                                #{index + 1}
                              </span>
                              <h3 className="font-semibold text-lg">{column.titulo}</h3>
                            </div>
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {column.descripcion}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Creada: {column.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(column)}
                              className="flex items-center gap-1"
                            >
                              <Edit className="h-3 w-3" />
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(column.id)}
                              className="flex items-center gap-1"
                            >
                              <Trash2 className="h-3 w-3" />
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
} 