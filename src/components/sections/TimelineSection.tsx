import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Shirt } from "lucide-react"

interface Event {
  name: string
  time: string
  address: string
  dressCode: string
  thumbnail: string
  description?: string
}

interface TimelineSectionProps {
  events?: Event[]
}

const defaultEvents: Event[] = [
  {
    name: "Ceremony",
    time: "10:00 AM",
    address: "Beautiful Garden Venue, 123 Main St",
    dressCode: "Formal Attire",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
    description: "Join us for our wedding ceremony",
  },
  {
    name: "Cocktail Hour",
    time: "11:30 AM",
    address: "Garden Venue, Outdoor Area",
    dressCode: "Cocktail Attire",
    thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80",
    description: "Enjoy drinks and appetizers",
  },
  {
    name: "Reception",
    time: "12:30 PM",
    address: "Grand Ballroom, 123 Main St",
    dressCode: "Formal Attire",
    thumbnail: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80",
    description: "Dinner and dancing celebration",
  },
  {
    name: "After Party",
    time: "6:00 PM",
    address: "Rooftop Bar, 123 Main St",
    dressCode: "Smart Casual",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
    description: "Continue the celebration",
  },
]

export function TimelineSection({ events = defaultEvents }: TimelineSectionProps) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="min-h-screen py-20 px-4 bg-background"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            Wedding Timeline
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Join us throughout the day for these special moments
          </p>
        </motion.div>

        <div className="space-y-6">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-64 md:h-auto">
                    <img
                      src={event.thumbnail}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <CardTitle className="text-2xl">{event.name}</CardTitle>
                      {event.description && (
                        <p className="text-muted-foreground">
                          {event.description}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">{event.time}</span>
                      </div>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="w-5 h-5 mt-0.5" />
                        <span>{event.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Shirt className="w-5 h-5" />
                        <span>{event.dressCode}</span>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

