import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-dark.svg";
import { Link } from "react-router";
import { Sidebar } from "lucide-react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Closes the mobile menu
  };

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed w-full transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } bg-gray-800 text-white shadow-md z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={"/"} className="flex items-center">
              <img
                  src={logo}
                  alt="EngageLens Logo"
                  className="h-8 w-auto mr-2"
                />
                EngageLens
            </Link>  
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => handleScrollToSection("features")}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Features
              </button>
              <button
                onClick={() => handleScrollToSection("work")}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                How it works?
              </button>
              <button
                onClick={() => handleScrollToSection("about")}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                About us
              </button>
            </div>
          </div>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {/* <Link to={"/login"}>
              <Button
                size="sm"
                className="relative group overflow-hidden px-4 py-2 hover:bg-gray-700"
              >
                <span className="relative z-10">Login</span>
              </Button>
            </Link> */}
            <Link to={"/dashboard"}>
              <Button
                variant="outline"
                className="relative group overflow-hidden px-4 py-2 border-2 border-white bg-white text-black hover:bg-transparent hover:text-white transition-all duration-300"
                size="sm"
              >
                <span className="relative z-10 flex gap-2"><Sidebar /> Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => handleScrollToSection("features")}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Features
            </button>
            <button
              onClick={() => handleScrollToSection("work")}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              How it works?
            </button>
            <button
              onClick={() => handleScrollToSection("about")}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              About us
            </button>
            <div className="flex flex-col px-3 space-y-2">
              <Link to={"/login"}>
                <Button size="sm" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button variant="outline" size="sm" className="text-black">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
