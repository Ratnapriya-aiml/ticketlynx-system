
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import EventCard, { EventType } from '@/components/EventCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Filter, Search } from "lucide-react";

const categories = [
  "All Events",
  "Concerts",
  "Conferences",
  "Exhibitions",
  "Festivals",
  "Sports",
  "Workshops"
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventType[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    
    if (isAdmin) {
      navigate('/admin');
      return;
    }
    
    // Fetch events data
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
        {
          id: '5',
          title: 'Basketball Championship',
          date: 'Jul 3, 2023',
          time: '5:30 PM - 8:30 PM',
          location: 'Sports Arena, Chicago',
          category: 'Sports',
          image: '/sports.jpg',
          price: 60,
          attendees: 700,
          maxAttendees: 800,
          status: 'upcoming'
        },
        {
          id: '6',
          title: 'UX/UI Design Workshop',
          date: 'May 28, 2023',
          time: '1:00 PM - 5:00 PM',
          location: 'Creative Hub, Austin',
          category: 'Workshops',
          image: '/workshop.jpg',
          price: 50,
          attendees: 28,
          maxAttendees: 30,
          status: 'upcoming'
        },
        {
          id: '7',
          title: 'Classical Music Night',
          date: 'Jun 10, 2023',
          time: '7:00 PM - 9:30 PM',
          location: 'Symphony Hall, Boston',
          category: 'Concerts',
          image: '/concert.jpg',
          price: 75,
          attendees: 320,
          maxAttendees: 400,
          status: 'upcoming'
        },
        {
          id: '8',
          title: 'Blockchain Conference',
          date: 'Jul 15, 2023',
          time: '9:00 AM - 6:00 PM',
          location: 'Tech Center, Seattle',
          category: 'Conferences',
          image: '/conference.jpg',
          price: 249,
          attendees: 300,
          maxAttendees: 350,
          trending: true,
          status: 'upcoming'
        }
      ];
      
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setIsLoading(false);
    }, 1500);
  }, [navigate]);

  // Filter events when search query or category changes
  useEffect(() => {
    let result = [...events];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        event => 
          event.title.toLowerCase().includes(query) || 
          event.location.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All Events') {
      result = result.filter(event => event.category === selectedCategory);
    }
    
    setFilteredEvents(result);
  }, [searchQuery, selectedCategory, events]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <section className="mb-12 animate-fade-up">
          <div className="glass-card rounded-xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: 'url(/conference.jpg)' }} />
            <div className="relative z-10">
              <div className="max-w-xl">
                <h1 className="text-4xl font-bold mb-4">Discover Amazing Events</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Find and book tickets for concerts, conferences, exhibitions, and more.
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search events..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="glass-button">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="mb-8 animate-fade-up delay-75">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Browse Events</h2>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              View Calendar
            </Button>
          </div>
          
          <div className="overflow-x-auto hide-scrollbar pb-2">
            <div className="flex space-x-2 min-w-max">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === category 
                      ? 'glass-button' 
                      : 'hover:bg-secondary'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Events Section */}
        <section className="mb-12 animate-fade-up delay-150">
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="space-y-6">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No events found matching your criteria</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All Events');
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="trending">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEvents
                    .filter(event => event.trending)
                    .map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="upcoming">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEvents
                    .filter(event => event.status === 'upcoming')
                    .map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Featured Section */}
        <section className="animate-fade-up delay-300">
          <h2 className="text-2xl font-semibold mb-6">Featured Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeaturedCard
              title="Music Events"
              description="Discover the best concerts and music festivals"
              image="/concert.jpg"
              action="View All"
            />
            
            <FeaturedCard
              title="Tech Conferences"
              description="Stay updated with the latest technology trends"
              image="/conference.jpg"
              action="Explore"
            />
            
            <FeaturedCard
              title="Cultural Exhibitions"
              description="Experience art and culture from around the world"
              image="/exhibition.jpg"
              action="Discover"
            />
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © 2023 EventLynx. All rights reserved.
              </p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

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
      <div className="h-8 bg-secondary rounded-md mt-4" />
    </div>
  </div>
);

const FeaturedCard = ({ 
  title, 
  description, 
  image, 
  action 
}: { 
  title: string; 
  description: string; 
  image: string; 
  action: string; 
}) => (
  <div className="glass-card rounded-xl overflow-hidden group">
    <div className="h-40 relative">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-200">{description}</p>
      </div>
    </div>
    <div className="p-4">
      <Button className="w-full glass-button">
        {action}
      </Button>
    </div>
  </div>
);

export default UserDashboard;
