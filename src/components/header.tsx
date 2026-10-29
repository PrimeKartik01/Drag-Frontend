import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import logo from "@/assets/img/logo.webp";
import mobilelogo from "@/assets/img/mobilelogo.webp";


import { Button } from "../../@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../../@/components/ui/sheet";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed left-0 top-0 z-50 mx-auto w-full left-1/2 -translate-x-1/2 max-w-[1522px] transition-all duration-300 ${
        scrolled
          ? "bg-gray-800/90 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex h-20 w-full items-center justify-between px-3 md:px-6">
        {/* Logo */}
        <a href="/" className="inline-flex items-center">
          <img
            src={mobilelogo}
            alt="SS PRIME"
            className="h-18 w-auto object-contain"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-white transition hover:text-white/70"
            >
              {link.label}
            </a>
          ))}

          <Button className="rounded-xl bg-gold text-white hover:bg-gold-100">
            Enquire Now
          </Button>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] border-white/10 bg-gray-900 text-white sm:w-[360px] duration-600 ease-in-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
            >
              <SheetHeader>
                <a href="/" className="inline-flex items-center">
                  <img
                    src={mobilelogo}
                    alt="SS PRIME"
                    className="h-24 w-30 object-contain"
                  />
                </a>
              </SheetHeader>

              <nav className=" flex flex-col gap-2 px-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                ))}

                <Button className="w-full rounded-xl bg-gold text-white hover:bg-gold-100">
                  Enquire Now
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
