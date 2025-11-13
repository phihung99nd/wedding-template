import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface Milestone {
  date: string
  title: string
  description: string
  side: "left" | "right"
}

interface LoveStorySectionProps {
  videoUrl?: string
  milestones?: Milestone[]
}

const defaultMilestones: Milestone[] = [
  {
    date: "2020",
    title: "First Meeting",
    description: "We met at a coffee shop and instantly connected.",
    side: "left",
  },
  {
    date: "2021",
    title: "First Date",
    description: "Our first official date at the park.",
    side: "right",
  },
  {
    date: "2022",
    title: "Official",
    description: "We made it official and started our journey together.",
    side: "left",
  },
  {
    date: "2023",
    title: "Living Together",
    description: "We moved in together and built our home.",
    side: "right",
  },
  {
    date: "2024",
    title: "Engagement",
    description: "The magical moment when we got engaged.",
    side: "left",
  },
  {
    date: "2025",
    title: "Wedding",
    description: "Our special day when we become one.",
    side: "right",
  },
]

export function LoveStorySection({
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  milestones = defaultMilestones,
}: LoveStorySectionProps) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      id="love-story"
      ref={sectionRef}
      className="min-h-screen py-20 px-4 bg-background"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center mb-4">Our Love Story</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            A journey of love, laughter, and unforgettable moments
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

        {/* Timeline Tree */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/30 transform -translate-x-1/2 hidden md:block" />

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: milestone.side === "left" ? -50 : 50,
                }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: milestone.side === "left" ? -50 : 50 }
                }
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`flex items-center gap-8 ${
                  milestone.side === "left" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div
                  className={`flex-1 ${
                    milestone.side === "left" ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <Card className="p-6">
                    <CardContent className="p-0">
                      <div className="text-sm text-primary font-semibold mb-2">
                        {milestone.date}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Center Circle */}
                <div className="relative z-10 hidden md:block">
                  <div className="w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg" />
                </div>

                {/* Empty space for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

