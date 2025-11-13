import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export function GuestbookSection() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && message) {
      // Here you would typically send the data to a backend
      console.log("Guestbook entry:", { name, message })
      setSubmitted(true)
      setName("")
      setMessage("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section
      id="guestbook"
      ref={sectionRef}
      className="min-h-screen py-20 px-4 bg-gradient-to-b from-muted/20 to-background"
    >
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-center mb-4">Guestbook</h2>
          <p className="text-center text-muted-foreground">
            Leave a message and share your wishes for the happy couple
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Share Your Wishes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Share your wishes and blessings..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Submit Message
                </Button>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center text-primary font-medium"
                  >
                    Thank you for your message! ❤️
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

