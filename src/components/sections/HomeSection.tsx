import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import ornamentCorner from "../../assets/images/ornament_corner.png";

interface ImageData {
  url: string;
  time: string;
  event: string;
}

interface HomeSectionProps {
  images?: string[]
  imageData?: ImageData[]
}

const defaultImages = [
  "https://images.unsplash.com/photo-1722805740177-04256b6517f2?w=1200&q=80",
  "https://images.unsplash.com/photo-1571984129381-41d698ebca6b?w=1200&q=80",
  "https://images.unsplash.com/photo-1520886272478-69aed2b3685b?w=1200&q=80",
  "https://images.unsplash.com/photo-1580824456266-c578703e13da?w=1200&q=80",
  "https://images.unsplash.com/photo-1698802060858-f585123570cd?w=1200&q=80",
]

const defaultImageData: ImageData[] = [
  { url: defaultImages[0], time: "27-03-2026", event: "Thai Duong & Khanh Linh" },
  { url: defaultImages[1], time: "27-03-2026", event: "Thai Duong & Khanh Linh" },
  { url: defaultImages[2], time: "27-03-2026", event: "Thai Duong & Khanh Linh" },
  { url: defaultImages[3], time: "27-03-2026", event: "Thai Duong & Khanh Linh" },
  { url: defaultImages[4], time: "27-03-2026", event: "Thai Duong & Khanh Linh" },
]

export function HomeSection({ images = defaultImages, imageData = defaultImageData }: HomeSectionProps) {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Get current image index (the center image)
  const currentImageIndex = 4 - positionIndexes[4];
  const currentImageUrl = images[currentImageIndex];

  // Find matching image data by URL or fall back to index
  const currentImageData = imageData.find(data => data.url === currentImageUrl)
    || imageData[currentImageIndex]
    || { time: "", event: "" };

  // Function to reset the auto-slide interval
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setPositionIndexes((prevIndexes) => {
        return prevIndexes.map(
          (prevIndex) => (prevIndex + 1) % 5
        );
      });
    }, 5000);
  };

  const handleNext = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 1) % 5
      );
      return updatedIndexes;
    });
    resetInterval();
  };

  const handleBack = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 4) % 5
      );

      return updatedIndexes;
    });
    resetInterval();
  };

  const createRotateArray = (index: number) => {
    if (index > 4 || index < 0) throw new Error("Index must be between 0 and 4");

    // Create base sequence [0, 1, 2, 3, 4]
    const arr = Array.from({ length: 5 }, (_, i) => i);

    // Rotate the array so that the last element equals 4 - index
    const rotated = arr.map((_, i) => (i - index + 5) % 5);
    return rotated;
  }
  const handleImageClick = (index: number) => {
    setPositionIndexes(createRotateArray(index));
    resetInterval();
  };

  // Set up auto-slide interval on mount and clean up on unmount
  useEffect(() => {
    resetInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const positions = ["center", "left1", "left", "right", "right1"];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5, opacity: 1 },
    left1: { x: "-50%", scale: 0.7, zIndex: 3, opacity: 1 },
    left: { x: "-90%", scale: 0.5, zIndex: 2, opacity: 1 },
    right: { x: "90%", scale: 0.5, zIndex: 1, opacity: 1 },
    right1: { x: "50%", scale: 0.7, zIndex: 3, opacity: 1 },
    hidden: { x: "0%", scale: 1, zIndex: 5, opacity: 0 },
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={4 - positionIndexes[4]}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-black/20"
        >
          <img
            src={images[4 - positionIndexes[4]]}
            alt={`Slide ${4 - positionIndexes[4] + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Title */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-center relative p-12 w-[800px] max-w-[calc(100%-80px)]"
          >
            {/* Top-left square angle */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 border-t-2 border-l-2 border-white"></div>
            <img src={ornamentCorner} alt="Angle Top Left" className="absolute top-[-20px] right-0 w-[170px] h-[100px]" />

            {/* Bottom-right square angle */}
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 border-b-2 border-r-2 border-white"></div>
            <img src={ornamentCorner} alt="Angle Bottom Right" className="absolute bottom-[-20px] left-0 rotate-180 w-[170px] h-[100px]" />

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex flex-col items-center justify-center text-white"
            >
              <h1 className="text-5xl md:text-7xl mb-4 drop-shadow-2xl font-imperial">
                {currentImageData.event}
              </h1>
              <h3 className="text-2xl md:text-3xl font-light mb-4 drop-shadow-2xl">
                We're getting married!
              </h3>
              <p className="text-2xl font-light drop-shadow-lg">
                {currentImageData.time}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image thumbnails at bottom */}
      <div className="absolute w-[calc(100%-80px)] max-w-[500px] bottom-0 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center flex-col justify-center">
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={image}
              className="rounded-[12px] shadow-2xl border border-white/20 w-[40%] aspect-[16/9] object-cover"
              initial="hidden"
              animate={positions[positionIndexes[index]]}
              variants={imageVariants}
              transition={{ duration: 0.5 }}
              style={{ width: "40%", position: "absolute" }}
              onClick={() => handleImageClick(index)}
            />
          ))}
          <div className="h-[300px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+40px)] flex flex-row justify-between">
              <Button
                variant="outline" size="icon"
                className="text-white bg-transparent rounded-[50%] py-2 px-4"
                onClick={handleBack}
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="outline" size="icon"
                className="text-white bg-transparent rounded-[50%] py-2 px-4"
                onClick={handleNext}
              >
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

