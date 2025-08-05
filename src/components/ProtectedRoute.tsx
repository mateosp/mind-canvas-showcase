import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "@/config/firebase"
import { onAuthStateChanged } from "firebase/auth"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthChecking(false)
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        navigate("/login")
      }
    })

    return () => unsubscribe()
  }, [navigate])

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

  // Si no está autenticado, no mostrar nada (ya se redirige)
  if (!isAuthenticated) {
    return null
  }

  // Si está autenticado, mostrar el contenido protegido
  return <>{children}</>
} 