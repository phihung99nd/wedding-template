import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CoupleSectionProps {
  weddingDate?: Date
  bride?: {
    name: string
    parent: string
    birthday: string
    description: string
    avatar: string
  }
  groom?: {
    name: string
    parent: string
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
    name: "Bride Name",
    parent: "Parents' Names",
    birthday: "Birthday",
    description: "A beautiful description about the bride...",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  groom = {
    name: "Groom Name",
    parent: "Parents' Names",
    birthday: "Birthday",
    description: "A wonderful description about the groom...",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  centerImage = "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
}: CoupleSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

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
                <Card className="w-32 h-32 flex flex-col items-center justify-center">
                  <CardContent className="p-0 flex flex-col items-center justify-center h-full">
                    <div className="text-4xl font-bold text-primary">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {item.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Couple Info */}
        <div className="relative flex items-center justify-center gap-8 flex-wrap">
          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 min-w-[300px] max-w-md"
          >
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <motion.img
                  src={bride.avatar}
                  alt={bride.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.6, type: "spring" }}
                />
                <h3 className="text-3xl font-bold mb-2">{bride.name}</h3>
                <p className="text-muted-foreground mb-2">
                  Daughter of {bride.parent}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Born: {bride.birthday}
                </p>
                <p className="text-sm leading-relaxed">{bride.description}</p>
              </div>
            </Card>
          </motion.div>

          {/* Center Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="relative z-10"
          >
            <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-background shadow-2xl">
              <img
                src={centerImage}
                alt="Wedding"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 min-w-[300px] max-w-md"
          >
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <motion.img
                  src={groom.avatar}
                  alt={groom.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.6, type: "spring" }}
                />
                <h3 className="text-3xl font-bold mb-2">{groom.name}</h3>
                <p className="text-muted-foreground mb-2">
                  Son of {groom.parent}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Born: {groom.birthday}
                </p>
                <p className="text-sm leading-relaxed">{groom.description}</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

