import { useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface AlbumSectionProps {
  photos?: string[]
}

const defaultPhotos = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
]

export function AlbumSection({ photos = defaultPhotos }: AlbumSectionProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handlePhotoClick = (photo: string, index: number) => {
    setClickedIndex(index)
    setSelectedPhoto(photo)
  }

  const handleClose = () => {
    setSelectedPhoto(null)
    setClickedIndex(null)
  }

  return (
    <>
      <section
        id="album"
        ref={sectionRef}
        className="min-h-screen py-20 px-4 bg-gradient-to-b from-background to-muted/20"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-center mb-4">
              Our Wedding Album
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Capturing beautiful moments from our special day
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => {
              const row = Math.floor(index / 3)
              const col = index % 3
              const delay = (row + col) * 0.1

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay }}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => handlePhotoClick(photo, index)}
                  layoutId={`photo-${index}`}
                >
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedPhoto && clickedIndex !== null && (
          <Dialog
            open={!!selectedPhoto}
            onOpenChange={(open) => !open && handleClose()}
          >
            <DialogContent
              onClose={handleClose}
              className="max-w-5xl w-full p-0 bg-transparent border-none shadow-none"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
                layoutId={`photo-${clickedIndex}`}
              >
                <img
                  src={selectedPhoto}
                  alt="Selected photo"
                  className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                />
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}

