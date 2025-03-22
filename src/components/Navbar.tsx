
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CalendarDays, Home, LogOut, User } from "lucide-react";

const Navbar = ({ isAdmin = false }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to={isAdmin ? "/admin" : "/dashboard"} 
          className="flex items-center gap-2"
        >
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <CalendarDays className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-medium">EventLynx</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <NavLink 
            to={isAdmin ? "/admin" : "/dashboard"} 
            active={location.pathname === (isAdmin ? "/admin" : "/dashboard")}
          >
            <Home className="h-4 w-4 mr-2" />
            {isAdmin ? "Dashboard" : "Events"}
          </NavLink>
          <NavLink 
            to={isAdmin ? "/admin/events" : "/profile"} 
            active={location.pathname === (isAdmin ? "/admin/events" : "/profile")}
          >
            {isAdmin ? (
              <>
                <CalendarDays className="h-4 w-4 mr-2" />
                Manage Events
              </>
            ) : (
              <>
                <User className="h-4 w-4 mr-2" />
                Profile
              </>
            )}
          </NavLink>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ children, to, active }: { children: React.ReactNode, to: string, active: boolean }) => (
  <Link
    to={to}
    className={`relative px-2 py-1 flex items-center text-sm font-medium transition-all duration-200 ${
      active 
        ? 'text-foreground' 
        : 'text-muted-foreground hover:text-foreground'
    }`}
  >
    {children}
    {active && (
      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full animate-fade-in" />
    )}
  </Link>
);

export default Navbar;
