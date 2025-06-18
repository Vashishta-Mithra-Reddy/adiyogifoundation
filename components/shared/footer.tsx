"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Youtube,
  Linkedin,
  MessageCircleMore,
  Mail
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center text-center gap-10 py-16 max-w-7xl px-6 sm:px-10 md:px-20 mb-16 bg-background rounded-none border-2 border-foreground/10 md:rounded-xl">

      {/* Logo and Foundation Name */}
      <Link href="/" className="text-xl font-semibold">
        <div className="flex-col items-center justify-center gap-4">
          {/* <Image src="/white_waters_v5.png" width={80} height={80} alt="White Waters Logo" className="rounded-full"/> */}
          <p className="font-bold font-satoshi text-3xl sm:text-4xl pb-2 md:pb-4">Adiyogi Foundation</p>
          <p className="max-w-md text-md text-pretty italic text-foreground/50 leading-relaxed">
            Our programs are bridges… reconnecting modern needs with eternal wisdom.
          </p>
        </div>
      </Link>

      {/* Quote */}
      

      {/* CTA */}
      <div className="flex flex-col items-center gap-2">
        {/* <p className="text-sm font-medium text-foreground/80">Choose Your Contribution</p> */}
        <Link
          href="/contribute"
          className="px-6 py-2 bg-foreground/10 hover:bg-foreground/20 font-satoshi rounded-lg text-md font-medium transition-colors"
        >
          Become a Sahyogi
        </Link>
      </div>

      {/* Core Values */}
      <div className="flex flex-col items-center gap-3 font-satoshi">
        <h3 className="font-semibold text-sm text-foreground/80 tracking-wider">CORE VALUES</h3>
        <div className="flex flex-wrap justify-center gap-2 text-xs text-foreground/70">
          {["Dharma", "Dignity", "Service", "Sustainability", "Synchronicity"].map((value) => (
            <span key={value} className="px-4 py-2 bg-foreground/5 rounded-full">
              {value}
            </span>
          ))}
        </div>
      </div>

      {/* Social Media Links */}
      <div className="flex flex-col items-center gap-3">
        <h3 className="font-semibold text-sm text-foreground/80 tracking-wider">CONNECT WITH US</h3>
        <div className="flex flex-wrap justify-center gap-5 text-foreground/70">
          <Link href="#" className="hover:text-foreground transition-colors" aria-label="Instagram">
            <Instagram className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors" aria-label="YouTube">
            <Youtube className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors" aria-label="WhatsApp">
            <MessageCircleMore className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors" aria-label="Newsletter">
            <Mail className="w-6 h-6" />
          </Link>
        </div>
      </div>

    </footer>
  );
}
