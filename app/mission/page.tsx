"use client";

import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col gap-12 animate-in fade-in duration-700 text-pretty">

      {/* Page Title */}
      {/* <h1 className="text-3xl md:text-4xl font-bold text-center">About the Foundation</h1> */}

      {/* <Separator /> */}

      {/* Vision Statement */}
      <div className="py-12 md:py-16 bg-accent/30 rounded-sm animate-slide-in-from-top duration-300">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-satoshi">Vision Statement</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            To rekindle the sacred within people, places, and purposes so that Dharma, dignity, and clarity become
            living realities in our modern world.
          </p>
        </div>
      </div>

      {/* About Us */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold font-satoshi">About Us</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Born from a blend of contemplation and commitment, Adiyogi Foundation brings together seekers, volunteers, educators, and visionaries. 
          We operate at the intersection of spirituality and social reform where rebuilding temples also means rebuilding lives.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Our work spans across spiritual well-being, environmental stewardship, educational equity, and humanitarian service — 
          each rooted in the yogic principle of inner clarity as the first act of service.
        </p>
      </section>

      {/* Purpose Section */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold font-satoshi">Our Purpose</h2>
        <blockquote className="italic border-l-4 pl-4 text-muted-foreground">
          “We do not build temples; we rebuild purpose and restore lives.”
        </blockquote>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Our projects are designed as pathways from confusion to clarity, from crisis to dharma. Every offering is a response to a deep modern need.
        </p>

        {/* Flowchart */}
        <div className="space-y-4 mt-12">
          <div className="flex-row flex-wrap justify-center gap-6 space-y-8 text-lg  font-medium font-satoshi">
            <FlowRow items={["Confusion", "Stillness", "Clarity", "Purpose", "Dharma"]} />
            <FlowRow items={["Burnout", "Silence", "Reflection", "Redirection", "Service"]} />
            <FlowRow items={["Disconnection", "Inquiry", "Wisdom", "Belonging", "Impact"]} />
          </div>
        </div>
      </section>

      {/* Belief Statements */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold font-satoshi pb-2">We Believe</h2>
        <ul className="list-disc list-inside text-muted-foreground text-lg space-y-2">
          <li>Spirituality is not an escape, but an anchor.</li>
          <li>Ancient truths are not outdated — they are underapplied.</li>
          <li>Everyone — believer or skeptic — can benefit from deeper self-awareness, community care, and conscious living.</li>
          <li>Spirituality is for all, regardless of belief.</li>
          <li>Ancient knowledge holds keys to modern suffering.</li>
          <li>Transformation is possible in people and places.</li>
          <li>Spirituality is not just for the renunciant; it is a toolkit for the entrepreneur, the student, the homemaker.</li>
        </ul>
      </section>

      {/* Closing */}
      <section className="space-y-2 py-8">
        <p className="text-muted-foreground text-xl text-center underline font-bold leading-relaxed font-satoshi">
          Through ancient insights and modern tools, we empower clarity that lasts.
        </p>
      </section>
    </div>
  );
}

// Helper component for flowchart rows
function FlowRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 text-lg text-foreground/70">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          {item}
          {index < items.length - 1 && <span className="opacity-50">→</span>}
        </span>
      ))}
    </div>
  );
}
