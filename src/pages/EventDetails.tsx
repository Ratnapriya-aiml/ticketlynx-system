
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard, { EventType } from '@/components/EventCard';
import Navbar from '@/components/Navbar';
import EventDetailsComponent from '@/components/event-details/EventDetails';
import SimilarEvents from '@/components/event-details/SimilarEvents';
import EventBooking from '@/components/event-details/EventBooking';
import EventLoadingSkeleton from '@/components/event-details/EventLoadingSkeleton';
import EventNotFound from '@/components/event-details/EventNotFound';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [similarEvents, setSimilarEvents] = useState<EventType[]>([]);
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    
    // Fetch event data
    setTimeout(() => {
      const mockEvent: EventType = {
        id: id || '1',
        title: 'Tech Summit 2023',
        date: 'Jun 15, 2023',
        time: '9:00 AM - 5:00 PM',
        location: 'Convention Center, San Francisco',
        category: 'Conferences',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
        price: 199,
        attendees: 380,
        maxAttendees: 400,
        trending: true,
        status: 'upcoming'
      };
      
      const mockSimilarEvents: EventType[] = [
        {
          id: '8',
          title: 'Blockchain Conference',
          date: 'Jul 15, 2023',
          time: '9:00 AM - 6:00 PM',
          location: 'Tech Center, Seattle',
          category: 'Conferences',
          image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
          price: 249,
          attendees: 300,
          maxAttendees: 350,
          trending: true,
          status: 'upcoming'
        },
        {
          id: '9',
          title: 'Product Design Summit',
          date: 'Jun 28, 2023',
          time: '10:00 AM - 4:00 PM',
          location: 'Design Hub, Chicago',
          category: 'Conferences',
          image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1728&q=80',
          price: 179,
          attendees: 180,
          maxAttendees: 200,
          status: 'upcoming'
        },
        {
          id: '10',
          title: 'Digital Marketing Conference',
          date: 'Jul 5, 2023',
          time: '9:00 AM - 5:00 PM',
          location: 'Business Center, Los Angeles',
          category: 'Conferences',
          image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
          price: 159,
          attendees: 290,
          maxAttendees: 300,
          status: 'upcoming'
        }
      ];
      
      setEvent(mockEvent);
      setSimilarEvents(mockSimilarEvents);
      setIsLoading(false);
    }, 1500);
  }, [id, navigate]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {isLoading ? (
          <EventLoadingSkeleton />
        ) : !event ? (
          <EventNotFound />
        ) : (
          <>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-6 animate-fade-up"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event Details Column */}
              <div className="lg:col-span-2 space-y-6 animate-fade-up">
                <EventDetailsComponent event={event} />
                
                {/* Similar Events */}
                <SimilarEvents events={similarEvents} />
              </div>
              
              {/* Booking Column */}
              <div className="animate-fade-up delay-150">
                <EventBooking event={event} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default EventDetails;
