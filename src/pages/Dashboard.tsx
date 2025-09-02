import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Save, X, Mail, Upload, Image as ImageIcon } from "lucide-react"
import { auth, db, storage } from "@/config/firebase"
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
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { useNavigate, Link } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

interface OpinionColumn {
  id: string
  titulo: string
  descripcion: string
  createdAt: Date
  images?: string[]
}

export default function Dashboard() {
  const [columns, setColumns] = useState<OpinionColumn[]>([])
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthChecking(false)
      if (user) {
        setUser(user)
        fetchColumns()
      } else {
        // Usuario no autenticado, redirigir al login
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
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        images: doc.data().images || []
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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (files.length > 3) {
      toast({
        title: "Error",
        description: "Máximo 3 imágenes permitidas",
        variant: "destructive"
      })
      return
    }

    // Validar tipos de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const invalidFiles = files.filter(file => !validTypes.includes(file.type))
    
    if (invalidFiles.length > 0) {
      toast({
        title: "Error",
        description: "Solo se permiten archivos JPG, PNG y WebP",
        variant: "destructive"
      })
      return
    }

    setSelectedImages(files)
  }

  const uploadImages = async (): Promise<string[]> => {
    if (selectedImages.length === 0) return []
    
    const uploadPromises = selectedImages.map(async (file) => {
      const timestamp = Date.now()
      const fileName = `${timestamp}_${file.name}`
      const storageRef = ref(storage, `opinion_images/${fileName}`)
      
      try {
        const snapshot = await uploadBytes(storageRef, file)
        const downloadURL = await getDownloadURL(snapshot.ref)
        return downloadURL
      } catch (error) {
        console.error("Error uploading image:", error)
        throw error
      }
    })

    return Promise.all(uploadPromises)
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
      
      let imageUrls: string[] = []
      if (selectedImages.length > 0) {
        imageUrls = await uploadImages()
      }
      
      if (isEditing) {
        // Update existing column
        console.log("Actualizando columna existente:", isEditing)
        const updateData: any = {
          titulo: titulo.trim(),
          descripcion: descripcion.trim(),
          updatedAt: new Date()
        }
        
        if (imageUrls.length > 0) {
          updateData.images = imageUrls
        }
        
        await updateDoc(doc(db, "columnas_opinion", isEditing), updateData)
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
          createdAt: new Date(),
          images: imageUrls
        })
        console.log("Columna creada con ID:", docRef.id)
        toast({
          title: "Éxito",
          description: "Columna de opinión creada correctamente"
        })
      }
      
      setTitulo("")
      setDescripcion("")
      setSelectedImages([])
      setImageUrls([])
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
    setImageUrls(column.images || [])
    setSelectedImages([])
    setIsEditing(column.id)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta columna de opinión?")) {
      return
    }

    try {
      // Obtener la columna para eliminar las imágenes
      const column = columns.find(col => col.id === id)
      if (column && column.images && column.images.length > 0) {
        // Eliminar imágenes del storage
        for (const imageUrl of column.images) {
          try {
            const imageRef = ref(storage, imageUrl)
            await deleteObject(imageRef)
          } catch (error) {
            console.error("Error deleting image:", error)
          }
        }
      }

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
    setSelectedImages([])
    setImageUrls([])
    setIsEditing(null)
  }

  const removeImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index))
  }

  const removeSelectedImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  // Mostrar loading mientras verifica autenticación
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Si no hay usuario autenticado, no mostrar nada (ya se redirige)
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold animate-fade-in text-foreground leading-tight">
              <span className="bg-gradient-hero bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light animate-scale-in text-black px-2">
              Gestiona las columnas de opinión y suscripciones
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="border-none bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-lg flex-shrink-0">
                    <Edit className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold">Columnas de Opinión</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Gestiona las columnas de opinión del sitio web
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Link to="/suscripciones" className="block">
              <Card className="border-none bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer h-full">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-green-100 rounded-lg flex-shrink-0">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold">Suscripciones</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        Gestiona las suscripciones al newsletter
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Form Section */}
            <Card className="border-none bg-white shadow-lg">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  {isEditing ? "Editar Columna" : "Nueva Columna de Opinión"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="titulo" className="text-sm font-medium">Título</Label>
                    <Input
                      id="titulo"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      placeholder="Ingresa el título de la columna"
                      className="h-10 sm:h-11"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="descripcion" className="text-sm font-medium">Descripción</Label>
                    <Textarea
                      id="descripcion"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      placeholder="Ingresa la descripción de la columna"
                      rows={4}
                      className="min-h-[100px] sm:min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Imágenes (0-3 máximo)
                    </Label>
                    
                    {/* File Input */}
                    <div className="flex items-center gap-3">
                      <Input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="flex-1"
                        disabled={selectedImages.length >= 3}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('images')?.click()}
                        disabled={selectedImages.length >= 3}
                        className="flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Seleccionar
                      </Button>
                    </div>

                    {/* Selected Images Preview */}
                    {selectedImages.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Imágenes seleccionadas ({selectedImages.length}/3):
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {selectedImages.map((file, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                className="w-16 h-16 object-cover rounded border"
                              />
                              <button
                                type="button"
                                onClick={() => removeSelectedImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Existing Images (when editing) */}
                    {isEditing && imageUrls.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Imágenes existentes:
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {imageUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={url}
                                alt={`Imagen existente ${index + 1}`}
                                className="w-16 h-16 object-cover rounded border"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="flex items-center gap-2 h-10 sm:h-11"
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
                        className="flex items-center gap-2 h-10 sm:h-11"
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
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  Columnas Existentes ({columns.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {columns.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8 text-sm sm:text-base">
                      No hay columnas de opinión creadas aún
                    </p>
                  ) : (
                    columns.map((column, index) => (
                      <div 
                        key={column.id} 
                        className="p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                                #{index + 1}
                              </span>
                              <h3 className="font-semibold text-base sm:text-lg truncate">{column.titulo}</h3>
                            </div>
                            <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mb-2">
                              {column.descripcion}
                            </p>
                            
                            {/* Show images count */}
                            {column.images && column.images.length > 0 && (
                              <div className="flex items-center gap-2 mb-2">
                                <ImageIcon className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {column.images.length} imagen{column.images.length !== 1 ? 'es' : ''}
                                </span>
                              </div>
                            )}
                            
                            <p className="text-xs text-muted-foreground">
                              Creada: {column.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="flex gap-2 sm:ml-4 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(column)}
                              className="flex items-center gap-1 h-8 sm:h-9 text-xs sm:text-sm"
                            >
                              <Edit className="h-3 w-3" />
                              <span className="hidden sm:inline">Editar</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(column.id)}
                              className="flex items-center gap-1 h-8 sm:h-9 text-xs sm:text-sm"
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="hidden sm:inline">Eliminar</span>
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