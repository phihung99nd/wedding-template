import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, CreditCard } from "lucide-react"

interface QRSectionProps {
  qrCodeImage?: string
  bankName?: string
  accountNumber?: string
  accountHolder?: string
}

export function QRSection({
  qrCodeImage = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=Banking+QR+Code+Placeholder",
  bankName = "Bank Name",
  accountNumber = "1234 5678 9012 3456",
  accountHolder = "Couple Name",
}: QRSectionProps) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      id="qr"
      ref={sectionRef}
      className="min-h-screen py-20 px-4 bg-background"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            Send Your Blessings
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Your presence is the greatest gift, but if you wish to send a
            blessing, you can use the QR code below
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <QrCode className="w-12 h-12 text-primary" />
                </div>
              </div>
              <CardTitle>Banking Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-background border-2 border-primary/20 rounded-lg">
                  <img
                    src={qrCodeImage}
                    alt="QR Code"
                    className="w-64 h-64 object-contain"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Bank</div>
                    <div className="font-medium">{bankName}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Account Number
                    </div>
                    <div className="font-medium">{accountNumber}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Account Holder
                    </div>
                    <div className="font-medium">{accountHolder}</div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-center text-muted-foreground pt-4 border-t">
                Scan the QR code with your banking app to send your blessing
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

