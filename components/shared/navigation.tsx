"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
    const pathname = usePathname();
    const [hoveredItem, setHoveredItem] = useState(null);

    const navItems = [
        {
            href: "/mission",
            label: "Mission",
            description: "What drives us to do what we do."
        },
        {
            href: "/programs",
            label: "Programs", 
            description: "Courses and services bridging soul and society."
        },
        {
            href: "/temples",
            label: "Temples",
            description: "Our efforts to revive Bharat's sacred spaces."
        },
        {
            href: "/contribute",
            label: "Get Involved",
            description: "Volunteer, contribute, or collaborate with us."
        },
        {
            href: "/contact",
            label: "Contact Us",
            description: "Reach out for projects, queries, or media."
        }
    ];

    return (
        <div className="hidden md:flex gap-4 relative">
            {navItems.map((item) => (
                <div 
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.href as any)}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <Link 
                        href={item.href} 
                        className={`text-foreground px-5 py-2 rounded-lg border-2 border-transparent hover:text-foreground hover:bg-foreground/10 transition-colors duration-200 ${
                            pathname === item.href ? "bg-foreground/10 border-2 border-foreground/10" : ""
                        }`}
                    >
                        {item.label}
                    </Link>
                    
                    {/* Hover Description Tooltip */}
                    {hoveredItem === item.href && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 px-3 py-2 bg-background text-foreround text-sm border border-foreground/10 rounded-lg shadow-lg whitespace-nowrap z-50 animate-in fade-in slide-in-from-top-5 duration-500">
                            {item.description}
                            <div className=" bg-background absolute -top-1 left-1/2 border-t border-l border-foreground/10 transform -translate-x-1/2 w-2 h-2 rotate-45"></div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}