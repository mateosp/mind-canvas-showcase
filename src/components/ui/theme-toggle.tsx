import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light"
    }
    return "light"
  })

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-12 w-12 items-center justify-center rounded-full",
        "bg-gradient-card backdrop-blur-sm transition-all duration-500 ease-bounce",
        "hover:scale-110 hover:shadow-artistic",
        "border border-white/20"
      )}
      aria-label="Toggle theme"
    >
      <div className="relative h-6 w-6">
        <Sun
          className={cn(
            "absolute inset-0 h-6 w-6 text-white transition-all duration-500",
            theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          )}
        />
        <Moon
          className={cn(
            "absolute inset-0 h-6 w-6 text-white transition-all duration-500",
            theme === "light" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          )}
        />
      </div>
    </button>
  )
}