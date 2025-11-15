import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const currentProgressRef = useRef(0)

  useEffect(() => {
    let imagesLoaded = 0
    let fontsLoaded = false
    let totalImages = 0
    let progressInterval: ReturnType<typeof setInterval>
    let isMounted = true

    // Function to check if fonts are loaded
    const checkFontsLoaded = async (): Promise<void> => {
      try {
        // Wait for document.fonts.ready if available
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready
        }

        // Check for custom fonts defined in CSS
        const fontFamilies = ['ImperialScript', 'ShantellSans']
        
        // Wait for all fonts to be loaded
        const fontPromises = fontFamilies.map((fontFamily) => {
          if (document.fonts.check(`16px "${fontFamily}"`)) {
            return Promise.resolve()
          }
          
          return new Promise<void>((resolve) => {
            const timeout = setTimeout(() => {
              resolve() // Resolve after timeout to prevent hanging
            }, 5000)
            
            const checkFont = () => {
              if (document.fonts.check(`16px "${fontFamily}"`)) {
                clearTimeout(timeout)
                resolve()
              } else {
                requestAnimationFrame(checkFont)
              }
            }
            checkFont()
          })
        })

        await Promise.all(fontPromises)
        
        if (isMounted) {
          fontsLoaded = true
          updateProgress()
        }
      } catch (error) {
        console.warn('Font loading check failed:', error)
        if (isMounted) {
          fontsLoaded = true // Continue even if font check fails
          updateProgress()
        }
      }
    }

    // Function to find all images in the document
    const findAllImages = (): Promise<HTMLImageElement[]> => {
      return new Promise((resolve) => {
        const images: HTMLImageElement[] = []
        const processedUrls = new Set<string>()
        
        // Find all img elements
        const imgElements = document.querySelectorAll('img')
        imgElements.forEach((img) => {
          if (img.src && !processedUrls.has(img.src)) {
            processedUrls.add(img.src)
            images.push(img)
          }
        })

        // Find all elements with background images
        const allElements = document.querySelectorAll('*')
        allElements.forEach((el) => {
          const bgImage = window.getComputedStyle(el).backgroundImage
          if (bgImage && bgImage !== 'none') {
            const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/)
            if (urlMatch && urlMatch[1]) {
              const url = urlMatch[1]
              if (!processedUrls.has(url)) {
                processedUrls.add(url)
                const img = new Image()
                img.src = url
                images.push(img)
              }
            }
          }
        })

        resolve(images)
      })
    }

    // Function to load all images
    const loadAllImages = (): Promise<void> => {
      return findAllImages().then((images) => {
        return new Promise<void>((resolve) => {
          totalImages = images.length

          if (totalImages === 0) {
            imagesLoaded = 0
            resolve()
            return
          }

          let loadedCount = 0
          let errorCount = 0

          const checkComplete = () => {
            if (loadedCount + errorCount >= totalImages && isMounted) {
              imagesLoaded = totalImages
              updateProgress()
              resolve()
            }
          }

          images.forEach((img) => {
            if (img.complete && img.naturalHeight !== 0) {
              loadedCount++
              checkComplete()
            } else {
              const onLoad = () => {
                loadedCount++
                if (isMounted) {
                  updateProgress()
                }
                checkComplete()
              }
              
              const onError = () => {
                errorCount++
                if (isMounted) {
                  updateProgress()
                }
                checkComplete()
              }

              img.onload = onLoad
              img.onerror = onError
              
              // If image is already loading, trigger check
              if (img.complete) {
                if (img.naturalHeight === 0) {
                  onError()
                } else {
                  onLoad()
                }
              }
            }
          })

          // If all images are already loaded
          if (loadedCount === totalImages) {
            imagesLoaded = totalImages
            resolve()
          }
        })
      })
    }

    // Update progress - only increases, never decreases
    const updateProgress = () => {
      if (!isMounted) return
      
      const imageProgress = totalImages > 0 ? imagesLoaded / totalImages : 1
      const fontProgress = fontsLoaded ? 1 : 0
      const overallProgress = (imageProgress + fontProgress) / 2
      const newProgress = Math.min(overallProgress * 100, 100)
      
      // Only update if progress increased (monotonic)
      if (newProgress > currentProgressRef.current) {
        currentProgressRef.current = newProgress
        setProgress(newProgress)
      }
    }

    // Gentle progress animation that doesn't conflict with real progress
    const startProgressAnimation = () => {
      progressInterval = setInterval(() => {
        if (!isMounted) {
          clearInterval(progressInterval)
          return
        }
        // Only animate if we're still at 0 or very low progress
        // Once real progress starts, let it take over
        if (currentProgressRef.current < 5) {
          const gentleIncrease = Math.min(currentProgressRef.current + 0.5, 5)
          if (gentleIncrease > currentProgressRef.current) {
            currentProgressRef.current = gentleIncrease
            setProgress(gentleIncrease)
          }
        } else {
          // Stop the animation once real progress kicks in
          clearInterval(progressInterval)
        }
      }, 200)
    }

    // Main loading logic
    const initializeLoading = async () => {
      startProgressAnimation()

      // Wait a bit for DOM to be ready and initial render
      await new Promise((resolve) => setTimeout(resolve, 200))

      if (!isMounted) return

      // Load images and fonts in parallel
      await Promise.all([loadAllImages(), checkFontsLoaded()])

      if (!isMounted) return

      // Ensure progress reaches 100%
      currentProgressRef.current = 100
      setProgress(100)

      // Small delay before hiding overlay for smooth transition
      await new Promise((resolve) => setTimeout(resolve, 300))

      if (isMounted) {
        if (progressInterval) {
          clearInterval(progressInterval)
        }
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    }

    initializeLoading()

    return () => {
      isMounted = false
      if (progressInterval) {
        clearInterval(progressInterval)
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-background via-background/95 to-muted/30 backdrop-blur-sm"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center gap-8">
              {/* Heart animation */}
              <motion.div
                className="text-6xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                💕
              </motion.div>

              {/* Loading text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h2 className="text-3xl md:text-4xl font-imperial text-primary mb-2">
                  Preparing Your Special Day
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Loading beautiful memories...
                </p>
              </motion.div>

              {/* Progress bar */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 0.3 }}
                className="w-64 md:w-80 h-1 bg-muted rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.div>

              {/* Progress percentage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-muted-foreground font-medium"
              >
                {Math.round(progress)}%
              </motion.div>

              {/* Animated dots */}
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

