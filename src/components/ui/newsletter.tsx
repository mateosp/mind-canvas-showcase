import { useState, useEffect } from "react"
import { Button } from "./button"
import { Input } from "./input"
import { toast } from "@/hooks/use-toast"
import { db } from "@/config/firebase"
import { collection, addDoc, getDoc, doc, query, where, getDocs } from "firebase/firestore"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false)

  // Verificar conexión a Firebase
  useEffect(() => {
    const checkFirebaseConnection = async () => {
      try {
        console.log("Verificando conexión a Firebase...")
        // Intentar leer un documento de prueba
        const testDoc = doc(db, "test", "connection")
        await getDoc(testDoc)
        console.log("Conexión a Firebase exitosa")
        setIsFirebaseConnected(true)
      } catch (error: any) {
        console.error("Error de conexión a Firebase:", error)
        console.error("Código de error:", error.code)
        console.error("Mensaje de error:", error.message)
        setIsFirebaseConnected(false)
      }
    }

    checkFirebaseConnection()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("Iniciando proceso de suscripción...")
      console.log("Email a suscribir:", email)
      console.log("Estado de conexión Firebase:", isFirebaseConnected)
      
      // Verificar si el email ya existe
      console.log("Verificando si el email ya está suscrito...")
      const suscripcionesRef = collection(db, "suscripciones")
      const q = query(suscripcionesRef, where("email", "==", email))
      const querySnapshot = await getDocs(q)
      console.log("Documentos encontrados con este email:", querySnapshot.docs.length)
      
      if (!querySnapshot.empty) {
        console.log("Email ya existe en la base de datos")
        toast({
          title: "Email ya suscrito",
          description: "Este correo electrónico ya está suscrito a nuestro newsletter. No se permiten suscripciones duplicadas.",
          variant: "destructive"
        })
        return
      }

      // Agregar nueva suscripción
      console.log("Agregando nueva suscripción...")
      const docRef = await addDoc(suscripcionesRef, {
        email: email,
        fecha: new Date(),
        activo: true
      })
      console.log("Suscripción agregada con ID:", docRef.id)

      toast({
        title: "¡Suscripción exitosa!",
        description: "Te has suscrito a nuestro newsletter de secretos para el éxito.",
      })
      
      setEmail("")
    } catch (error: any) {
      console.error('Error completo al suscribirse:', error)
      console.error('Código de error:', error.code)
      console.error('Mensaje de error:', error.message)
      console.error('Stack trace:', error.stack)
      
      let errorMessage = "Hubo un problema al procesar tu suscripción. Por favor, inténtalo de nuevo."
      
      if (error.code === "permission-denied") {
        errorMessage = "No tienes permisos para escribir en la base de datos. Verifica las reglas de Firestore."
      } else if (error.code === "unavailable") {
        errorMessage = "La base de datos no está disponible. Verifica tu conexión a internet."
      } else if (error.code === "unauthenticated") {
        errorMessage = "No estás autenticado. Por favor, inicia sesión nuevamente."
      } else if (error.code === "not-found") {
        errorMessage = "La colección de suscripciones no existe. Contacta al administrador."
      }
      
      toast({
        title: "Error al suscribirse",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 uppercase tracking-wider">
          SUSCRÍBETE A NUESTRO NEWSLETTER
          </h2>
          
          <div className="flex flex-col items-center space-y-6">
            <p className="text-muted-foreground max-w-md">
              Inspírate cada mes y mantente al tanto del mundo del arte.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting || !isFirebaseConnected}
                className="bg-gradient-card hover:shadow-artistic transition-all duration-300"
              >
                {isSubmitting ? "..." : "SIGN UP"}
              </Button>
            </form>
            
            {!isFirebaseConnected && (
              <p className="text-sm text-red-600">
                ⚠️ Problema de conexión con la base de datos
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}