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
        "relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-500 ease-bounce",
        "bg-gradient-to-r border-2 hover:scale-105",
        theme === "light" 
          ? "from-blue-400 to-blue-600 border-blue-300" 
          : "from-purple-900 to-indigo-900 border-purple-700"
      )}
      aria-label="Toggle theme"
    >
      {/* Track with icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Sun
          className={cn(
            "h-4 w-4 transition-all duration-500",
            theme === "light" ? "text-white scale-100" : "text-gray-400 scale-75"
          )}
        />
        <Moon
          className={cn(
            "h-4 w-4 transition-all duration-500",
            theme === "dark" ? "text-white scale-100" : "text-gray-400 scale-75"
          )}
        />
      </div>
      
      {/* Sliding circle */}
      <div
        className={cn(
          "relative h-6 w-6 rounded-full bg-white shadow-lg transition-all duration-500 ease-bounce",
          "border border-gray-200",
          theme === "light" ? "translate-x-1" : "translate-x-9"
        )}
      >
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-gray-100 opacity-80" />
      </div>
    </button>
  )
}