"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Clock, MapPin, Send, ArrowRight } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { toast } from "sonner";
import Link from "next/link";

// Form validation schema - email OR phone required
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().optional(),
  email: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
}).refine((data) => {
  // Ensure at least one contact method is provided
  const hasEmail = data.email && data.email.trim().length > 0;
  const hasPhone = data.phone && data.phone.trim().length > 0;
  
  if (!hasEmail && !hasPhone) {
    return false;
  }
  
  // If email is provided, validate it
  if (hasEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email as string)) {
      return false;
    }
  }
  
  // If phone is provided, validate it (minimum 10 digits)
  if (hasPhone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(data.phone as string)) {
      return false;
    }
  }
  
  return true;
}, {
  message: "Please provide either a valid email address or phone number (at least one is required)",
  path: ["email"], // This will show the error on the email field
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        form.reset();
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex-1 w-full md:px-28 md:pt-2 md:pb-8 px-2 pt-0 pb-2 py-8 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="py-12 md:py-16 bg-accent/30 rounded-sm animate-slide-in-from-top duration-300">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-satoshi">Connect with Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're here to help you. Whether you have a question, need assistance, or just want to say hello, feel free to reach out to us.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 animate-fade-in duration-700">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form - Now placed first */}
          <div className="bg-card p-8 rounded-xl border border-foreground/10 shadow-sm flex flex-col h-auto lg:h-fit order-1 lg:order-1">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex-1 flex flex-col">
                <div className="space-y-5 flex-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Contact Method Section */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-muted-foreground">
                      Contact Information* (Please provide at least one)
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
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
                            <Input placeholder="Enter your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="flex-1 flex flex-col">
                        <FormLabel>Write Your Message*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What's on your mind?" 
                            className="min-h-[120px] lg:min-h-[140px] flex-1" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-4 bg-black text-background cursor-pointer" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit Now <Send className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>
            
            {/* About Us Teaser Card - Positioned below contact form */}
            {/* <div className="mt-8">
              <Link href="/about" className="block">
                <div className="bg-card rounded-xl overflow-hidden border border-border/50 hover:shadow-md transition-all hover:border-primary/20 group">
                  <div className="relative h-[300px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70 z-10 flex items-center justify-center">
                      <div className="text-center px-6">
                        <h3 className="text-2xl font-bold text-white mb-2">Our Story</h3>
                        <p className="text-white mb-4">Discover the passion behind Lost Escapes and our commitment to authentic travel experiences</p>
                        <span className="inline-flex items-center text-white font-medium">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 opacity-90">
                      <div className="w-full h-full bg-[url('/hero_image.jpg')] bg-cover bg-center transform scale-105 group-hover:scale-110 transition-transform duration-700"></div>
                    </div>
                  </div>
                </div>
              </Link>
            </div> */}
          </div>

          {/* Contact Information - Now placed second */}
          <div className="space-y-8 order-2 lg:order-2">
            <div>
              <h2 className="text-2xl font-bold mb-6">Reach Us Anytime</h2>
              <p className="text-muted-foreground mb-8">
                We're always ready to assist you with any questions or enquiries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {/* Phone */}
              <div className="bg-card p-6 rounded-xl border-2 border-foreground/10 hover:shadow-md transition-all hover:border-primary/20 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <div className="space-y-1">
                  {/* <a href="tel:+918988865556" className="block text-muted-foreground hover:text-primary transition-colors">
                    +91 89888 65556
                  </a> */}
                  <a href="tel:+911234567890" className="block text-muted-foreground hover:text-primary transition-colors">
                    +91 XXXXX XXXXX
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="bg-card p-6 rounded-xl border-2 border-foreground/10 hover:shadow-md transition-all hover:border-primary/20 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Now</h3>
                <div className="space-y-1">
                  <a href="mailto:social.adiyogifoundation@gmail.com" className="block text-blue-500 text-bold hover:text-primary transition-colors">
                  social.adiyogifoundation@gmail.com
                  </a>
                  {/* <a href="mailto:hello@lostescapes.com" className="block text-muted-foreground hover:text-primary transition-colors">
                    hello@lostescapes.com
                  </a> */}
                </div>
              </div>

              {/* Opening Time */}
              {/* <div className="bg-card p-6 rounded-xl border border-border/50 hover:shadow-md transition-all hover:border-primary/20 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Timings</h3>
                <p className="text-muted-foreground">
                  9:00Am - 10:00Pm,<br></br> All days of the week.
                </p>
              </div> */}

              {/* Location */}
              {/* <div className="bg-card p-6 rounded-xl border border-border/50 hover:shadow-md transition-all hover:border-primary/20 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground">
                  
                </p>
              </div> */}
            </div>

            {/* Map with improved styling */}
            {/* <div className="bg-card rounded-xl overflow-hidden border border-border/50 shadow-sm">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Find Us Here</h3>
              </div>
              <div className="h-[300px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13625.040957257275!2d77.16999!3d31.9528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904861f47a2aaad%3A0x5b8d6c834c3e4289!2sKullu%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1652345678901!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lost Escapes Location"
                ></iframe>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}