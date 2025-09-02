import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Save, X, Mail, Upload, Image as ImageIcon, Palette, FileText, MapPin } from "lucide-react"
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

interface Artist {
  id: string
  titulo: string
  ubicacion: string
  texto: string
  imagen: string
  createdAt: Date
}

type ContentType = 'opinion' | 'artists'

export default function Dashboard() {
  const [contentType, setContentType] = useState<ContentType>('opinion')
  
  // Opinion Columns State
  const [columns, setColumns] = useState<OpinionColumn[]>([])
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  
  // Artists State
  const [artists, setArtists] = useState<Artist[]>([])
  const [artistTitulo, setArtistTitulo] = useState("")
  const [artistUbicacion, setArtistUbicacion] = useState("")
  const [artistTexto, setArtistTexto] = useState("")
  const [selectedArtistImage, setSelectedArtistImage] = useState<File | null>(null)
  const [artistImageUrl, setArtistImageUrl] = useState<string>("")
  
  // Common State
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
        if (contentType === 'opinion') {
          fetchColumns()
        } else {
          fetchArtists()
        }
      } else {
        navigate("/login")
      }
    })

    return () => unsubscribe()
  }, [navigate, contentType])

  // Fetch functions
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
    } catch (error: any) {
      console.error("Error fetching columns:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar las columnas de opinión",
        variant: "destructive"
      })
    }
  }

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
    } catch (error: any) {
      console.error("Error fetching artists:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los artistas",
        variant: "destructive"
      })
    }
  }

  // Handle content type change
  const handleContentTypeChange = (type: ContentType) => {
    setContentType(type)
    setIsEditing(null)
    clearForm()
    if (type === 'opinion') {
      fetchColumns()
    } else {
      fetchArtists()
    }
  }

  // Clear form based on content type
  const clearForm = () => {
    if (contentType === 'opinion') {
      setTitulo("")
      setDescripcion("")
      setSelectedImages([])
      setImageUrls([])
    } else {
      setArtistTitulo("")
      setArtistUbicacion("")
      setArtistTexto("")
      setSelectedArtistImage(null)
      setArtistImageUrl("")
    }
  }

  // Image handling for opinion columns
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

  // Image handling for artists
  const handleArtistImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: "Solo se permiten archivos JPG, PNG y WebP",
        variant: "destructive"
      })
      return
    }

    setSelectedArtistImage(file)
  }

  const uploadArtistImage = async (): Promise<string> => {
    if (!selectedArtistImage) return ""
    
    const timestamp = Date.now()
    const fileName = `${timestamp}_${selectedArtistImage.name}`
    const storageRef = ref(storage, `artist_images/${fileName}`)
    
    try {
      const snapshot = await uploadBytes(storageRef, selectedArtistImage)
      const downloadURL = await getDownloadURL(snapshot.ref)
      return downloadURL
    } catch (error) {
      console.error("Error uploading artist image:", error)
      throw error
    }
  }

  // Submit handlers
  const handleOpinionSubmit = async (e: React.FormEvent) => {
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
      let imageUrls: string[] = []
      if (selectedImages.length > 0) {
        imageUrls = await uploadImages()
      }
      
      if (isEditing) {
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
        await addDoc(collection(db, "columnas_opinion"), {
          titulo: titulo.trim(),
          descripcion: descripcion.trim(),
          createdAt: new Date(),
          images: imageUrls
        })
        toast({
          title: "Éxito",
          description: "Columna de opinión creada correctamente"
        })
      }
      
      clearForm()
      fetchColumns()
    } catch (error: any) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar la columna de opinión",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleArtistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!artistTitulo.trim() || !artistUbicacion.trim() || !artistTexto.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      })
      return
    }

    if (!selectedArtistImage && !artistImageUrl) {
      toast({
        title: "Error",
        description: "La imagen es obligatoria para los artistas",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      let imageUrl = artistImageUrl
      if (selectedArtistImage) {
        imageUrl = await uploadArtistImage()
      }
      
      if (isEditing) {
        await updateDoc(doc(db, "artistas", isEditing), {
          titulo: artistTitulo.trim(),
          ubicacion: artistUbicacion.trim(),
          texto: artistTexto.trim(),
          imagen: imageUrl,
          updatedAt: new Date()
        })
        toast({
          title: "Éxito",
          description: "Artista actualizado correctamente"
        })
        setIsEditing(null)
      } else {
        await addDoc(collection(db, "artistas"), {
          titulo: artistTitulo.trim(),
          ubicacion: artistUbicacion.trim(),
          texto: artistTexto.trim(),
          imagen: imageUrl,
          createdAt: new Date()
        })
        toast({
          title: "Éxito",
          description: "Artista creado correctamente"
        })
      }
      
      clearForm()
      fetchArtists()
    } catch (error: any) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar el artista",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Edit handlers
  const handleEditOpinion = (column: OpinionColumn) => {
    setTitulo(column.titulo)
    setDescripcion(column.descripcion)
    setImageUrls(column.images || [])
    setSelectedImages([])
    setIsEditing(column.id)
  }

  const handleEditArtist = (artist: Artist) => {
    setArtistTitulo(artist.titulo)
    setArtistUbicacion(artist.ubicacion)
    setArtistTexto(artist.texto)
    setArtistImageUrl(artist.imagen)
    setSelectedArtistImage(null)
    setIsEditing(artist.id)
  }

  // Delete handlers
  const handleDeleteOpinion = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta columna de opinión?")) {
      return
    }

    try {
      const column = columns.find(col => col.id === id)
      if (column && column.images && column.images.length > 0) {
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

  const handleDeleteArtist = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este artista?")) {
      return
    }

    try {
      const artist = artists.find(art => art.id === id)
      if (artist && artist.imagen) {
        try {
          const imageRef = ref(storage, artist.imagen)
          await deleteObject(imageRef)
        } catch (error) {
          console.error("Error deleting image:", error)
        }
      }

      await deleteDoc(doc(db, "artistas", id))
      toast({
        title: "Éxito",
        description: "Artista eliminado correctamente"
      })
      fetchArtists()
    } catch (error) {
      console.error("Error deleting artist:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el artista",
        variant: "destructive"
      })
    }
  }

  // Cancel handlers
  const handleCancel = () => {
    clearForm()
    setIsEditing(null)
  }

  // Utility functions
  const removeImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index))
  }

  const removeSelectedImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  // Loading state
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
              Gestiona las columnas de opinión, artistas y suscripciones
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card 
              className={`border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
                contentType === 'opinion' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-white'
              }`}
              onClick={() => handleContentTypeChange('opinion')}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-lg flex-shrink-0">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
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
            
            <Card 
              className={`border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
                contentType === 'artists' ? 'bg-green-50 border-2 border-green-200' : 'bg-white'
              }`}
              onClick={() => handleContentTypeChange('artists')}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-green-100 rounded-lg flex-shrink-0">
                    <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold">Artistas</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Gestiona los artistas del sitio web
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Link to="/suscripciones" className="block">
              <Card className="border-none bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer h-full">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-purple-100 rounded-lg flex-shrink-0">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
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
                  {contentType === 'opinion' 
                    ? (isEditing ? "Editar Columna" : "Nueva Columna de Opinión")
                    : (isEditing ? "Editar Artista" : "Nuevo Artista")
                  }
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {contentType === 'opinion' ? (
                  // Opinion Form
                  <form onSubmit={handleOpinionSubmit} className="space-y-4 sm:space-y-6">
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
                ) : (
                  // Artist Form
                  <form onSubmit={handleArtistSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="artistTitulo" className="text-sm font-medium">Título</Label>
                      <Input
                        id="artistTitulo"
                        value={artistTitulo}
                        onChange={(e) => setArtistTitulo(e.target.value)}
                        placeholder="Ingresa el nombre del artista"
                        className="h-10 sm:h-11"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="artistUbicacion" className="text-sm font-medium">Ubicación</Label>
                      <Input
                        id="artistUbicacion"
                        value={artistUbicacion}
                        onChange={(e) => setArtistUbicacion(e.target.value)}
                        placeholder="Ingresa la ubicación del artista"
                        className="h-10 sm:h-11"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="artistTexto" className="text-sm font-medium">Texto</Label>
                      <Textarea
                        id="artistTexto"
                        value={artistTexto}
                        onChange={(e) => setArtistTexto(e.target.value)}
                        placeholder="Ingresa la descripción del artista"
                        rows={4}
                        className="min-h-[100px] sm:min-h-[120px]"
                        required
                      />
                    </div>

                    {/* Artist Image Upload Section */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        Imagen del Artista <span className="text-red-500">*</span>
                      </Label>
                      
                      <div className="flex items-center gap-3">
                        <Input
                          id="artistImage"
                          type="file"
                          accept="image/*"
                          onChange={handleArtistImageSelect}
                          className="flex-1"
                          required={!artistImageUrl}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('artistImage')?.click()}
                          className="flex items-center gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Seleccionar
                        </Button>
                      </div>

                      {/* Selected Image Preview */}
                      {selectedArtistImage && (
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">
                            Imagen seleccionada:
                          </p>
                          <div className="relative group">
                            <img
                              src={URL.createObjectURL(selectedArtistImage)}
                              alt="Preview"
                              className="w-32 h-32 object-cover rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => setSelectedArtistImage(null)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Existing Image (when editing) */}
                      {isEditing && artistImageUrl && (
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">
                            Imagen existente:
                          </p>
                          <div className="relative group">
                            <img
                              src={artistImageUrl}
                              alt="Imagen existente"
                              className="w-32 h-32 object-cover rounded border"
                            />
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
                )}
              </CardContent>
            </Card>

            {/* Content List */}
            <Card className="border-none bg-white shadow-lg">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  {contentType === 'opinion' 
                    ? `Columnas Existentes (${columns.length})`
                    : `Artistas Existentes (${artists.length})`
                  }
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {contentType === 'opinion' ? (
                    // Opinion Columns List
                    columns.length === 0 ? (
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
                                onClick={() => handleEditOpinion(column)}
                                className="flex items-center gap-1 h-8 sm:h-9 text-xs sm:text-sm"
                              >
                                <Edit className="h-3 w-3" />
                                <span className="hidden sm:inline">Editar</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteOpinion(column.id)}
                                className="flex items-center gap-1 h-8 sm:h-9 text-xs sm:text-sm"
                              >
                                <Trash2 className="h-3 w-3" />
                                <span className="hidden sm:inline">Eliminar</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )
                  ) : (
                    // Artists List
                    artists.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8 text-sm sm:text-base">
                        No hay artistas creados aún
                      </p>
                    ) : (
                      artists.map((artist, index) => (
                        <div 
                          key={artist.id} 
                          className="p-3 sm:p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                                  #{index + 1}
                                </span>
                                <h3 className="font-semibold text-base sm:text-lg truncate">{artist.titulo}</h3>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{artist.ubicacion}</span>
                              </div>
                              <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mb-2">
                                {artist.texto}
                              </p>
                              
                              {/* Show image indicator */}
                              {artist.imagen && (
                                <div className="flex items-center gap-2 mb-2">
                                  <ImageIcon className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">
                                    Imagen disponible
                                  </span>
                                </div>
                              )}
                              
                              <p className="text-xs text-muted-foreground">
                                Creado: {artist.createdAt.toLocaleDateString()}
                              </p>
                            </div>
                            
                            <div className="flex gap-2 sm:ml-4 flex-shrink-0">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditArtist(artist)}
                                className="flex items-center gap-1 h-8 sm:h-9 text-xs sm:text-sm"
                              >
                                <Edit className="h-3 w-3" />
                                <span className="hidden sm:inline">Editar</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteArtist(artist.id)}
                                className="flex items-center gap-1 h-8 sm:h-9 text-xs sm:text-sm"
                              >
                                <Trash2 className="h-3 w-3" />
                                <span className="hidden sm:inline">Eliminar</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )
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