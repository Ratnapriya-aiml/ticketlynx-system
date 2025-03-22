import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import EventCard, { EventType } from '@/components/EventCard';
import Chart from '@/components/Chart';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowUp, 
  ArrowUpRight, 
  Calendar, 
  CreditCard, 
  LayoutDashboard, 
  Plus, 
  Ticket, 
  TrendingUp, 
  Users
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<EventType[]>([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    comparedToLastMonth: 18,
  });

  useEffect(() => {
    // Check if user is logged in as admin
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    
    if (!isAdmin) {
      navigate('/dashboard');
      return;
    }
    
    // Fetch mock data
    setTimeout(() => {
      const mockEvents: EventType[] = [
        {
          id: '1',
          title: 'Tech Summit 2023',
          date: 'Jun 15, 2023',
          time: '9:00 AM - 5:00 PM',
          location: 'Convention Center, San Francisco',
          category: 'Conferences',
          image: '/conference.jpg',
          price: 199,
          attendees: 380,
          maxAttendees: 400,
          trending: true,
          status: 'upcoming'
        },
        {
          id: '2',
          title: 'Summer Music Festival',
          date: 'Jul 8-10, 2023',
          time: 'All Day',
          location: 'Central Park, New York',
          category: 'Festivals',
          image: '/festival.jpg',
          price: 149,
          attendees: 5000,
          maxAttendees: 5000,
          status: 'upcoming'
        },
        {
          id: '3',
          title: 'Modern Art Exhibition',
          date: 'May 20, 2023',
          time: '10:00 AM - 8:00 PM',
          location: 'Metropolitan Museum',
          category: 'Exhibitions',
          image: '/exhibition.jpg',
          price: 25,
          attendees: 120,
          maxAttendees: 200,
          status: 'ongoing'
        },
        {
          id: '4',
          title: 'Rock Concert: The Amplifiers',
          date: 'Jun 22, 2023',
          time: '7:00 PM - 11:00 PM',
          location: 'Madison Square Garden',
          category: 'Concerts',
          image: '/concert.jpg',
          price: 85,
          attendees: 950,
          maxAttendees: 1000,
          trending: true,
          status: 'upcoming'
        },
      ];
      
      setEvents(mockEvents);
      setStats({
        totalEvents: 24,
        totalBookings: 8745,
        totalRevenue: 124590,
        pendingPayments: 8,
        comparedToLastMonth: 18
      });
      setIsLoading(false);
    }, 1500);
  }, [navigate]);

  // Chart data
  const revenueData = [
    { name: 'Jan', value: 65000 },
    { name: 'Feb', value: 72000 },
    { name: 'Mar', value: 84000 },
    { name: 'Apr', value: 98000 },
    { name: 'May', value: 110000 },
    { name: 'Jun', value: 124590 },
  ];
  
  const bookingsByCategory = [
    { name: 'Concerts', value: 2650 },
    { name: 'Conferences', value: 1830 },
    { name: 'Exhibitions', value: 1240 },
    { name: 'Festivals', value: 1900 },
    { name: 'Sports', value: 850 },
    { name: 'Workshops', value: 275 },
  ];
  
  const registrationStatus = [
    { name: 'Registered + Paid', value: 6850 },
    { name: 'Registered Only', value: 1895 },
  ];

  return (
    <div className="min-h-screen">
      <Navbar isAdmin={true} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-up">
          <div>
            <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage events, bookings, and analyze performance
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <Button className="glass-button" onClick={() => navigate('/create-event')}>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-up delay-75">
          <StatsCard 
            title="Total Events" 
            value={stats.totalEvents} 
            change={"+2"} 
            icon={<Calendar className="h-5 w-5 text-blue-400" />}
            isLoading={isLoading}
          />
          
          <StatsCard 
            title="Total Bookings" 
            value={stats.totalBookings} 
            change={`+${stats.comparedToLastMonth}%`} 
            icon={<Ticket className="h-5 w-5 text-indigo-400" />}
            isLoading={isLoading}
          />
          
          <StatsCard 
            title="Total Revenue" 
            value={`$${stats.totalRevenue.toLocaleString()}`} 
            change={"+12%"} 
            icon={<CreditCard className="h-5 w-5 text-green-400" />}
            isLoading={isLoading}
          />
          
          <StatsCard 
            title="Pending Payments" 
            value={stats.pendingPayments} 
            change={"-3"} 
            trend="down"
            icon={<TrendingUp className="h-5 w-5 text-yellow-400" />}
            isLoading={isLoading}
          />
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 animate-fade-up delay-150">
            <Chart 
              type="area" 
              data={revenueData} 
              height={350} 
              title="Revenue Overview"
              subTitle="Total revenue over the last 6 months"
              tooltipFormatter={(value) => `$${value.toLocaleString()}`}
            />
          </div>
          
          <div className="animate-fade-up delay-200">
            <Chart 
              type="pie" 
              data={bookingsByCategory} 
              height={350} 
              title="Bookings by Category"
              subTitle="Distribution of bookings by event type"
            />
          </div>
        </div>
        
        {/* Registration Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-xl p-5 h-full animate-fade-up delay-250">
            <h3 className="text-lg font-medium mb-1">Registration Status</h3>
            <p className="text-sm text-muted-foreground mb-4">Registered users vs. payments</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Registered + Paid</p>
                <p className="text-2xl font-semibold">6,850</p>
                <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+14.2%</span>
                </div>
              </div>
              
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Registered Only</p>
                <p className="text-2xl font-semibold">1,895</p>
                <div className="flex items-center gap-1 text-xs text-red-500 mt-1">
                  <ArrowUpRight className="h-3 w-3 rotate-90" />
                  <span>-3.8%</span>
                </div>
              </div>
            </div>
            
            <Chart 
              type="bar" 
              data={registrationStatus} 
              height={200}
              colors={['#0071e3', '#555555']}
            />
          </div>
          
          <div className="glass-card rounded-xl p-5 h-full animate-fade-up delay-300">
            <h3 className="text-lg font-medium mb-1">Recent Activity</h3>
            <p className="text-sm text-muted-foreground mb-4">Latest events and registrations</p>
            
            <div className="space-y-4">
              <ActivityItem 
                title="New Registration"
                description="Sarah Johnson registered for Tech Summit 2023"
                time="2 minutes ago"
                icon={<Users className="h-4 w-4 text-blue-400" />}
              />
              
              <ActivityItem 
                title="Payment Received"
                description="Payment of $199 received for Tech Summit 2023"
                time="5 minutes ago"
                icon={<CreditCard className="h-4 w-4 text-green-400" />}
              />
              
              <ActivityItem 
                title="Event Updated"
                description="Rock Concert: The Amplifiers was updated"
                time="1 hour ago"
                icon={<Calendar className="h-4 w-4 text-indigo-400" />}
              />
              
              <ActivityItem 
                title="New Registration"
                description="Mike Davis registered for Summer Music Festival"
                time="2 hours ago"
                icon={<Users className="h-4 w-4 text-blue-400" />}
              />
              
              <ActivityItem 
                title="Payment Received"
                description="Payment of $149 received for Summer Music Festival"
                time="2 hours ago"
                icon={<CreditCard className="h-4 w-4 text-green-400" />}
              />
            </div>
          </div>
        </div>
        
        {/* Popular Events */}
        <div className="mb-8 animate-fade-up delay-350">
          <Tabs defaultValue="trending">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Event Management</h2>
              <div className="flex items-center gap-3">
                <TabsList>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="all">All Events</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm" onClick={() => navigate('/manage-events')}>
                  Manage All
                </Button>
              </div>
            </div>
            
            <TabsContent value="trending">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {events
                    .filter(event => event.trending)
                    .map(event => (
                      <EventCard key={event.id} event={event} compact />
                    ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recent">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {events.map(event => (
                    <EventCard key={event.id} event={event} compact />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="all">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {events.map(event => (
                    <EventCard key={event.id} event={event} compact />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Quick Actions */}
        <div className="animate-fade-up delay-400">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ActionCard 
              title="Create New Event" 
              icon={<Calendar className="h-5 w-5" />}
              color="bg-gradient-to-br from-blue-500 to-blue-700"
              description="Add a new event to the system"
              onClick={() => navigate('/create-event')}
            />
            
            <ActionCard 
              title="Manage Events" 
              icon={<Ticket className="h-5 w-5" />}
              color="bg-gradient-to-br from-indigo-500 to-indigo-700"
              description="Review and manage ticket bookings"
              onClick={() => navigate('/manage-events')}
            />
            
            <ActionCard 
              title="Analytics Dashboard" 
              icon={<LayoutDashboard className="h-5 w-5" />}
              color="bg-gradient-to-br from-cyan-500 to-cyan-700"
              description="In-depth analytics and reports"
              onClick={() => {}}
            />
            
            <ActionCard 
              title="User Management" 
              icon={<Users className="h-5 w-5" />}
              color="bg-gradient-to-br from-violet-500 to-violet-700"
              description="Manage user accounts and permissions"
              onClick={() => {}}
            />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © 2023 EventLynx Admin Portal. All rights reserved.
              </p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Help Center
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Documentation
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const StatsCard = ({ 
  title, 
  value, 
  change, 
  trend = "up", 
  icon,
  isLoading = false
}: { 
  title: string; 
  value: number | string; 
  change: string; 
  trend?: "up" | "down"; 
  icon: React.ReactNode;
  isLoading?: boolean;
}) => (
  <Card className="glass-card border-0">
    <CardContent className="p-6">
      {isLoading ? (
        <div className="space-y-3">
          <div className="h-4 bg-secondary rounded-full w-2/3 animate-pulse" />
          <div className="h-8 bg-secondary rounded-full w-1/2 animate-pulse" />
          <div className="h-4 bg-secondary rounded-full w-1/4 animate-pulse" />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-3">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              {icon}
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-semibold">{value}</p>
            <div className={`flex items-center text-xs ${
              trend === "up" ? "text-green-500" : "text-red-500"
            }`}>
              {trend === "up" ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowUp className="h-3 w-3 mr-1 rotate-180" />
              )}
              <span>{change} from last month</span>
            </div>
          </div>
        </>
      )}
    </CardContent>
  </Card>
);

const ActivityItem = ({ 
  title, 
  description, 
  time, 
  icon 
}: {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}) => (
  <div className="flex gap-3">
    <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
      <p className="text-xs text-muted-foreground mt-1">{time}</p>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="glass-card rounded-xl overflow-hidden animate-pulse">
    <div className="h-40 bg-secondary" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-secondary rounded-full w-3/4" />
      <div className="space-y-2">
        <div className="h-3 bg-secondary rounded-full" />
        <div className="h-3 bg-secondary rounded-full" />
        <div className="h-3 bg-secondary rounded-full w-1/2" />
      </div>
    </div>
  </div>
);

const ActionCard = ({ 
  title, 
  description, 
  icon, 
  color,
  onClick
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}) => (
  <div className="glass-card rounded-xl overflow-hidden hover:ring-1 hover:ring-primary/50 transition-all duration-300 group">
    <div className={`h-1 ${color}`} />
    <div className="p-5">
      <div className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Button className="glass-button w-full" onClick={onClick}>
        Get Started
      </Button>
    </div>
  </div>
);

export default AdminDashboard;

