import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sections = [
  { id: "home", label: "Home" },
  { id: "couple", label: "Couple" },
  { id: "love-story", label: "Love Story" },
  { id: "album", label: "Album" },
  { id: "timeline", label: "Timeline" },
  { id: "guestbook", label: "Guestbook" },
  { id: "qr", label: "QR" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + window.innerHeight / 2
      
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-sm shadow-md"
          : "bg-transparent shadow-md"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "transition-colors",
                activeSection === section.id && "bg-accent"
              )}
            >
              {section.label}
            </Button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

