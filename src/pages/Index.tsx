
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Calendar, Eye, EyeOff, Key, Lock, User } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userIsAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (isLoggedIn) {
      navigate(userIsAdmin ? '/admin' : '/dashboard');
    }
    
    // Preload images for better performance
    const preloadImages = [
      '/concert.jpg',
      '/conference.jpg',
      '/exhibition.jpg',
      '/festival.jpg',
      '/sports.jpg',
      '/workshop.jpg'
    ];
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Check if admin key is correct
        if (isAdmin && adminKey !== 'admin123') {
          toast.error('Invalid admin key');
          setLoading(false);
          return;
        }
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
        
        navigate(isAdmin ? '/admin' : '/dashboard');
        toast.success(`${isAdmin ? 'Admin' : 'User'} login successful`);
      } else {
        toast.error('Please fill in all fields');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login Form */}
      <div className="flex-1 flex justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8 animate-fade-up">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">EventLynx</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              The Smart Event Booking & Management System
            </p>
          </div>
          
          <div className="glass-card rounded-xl p-6 space-y-6">
            <div className="flex justify-around">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  !isAdmin 
                    ? 'bg-primary text-white' 
                    : 'bg-secondary text-muted-foreground hover:text-white'
                }`}
                onClick={() => setIsAdmin(false)}
              >
                <User className="inline-block mr-2 h-4 w-4" />
                User Login
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isAdmin 
                    ? 'bg-primary text-white' 
                    : 'bg-secondary text-muted-foreground hover:text-white'
                }`}
                onClick={() => setIsAdmin(true)}
              >
                <Key className="inline-block mr-2 h-4 w-4" />
                Admin Login
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    required
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                    className="pl-10"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              {isAdmin && (
                <div className="space-y-1">
                  <label htmlFor="adminKey" className="text-sm font-medium">
                    Admin Key
                  </label>
                  <div className="relative">
                    <Input
                      id="adminKey"
                      name="adminKey"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter admin key"
                      required
                      className="pl-10"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                    />
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use "admin123" for demo purposes
                  </p>
                </div>
              )}
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full glass-button h-10"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2" />
                      Signing in...
                    </div>
                  ) : (
                    `Sign in as ${isAdmin ? 'Admin' : 'User'}`
                  )}
                </Button>
              </div>
            </form>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                {isAdmin ? (
                  'Administrative access is restricted'
                ) : (
                  'Don\'t have an account? Contact your administrator'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Image/Showcase */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-0 w-1/2 h-1/3 bg-cover" style={{ backgroundImage: 'url(/concert.jpg)' }}></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cover" style={{ backgroundImage: 'url(/conference.jpg)' }}></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-cover" style={{ backgroundImage: 'url(/exhibition.jpg)' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1/3 h-1/3 bg-cover" style={{ backgroundImage: 'url(/festival.jpg)' }}></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-cover" style={{ backgroundImage: 'url(/sports.jpg)' }}></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
          <div className="max-w-md space-y-4 animate-fade-up">
            <h2 className="text-4xl font-bold tracking-tight">Your Events, Simplified</h2>
            <p className="text-lg text-muted-foreground">
              A professional platform to manage events, track registrations, and handle payments with ease.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <FeatureCard
                icon={<Calendar className="h-5 w-5" />}
                title="Smart Booking"
                description="Seamless ticket booking experience"
              />
              <FeatureCard
                icon={<User className="h-5 w-5" />}
                title="Entry Management"
                description="Digital check-ins and attendee tracking"
              />
              <FeatureCard
                icon={<Lock className="h-5 w-5" />}
                title="Secure Payments"
                description="Safe and reliable payment processing"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => (
  <div className="glass-card rounded-lg p-4 w-full sm:w-40">
    <div className="flex flex-col items-center text-center">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
        {icon}
      </div>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  </div>
);

export default Index;
