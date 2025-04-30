
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Brain, Users, Map, LineChart, Home } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={16} /> },
    { name: "Dashboard", path: "/dashboard", icon: <LineChart size={16} /> },
    { name: "Dengue Map", path: "/dengue-map", icon: <Map size={16} /> },
    { name: "Mental Health", path: "/mental-health", icon: <Brain size={16} /> },
    { name: "Community", path: "/community", icon: <Users size={16} /> },
  ];
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-bold text-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="text-primary">Urban</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Health</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:text-primary hover:bg-primary/5 dark:text-slate-300"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:flex"
          >
            Sign In
          </Button>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all"
          >
            Join Now
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 shadow-lg md:hidden border-t border-slate-200 dark:border-slate-800">
        <div className="flex justify-around">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "py-3 flex flex-col items-center justify-center flex-1 text-xs font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-slate-600 hover:text-primary dark:text-slate-400"
                )}
              >
                <span className={cn(
                  "p-1 rounded-full mb-1",
                  isActive ? "bg-primary/10" : ""
                )}>
                  {link.icon}
                </span>
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
