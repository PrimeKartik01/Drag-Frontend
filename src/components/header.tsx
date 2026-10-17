import { useEffect, useState } from "react";
import { Button } from "../../@/components/ui/button";

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

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 max-w-[1522px] mx-auto ${
        scrolled
          ? "bg-gray-800/90 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full items-center justify-between px-6">
        {/* Logo */}
        <a
          href="/"
          className="text-xl font-bold tracking-wide text-white"
        >
          SS PRIME
        </a>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <a
            href="/"
            className="text-sm font-medium text-white transition hover:text-white/70"
          >
            Home
          </a>

          <a
            href="/projects"
            className="text-sm font-medium text-white transition hover:text-white/70"
          >
            Projects
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-white transition hover:text-white/70"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-white transition hover:text-white/70"
          >
            Contact
          </a>

          <Button className="rounded-xl bg-white text-black hover:bg-white/90">
            Enquire Now
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Header;