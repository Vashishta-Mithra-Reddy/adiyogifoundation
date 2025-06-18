import Link from "next/link";
// import { AuthButton } from "../auth-button";
import Navigation from "./navigation";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Header() {
return (
         <nav className="w-full max-w-6xl flex justify-center h-20 bg-background backdrop-blur-3xl sticky top-0 md:top-8 rounded-none border border-foreground/10 md:rounded-xl px-6 md:px-4 z-50 md:shadow-md">
          <div className="w-full max-w-7xl flex justify-between items-center p-3 px-2 md:px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"} className="text-xl font-bold font-satoshi">Adiyogi Foundation</Link>
              {/* <Link href={"/"} className="text-xl font-bold px-0 md:px-10">
              <Image src="/white_waters_v5.png" width={60} height={60} priority alt="White Waters Logo" className="rounded-full"/>
              </Link> */}
            </div>
            <Navigation />
            {/* <AuthButton /> */}
            <Link href={"/contact"} className="px-5 py-3 bg-foreground text-background rounded-xl active:scale-95 transition-all duration-500">
            Contact Us
            </Link>
          </div>
        </nav>
);
}