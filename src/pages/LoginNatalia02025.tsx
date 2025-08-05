import { useState } from "react"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Mail, Lock, Eye, EyeOff, User, LogIn, UserPlus } from "lucide-react"
import { auth } from "@/config/firebase"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginNatalia02025() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
             if (user) {
         // Usuario ya está logueado, redirigir al dashboard
         navigate("/dashboard")
       }
    })

    return () => unsubscribe()
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        // Login
                 await signInWithEmailAndPassword(auth, email, password)
         toast({
           title: "¡Inicio de sesión exitoso!",
           description: "Bienvenido de vuelta.",
         })
         navigate("/dashboard")
      } else {
        // Registro
        if (password !== confirmPassword) {
          toast({
            title: "Error",
            description: "Las contraseñas no coinciden.",
            variant: "destructive"
          })
          return
        }
        
                 await createUserWithEmailAndPassword(auth, email, password)
         toast({
           title: "¡Registro exitoso!",
           description: "Tu cuenta ha sido creada correctamente.",
         })
         navigate("/dashboard")
      }
    } catch (error: any) {
      let errorMessage = "Ocurrió un error inesperado."
      
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No existe una cuenta con este email."
          break
        case "auth/wrong-password":
          errorMessage = "Contraseña incorrecta."
          break
        case "auth/email-already-in-use":
          errorMessage = "Ya existe una cuenta con este email."
          break
        case "auth/weak-password":
          errorMessage = "La contraseña debe tener al menos 6 caracteres."
          break
        case "auth/invalid-email":
          errorMessage = "Email inválido."
          break
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

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al cerrar sesión.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-semibold animate-fade-in text-foreground">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-light animate-scale-in text-foreground/80">
              {isLogin 
                ? "Accede a tu cuenta para continuar" 
                : "Únete a nuestra comunidad artística"
              }
            </p>
          </div>
        </div>
      </section>

      {/* Login/Register Form */}
      <section className="py-20 bg-white relative">
        {/* Colorful decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-secondary/30 to-accent/30 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-gradient-to-br from-accent/25 to-secondary/25 rounded-full blur-xl animate-pulse delay-700"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto">
            <Card className="border-none shadow-card-elegant">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirmar Contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-card hover:shadow-artistic transition-all duration-300"
                    size="lg"
                  >
                    {isLoading ? (
                      "Procesando..."
                    ) : (
                      <>
                        {isLogin ? (
                          <>
                            <LogIn className="mr-2 h-4 w-4" />
                            Iniciar Sesión
                          </>
                        ) : (
                          <>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Crear Cuenta
                          </>
                        )}
                      </>
                    )}
                  </Button>
                  
                  {user && (
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                      className="w-full"
                      size="lg"
                    >
                      Ir al Dashboard
                    </Button>
                  )}
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-accent hover:underline"
                  >
                    {isLogin 
                      ? "¿No tienes cuenta? Regístrate aquí" 
                      : "¿Ya tienes cuenta? Inicia sesión aquí"
                    }
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* User Info (if logged in) */}
            {user && (
              <Card className="mt-6 border-none shadow-card-elegant">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-card flex items-center justify-center text-white">
                      <User className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Usuario Conectado</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <Button 
                      onClick={handleLogout}
                      variant="outline"
                      size="sm"
                    >
                      Cerrar Sesión
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 