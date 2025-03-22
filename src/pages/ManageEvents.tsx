
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Edit, Plus, Search, Trash2 } from "lucide-react";
import { EventType } from '@/components/EventCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ManageEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventType[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  
  // Dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  
  // Selected events for bulk actions
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  
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
  
  // Filter events when search query or filters change
  useEffect(() => {
    let result = [...events];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        event => 
          event.title.toLowerCase().includes(query) || 
          event.location.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(event => event.category === selectedCategory);
    }
    
    // Filter by status
    if (selectedStatus !== 'All') {
      result = result.filter(event => event.status === selectedStatus);
    }
    
    setFilteredEvents(result);
  }, [searchQuery, selectedCategory, selectedStatus, events]);
  
  // Open delete confirmation dialog
  const openDeleteDialog = (eventId: string) => {
    setEventToDelete(eventId);
    setIsDeleteDialogOpen(true);
  };
  
  // Delete event
  const deleteEvent = () => {
    if (!eventToDelete) return;
    
    // Filter out the event to delete
    const updatedEvents = events.filter(event => event.id !== eventToDelete);
    setEvents(updatedEvents);
    
    // Remove from selected events if it was selected
    setSelectedEvents(selectedEvents.filter(id => id !== eventToDelete));
    
    toast({
      title: "Event Deleted",
      description: "The event has been successfully deleted",
    });
    
    // Close dialog
    setIsDeleteDialogOpen(false);
    setEventToDelete(null);
  };
  
  // Handle bulk selection
  const toggleSelectAll = () => {
    if (selectedEvents.length === filteredEvents.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(filteredEvents.map(event => event.id));
    }
  };
  
  const toggleSelectEvent = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };
  
  // Delete selected events
  const deleteSelectedEvents = () => {
    // Filter out selected events
    const updatedEvents = events.filter(event => !selectedEvents.includes(event.id));
    setEvents(updatedEvents);
    
    toast({
      title: "Events Deleted",
      description: `${selectedEvents.length} events have been deleted`,
    });
    
    // Clear selection
    setSelectedEvents([]);
  };
  
  // Get category-specific badge color
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Concerts':
        return 'bg-indigo-500/90';
      case 'Conferences':
        return 'bg-blue-500/90';
      case 'Exhibitions':
        return 'bg-purple-500/90';
      case 'Festivals':
        return 'bg-pink-500/90';
      case 'Sports':
        return 'bg-green-500/90';
      case 'Workshops':
        return 'bg-amber-500/90';
      default:
        return 'bg-primary/90';
    }
  };
  
  // Get status badge color
  const getStatusColor = (status?: string): string => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/90';
      case 'ongoing':
        return 'bg-green-500/90';
      case 'completed':
        return 'bg-gray-500/90';
      default:
        return 'bg-primary/90';
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar isAdmin={true} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6"
          onClick={() => navigate('/admin')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Manage Events</h1>
            <p className="text-muted-foreground">
              View, edit, and delete your events
            </p>
          </div>
          
          <Button 
            className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            onClick={() => navigate('/create-event')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>
        
        {/* Filters and Search */}
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {['Concerts', 'Conferences', 'Exhibitions', 'Festivals', 'Sports', 'Workshops'].map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Events Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-8 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 bg-secondary/50 rounded-md animate-pulse" />
              ))}
            </div>
          ) : filteredEvents.length > 0 ? (
            <>
              <div className="p-4 border-b">
                {selectedEvents.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {selectedEvents.length} selected
                    </span>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={deleteSelectedEvents}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Selected
                    </Button>
                  </div>
                )}
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox 
                        checked={selectedEvents.length === filteredEvents.length && filteredEvents.length > 0}
                        indeterminate={selectedEvents.length > 0 && selectedEvents.length < filteredEvents.length}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map(event => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedEvents.includes(event.id)}
                          onCheckedChange={() => toggleSelectEvent(event.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-cover bg-center" style={{ backgroundImage: `url(${event.image.startsWith('http') ? event.image : `/images/${event.image}`})` }} />
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {event.location}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{event.date}</div>
                        <div className="text-xs text-muted-foreground">{event.time}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : 'Unknown'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{event.attendees}/{event.maxAttendees}</div>
                        <div className="w-24 h-1 bg-secondary rounded-full mt-1">
                          <div 
                            className={`h-full rounded-full ${
                              event.attendees >= event.maxAttendees
                                ? 'bg-red-500'
                                : event.attendees / event.maxAttendees >= 0.8
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(100, Math.round((event.attendees / event.maxAttendees) * 100))}%` }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>${event.price}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => navigate(`/edit-event/${event.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => openDeleteDialog(event.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <div className="p-8 text-center">
              <p className="text-lg text-muted-foreground">No events found</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={deleteEvent}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageEvents;
