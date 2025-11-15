import { useState, useEffect } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"
import floralBorderBackground from "@/assets/images/Floral-Border-Background.png"
import floralOvalBorder from "../../assets/images/Floral-Oval-Border.png";


interface CoupleSectionProps {
  weddingDate?: Date
  bride?: {
    name: string
    parent: {
      father: string
      mother: string
    }
    birthday: string
    description: string
    avatar: string
  }
  groom?: {
    name: string
    parent: {
      father: string
      mother: string
    }
    birthday: string
    description: string
    avatar: string
  }
  centerImage?: string
}

const defaultWeddingDate = new Date('2026-03-27')

export function CoupleSection({
  weddingDate = defaultWeddingDate,
  bride = {
    name: "Nguyen Khanh Linh",
    parent: {
      father: "Father's Name",
      mother: "Mother's Name",
    },
    birthday: "Birthday",
    description: "Enim dolor lorem amet ex ex laboris labore. Culpa elit dolor tempor cillum aliqua tempor. Ullamco sint irure id nisi enim fugiat aliquip non commodo irure. Pariatur labore consequat aute non nostrud voluptate. Labore dolor tempor sunt consectetur excepteur voluptate enim...",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  groom = {
    name: "Tran Thai Duong",
    parent: {
      father: "Father's Name",
      mother: "Mother's Name",
    },
    birthday: "Birthday",
    description: "Esse ullamco sint velit non lorem cillum elit pariatur ex do exercitation. Aliquip irure pariatur tempor aute. Quis adipiscing dolor tempor veniam proident lorem anim magna do enim. Laborum magna nostrud id fugiat ullamco reprehenderit veniam culpa. Proident eiusmod ipsum non irure...",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  centerImage = "https://images.unsplash.com/photo-1722805740177-04256b6517f2?w=1200&q=80",
}: CoupleSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const centerImageRef = useRef<HTMLDivElement>(null)
  
  // Mouse position tracking for tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!centerImageRef.current) return
    
    const rect = centerImageRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +weddingDate - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [weddingDate])

  const countdownItems = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <section
      id="couple"
      ref={sectionRef}
      className="min-h-screen py-20 px-4 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Countdown to Our Special Day
          </h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {countdownItems.map((item) => (
              <motion.div
                key={item.label}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <div
                  className="w-32 h-32 flex flex-col items-center justify-center relative"
                  style={{
                    backgroundImage: `url(${floralBorderBackground})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="text-4xl font-bold text-primary">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {item.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Couple Info */}
        <div className="relative flex items-center justify-center gap-8 flex-wrap" style={{ perspective: "1000px" }}>
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 min-w-[300px] max-w-md"
          >
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <motion.img
                  src={groom.avatar}
                  alt={groom.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.6, type: "spring" }}
                />
                <h3 className="text-[40px] mb-2 font-imperial">{groom.name}</h3>
                <p className="text-muted-foreground mb-2">
                  <span className="font-bold">Father:</span> {groom.parent.father}
                  <br />
                  <span className="font-bold">Mother:</span> {groom.parent.mother}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="font-bold">Born:</span> {groom.birthday}
                </p>
                <p className="text-sm leading-relaxed">{groom.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Center Image */}
          <motion.div
            ref={centerImageRef}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative p-8 z-10"
            whileHover={{ scale: 1.05 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="w-96 h-144 rounded-full overflow-hidden shadow-2xl">
              <img
                src={centerImage}
                alt="Wedding"
                className="w-full h-full object-cover"
              />
              <img
                src={floralOvalBorder}
                alt="Floral Oval Border"
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 min-w-[300px] max-w-md"
          >
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <motion.img
                  src={bride.avatar}
                  alt={bride.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.6, type: "spring" }}
                />
                <h3 className="text-[40px] mb-2 font-imperial">{bride.name}</h3>
                <p className="text-muted-foreground mb-2">
                  <span className="font-bold">Father:</span> {bride.parent.father}
                  <br />
                  <span className="font-bold">Mother:</span> {bride.parent.mother}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  <span className="font-bold">Born:</span> {bride.birthday}
                </p>
                <p className="text-sm leading-relaxed">{bride.description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

