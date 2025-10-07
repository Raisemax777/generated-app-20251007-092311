import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Toaster, toast } from "sonner";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});
type ContactFormValues = z.infer<typeof formSchema>;
const contactDetails = [
    {
        icon: Mail,
        label: "Email",
        value: "hello@serene.com",
        href: "mailto:hello@serene.com",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+1 (555) 123-4567",
        href: "tel:+15551234567",
    },
    {
        icon: MapPin,
        label: "Address",
        value: "123 Serenity Lane, Tranquil City, 12345",
    },
];
export function HomePage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  function onSubmit(values: ContactFormValues) {
    console.log("Form submitted:", values);
    toast.success("Message Sent!", {
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    form.reset();
  }
  return (
    <>
      <main className="bg-slate-50 font-sans text-slate-800 antialiased">
        <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white">
          {/* Header */}
          <header className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <h1 className="text-2xl font-bold text-blue-900">Serene Contact</h1>
          </header>
          {/* Main Content */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              {/* Left Column: Info */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="space-y-3">
                  <h2 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-tight">Get in Touch</h2>
                  <p className="text-lg text-slate-600">
                    We'd love to hear from you. Whether you have a question, feedback, or just want to say hello, please don't hesitate to reach out.
                  </p>
                </div>
                <div className="space-y-6">
                  {contactDetails.map((detail, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <detail.icon className="w-6 h-6 text-blue-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">{detail.label}</h3>
                        {detail.href ? (
                             <a href={detail.href} className="text-slate-600 hover:text-blue-800 transition-colors duration-200">
                                {detail.value}
                            </a>
                        ) : (
                            <p className="text-slate-600">{detail.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              {/* Right Column: Form */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <Card className="w-full shadow-lg border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-2xl text-blue-900">Send us a message</CardTitle>
                    <CardDescription>Fill out the form below and we'll reply shortly.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
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
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us how we can help..."
                                  className="resize-none"
                                  rows={5}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white" size="lg">
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                            </Button>
                        </motion.div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="bg-white">
            <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
                <p>Built with ❤️ at Cloudflare</p>
            </div>
        </footer>
      </main>
      <Toaster richColors position="top-right" />
    </>
  );
}