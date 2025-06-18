import Link from "next/link";
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="flex-1 w-full flex flex-col">
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 -m-10 blur-[8px] scale-110 rounded-lg">
          {/* <Image 
            src="/hero_image.jpg" 
            alt="Scenic mountain landscape" 
            fill 
            priority
          /> */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-background rounded-lg" /> */}
        </div>
        
        {/* Content Container with Proper Padding */}
        <div className="relative min-h-[90vh] flex items-center justify-start px-4 pb-24 z-10">
          {/* Vignette Effect for 360 Blending */}
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none"></div>
          
          {/* Hero Content */}
          <div className="max-w-6xl w-full mx-auto text-center z-10 pb-16 bg-radial from-yellow-100 via-yellow-50/20 to-transparent">
            <div className="animate-fade-in-up">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary font-medium mb-6 text-sm tracking-wide border font-satoshi border-primary/20 animate-fade-in">
                Adiyogi Foundation
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-6xl text-pretty font-bold text-foreground mb-6 tracking-tight leading-tight font-satoshi">
              Rebuilding Purpose.<br></br> Restoring Dharma. <br></br>Reviving the Sacred
              </h1>
              
              <p className="text-xl md:text-xl text-pretty text-foreground/80 max-w-3xl mx-auto mb-2 leading-relaxed">
              Adiyogi Foundation is a space of remembrance a place where ancient insights meet modern lives. Throughinner inquiry, outer service, and sacred restoration, we guide individuals and communities backtoclarity,dignity, and dharma. We serve not to convert, but to co-create.
              </p>
              
              {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                  <Link href="/destinations">Explore Destinations</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="px-8 py-6 text-lg rounded-full bg-background/30 backdrop-blur-sm hover:bg-background/50 text-foreground border-foreground/20 hover:border-foreground/40 transition-all">
                  <Link href="/about">Our Story</Link>
                </Button>
              </div> */}
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-0 right-0 mx-auto flex flex-col items-center justify-center animate-bounce">
            <span className="text-foreground/70 text-sm mb-2 font-satoshi">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-1.5 bg-foreground/70 rounded-full animate-scroll-down"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
