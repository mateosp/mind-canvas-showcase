import { useState } from "react"
import { Button } from "./button"
import { Input } from "./input"
import { toast } from "@/hooks/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "¡Suscripción exitosa!",
      description: "Te has suscrito a nuestro newsletter de secretos para el éxito.",
    })
    
    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 uppercase tracking-wider">
            Espacio disponible para suscripción a newsletters
          </h2>
          
          <div className="flex flex-col items-center space-y-6">
            <h3 className="text-2xl font-semibold">Subscribe</h3>
            <p className="text-muted-foreground max-w-md">
              Sign up for our monthly newsletter of secrets for success.
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
                disabled={isSubmitting}
                className="bg-gradient-card hover:shadow-artistic transition-all duration-300"
              >
                {isSubmitting ? "..." : "SIGN UP"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}