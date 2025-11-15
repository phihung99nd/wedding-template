import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { ConfirmationFormDialog } from "@/components/ConfirmationFormDialog"

interface DividerSectionProps {
  onConfirmClick?: () => void
  onGuestbookClick?: () => void
  onQRClick?: () => void
  scriptUrl?: string
}

export function DividerSection({
  onConfirmClick,
  onGuestbookClick,
  onQRClick,
  scriptUrl,
}: DividerSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="py-16 px-4 bg-gradient-to-r from-primary/10 via-background to-primary/10">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
          <h2 className="text-3xl font-bold text-center">
            Join Us in Celebrating Our Special Day
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl">
            We would be honored to have you with us as we begin this new
            chapter together.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button
              size="lg"
              onClick={() => {
                onConfirmClick?.()
                setIsDialogOpen(true)
              }}
            >
              Confirm Participation
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                onGuestbookClick?.()
                scrollToSection("guestbook")
              }}
            >
              Leave a Message
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                onQRClick?.()
                scrollToSection("qr")
              }}
            >
              Send Blessings
            </Button>
          </div>
        </motion.div>
      </div>
      <ConfirmationFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        scriptUrl={scriptUrl}
      />
    </div>
  )
}

