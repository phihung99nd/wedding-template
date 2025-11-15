import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import beautifulNowAudio from "@/assets/audios/Beautiful Now.mp3"

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set audio properties
    audio.loop = true

    // Try to play the audio
    const playAudio = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        // Autoplay was prevented - this is common in browsers
        // The audio will start when user interacts with the page
        console.log("Autoplay prevented. Audio will start on user interaction.")
        
        // Try to play on first user interaction
        const playOnInteraction = () => {
          audio.play().then(() => {
            setIsPlaying(true)
            // Remove listeners after first interaction
            document.removeEventListener("click", playOnInteraction)
            document.removeEventListener("touchstart", playOnInteraction)
            document.removeEventListener("keydown", playOnInteraction)
          }).catch(() => {
            // Ignore errors if still can't play
          })
        }

        document.addEventListener("click", playOnInteraction)
        document.addEventListener("touchstart", playOnInteraction)
        document.addEventListener("keydown", playOnInteraction)
      }
    }

    playAudio()

    // Cleanup
    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [])

  // Update volume when state changes
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = volume
    }
  }, [volume])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch((error) => {
        console.error("Error playing audio:", error)
      })
    }
  }

  const handleVolumeChange = (values: number[]) => {
    setVolume(values[0])
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={beautifulNowAudio}
        preload="auto"
        style={{ display: "none" }}
      />
      
      {/* Floating Audio Control Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Volume Controls Panel */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-12 right-0 mb-2 bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-lg p-4 w-64"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Music className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Background Music</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <VolumeX className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      value={[volume]}
                      onValueChange={handleVolumeChange}
                      min={0}
                      max={1}
                      step={0.01}
                      className="flex-1"
                      trackClassName="bg-muted/30"
                      rangeStyle={{
                        background: `linear-gradient(to right, white 0%, rgb(244, 114, 182) 100%)`
                      }}
                      thumbClassName="bg-rose-500 border-rose-500 ring-rose-500 hover:bg-rose-600"
                    />
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="text-xs text-muted-foreground text-center">
                    {Math.round(volume * 100)}%
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <Button
            onClick={togglePlayPause}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            size="icon"
            className="h-10 w-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-rose-500 hover:bg-rose-600/90"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            <motion.div
              animate={{ 
                scale: isPlaying ? [1, 1.3, 1] : 1,
                rotate: isPlaying ? [0, 5, -5, 0] : 0
              }}
              transition={{ 
                duration: 2, 
                repeat: isPlaying ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              {isPlaying ? (
                <Volume2 className="h-6 w-6" />
              ) : (
                <VolumeX className="h-6 w-6" />
              )}
            </motion.div>
          </Button>
        </div>
      </div>
    </>
  )
}

