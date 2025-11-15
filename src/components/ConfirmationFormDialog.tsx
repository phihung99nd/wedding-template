import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  email: z
    .union([z.string().email("Please enter a valid email address"), z.literal("")])
    .optional(),
})

type FormValues = z.infer<typeof formSchema>

interface ConfirmationFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  scriptUrl?: string
}

export function ConfirmationFormDialog({
  open,
  onOpenChange,
  scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL ?? "",
}: ConfirmationFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    if (!scriptUrl) {
      alert("Please configure the Google Apps Script URL")
      return
    }

    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      // Prepare data for Google Sheets
      const formData = {
        name: data.name,
        phone: data.phone || "",
        email: data.email || "",
        timestamp: new Date().toISOString(),
      }

      // Send to Google Apps Script
      const response = await fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      // Since we're using no-cors, we can't check the response
      // But we'll assume success if no error is thrown
      setSubmitSuccess(true)
      form.reset()
      
      setTimeout(() => {
        onOpenChange(false)
        setSubmitSuccess(false)
      }, 2000)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your confirmation. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="sm:max-w-[500px]">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">Confirm Your Participation</h2>
          <p className="text-muted-foreground mb-6">
            We would love to have you celebrate with us! Please fill out the form below.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {submitSuccess && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-md text-sm">
                  Thank you! Your confirmation has been submitted successfully.
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

