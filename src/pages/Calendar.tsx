
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventType } from '@/components/EventCard';
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { addDays, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';

const CalendarView = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventType[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState<{ date: Date; events: EventType[] }[]>([]);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/');
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
        }
      ];
      
      setEvents(mockEvents);
      
      // Process events for calendar display
      const allDates = eachDayOfInterval({
        start: startOfMonth(date),
        end: endOfMonth(date)
      });
      
      const eventsByDate = allDates.map(day => {
        // Convert event dates to actual Date objects for comparison
        const eventsOnDay = mockEvents.filter(event => {
          // Parse the event date (assuming format like "Jun 15, 2023")
          const parts = event.date.split(', ');
          if (parts.length !== 2) return false;
          
          const monthDay = parts[0].split(' ');
          if (monthDay.length !== 2) return false;
          
          const eventDate = new Date(`${monthDay[0]} ${monthDay[1]}, ${parts[1]}`);
          return isSameDay(eventDate, day);
        });
        
        return {
          date: day,
          events: eventsOnDay
        };
      });
      
      setCalendarEvents(eventsByDate);
      setIsLoading(false);
    }, 1500);
  }, [navigate, date]);

  const handlePrevMonth = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Custom day render for the calendar
  const renderDay = (day: Date) => {
    const dayEvents = calendarEvents.find(e => isSameDay(e.date, day))?.events || [];
    
    return (
      <div className="relative h-full w-full">
        <div>{format(day, 'd')}</div>
        {dayEvents.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <Badge className="bg-primary/80 px-1 text-[0.6rem]">{dayEvents.length}</Badge>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-up">
          <div>
            <h1 className="text-3xl font-bold mb-1">Event Calendar</h1>
            <p className="text-muted-foreground">
              View and manage your upcoming events
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
              <List className="h-4 w-4 mr-2" />
              List View
            </Button>
          </div>
        </div>
        
        {/* Calendar */}
        <div className="glass-card p-6 rounded-xl animate-fade-up delay-75">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              {format(date, 'MMMM yyyy')}
            </h2>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="rounded-md border"
            components={{
              Day: ({ date, ...props }) => (
                <Button 
                  variant="ghost" 
                  {...props}
                  className={`h-9 w-9 p-0 font-normal aria-selected:opacity-100 ${
                    calendarEvents.find(e => isSameDay(e.date, date))?.events.length 
                      ? 'bg-primary/10 hover:bg-primary/20 font-semibold' 
                      : ''
                  }`}
                >
                  {renderDay(date)}
                </Button>
              )
            }}
          />
        </div>
        
        {/* Events for selected day */}
        <div className="mt-8 animate-fade-up delay-150">
          <h2 className="text-xl font-semibold mb-6">
            Events on {format(date, 'MMMM d, yyyy')}
          </h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-24 bg-secondary/50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {calendarEvents.find(e => isSameDay(e.date, date))?.events.length ? (
                <div className="space-y-4">
                  {calendarEvents
                    .find(e => isSameDay(e.date, date))
                    ?.events.map(event => (
                      <div 
                        key={event.id} 
                        className="glass-card p-4 rounded-xl flex items-center justify-between hover:bg-background/50 transition-colors"
                        onClick={() => navigate(`/event/${event.id}`)}
                      >
                        <div className="flex items-center gap-4">
                          <div 
                            className="h-12 w-12 rounded-md bg-cover bg-center"
                            style={{ 
                              backgroundImage: `url(${
                                event.image.startsWith('http') 
                                  ? event.image 
                                  : `/images/${event.image}`
                              })` 
                            }}
                          />
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {event.time} • {event.location}
                            </p>
                          </div>
                        </div>
                        
                        <Badge className={event.category === 'Conferences' 
                          ? 'bg-blue-500/90' 
                          : event.category === 'Concerts' 
                          ? 'bg-indigo-500/90'
                          : event.category === 'Exhibitions'
                          ? 'bg-purple-500/90'
                          : event.category === 'Festivals'
                          ? 'bg-pink-500/90'
                          : event.category === 'Sports'
                          ? 'bg-green-500/90'
                          : 'bg-amber-500/90'
                        }>
                          {event.category}
                        </Badge>
                      </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 glass-card rounded-xl">
                  <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">No Events Scheduled</p>
                  <p className="text-muted-foreground mb-6">
                    There are no events scheduled for this date.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CalendarView;
