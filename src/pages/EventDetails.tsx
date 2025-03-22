
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import EventCard, { EventType } from '@/components/EventCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CreditCard, 
  Info, 
  Lock,
  MapPin, 
  Share, 
  Star, 
  Ticket, 
  Users 
} from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [paymentStep, setPaymentStep] = useState(0);
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
        image: '/conference.jpg',
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
          image: '/conference.jpg',
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
          image: '/conference.jpg',
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
          image: '/conference.jpg',
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

  const incrementQuantity = () => {
    if (event && quantity < event.maxAttendees - event.attendees) {
      setQuantity(prev => prev + 1);
    } else {
      toast.error('Maximum available tickets reached');
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handlePayment = () => {
    if (paymentStep === 0) {
      setPaymentStep(1);
      return;
    }
    
    if (paymentStep === 1) {
      setPaymentStep(2);
      
      // Simulate payment processing
      setTimeout(() => {
        toast.success('Payment successful! Tickets have been booked.');
        navigate('/dashboard');
      }, 2000);
    }
  };
  
  const availableTickets = event ? event.maxAttendees - event.attendees : 0;
  const isSoldOut = availableTickets <= 0;
  const totalPrice = event ? event.price * quantity : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-secondary rounded-full w-1/3" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-[400px] bg-secondary rounded-xl mb-6" />
                <div className="space-y-4">
                  <div className="h-4 bg-secondary rounded-full" />
                  <div className="h-4 bg-secondary rounded-full" />
                  <div className="h-4 bg-secondary rounded-full w-3/4" />
                </div>
              </div>
              
              <div>
                <div className="h-[300px] bg-secondary rounded-xl" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
            <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Button 
              className="glass-button"
              onClick={() => navigate('/dashboard')}
            >
              Return to Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
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
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="relative h-[400px]">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {event.category}
                  </div>
                  {event.trending && (
                    <div className="bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm animate-pulse-slow">
                      Trending
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-white/90">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/90">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Star className="h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Share className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                    <p className="text-muted-foreground">
                      Join us for the premier tech conference of the year! Tech Summit 2023 brings together industry leaders, innovators, and tech enthusiasts for a day of inspiring talks, hands-on workshops, and networking opportunities.
                    </p>
                    <p className="text-muted-foreground mt-4">
                      This year's summit will focus on artificial intelligence, blockchain technology, and sustainable tech solutions. Whether you're a developer, entrepreneur, or simply passionate about technology, Tech Summit 2023 offers valuable insights and connections for everyone in the tech community.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">What's Included</h2>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Info className="h-3 w-3 text-primary" />
                        </div>
                        <span>Full access to all keynote sessions and panels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Info className="h-3 w-3 text-primary" />
                        </div>
                        <span>Hands-on workshops with industry experts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Info className="h-3 w-3 text-primary" />
                        </div>
                        <span>Networking opportunities with tech professionals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Info className="h-3 w-3 text-primary" />
                        </div>
                        <span>Lunch, refreshments, and summit swag bag</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Event Schedule</h2>
                    <div className="space-y-4">
                      <ScheduleItem 
                        time="9:00 AM - 10:00 AM"
                        title="Registration & Welcome Coffee"
                      />
                      <ScheduleItem 
                        time="10:00 AM - 11:30 AM"
                        title="Keynote: The Future of AI in Everyday Technology"
                        speaker="Dr. Sarah Chen, AI Research Lead at TechCorp"
                      />
                      <ScheduleItem 
                        time="11:45 AM - 12:45 PM"
                        title="Panel Discussion: Blockchain Beyond Cryptocurrency"
                        speaker="Industry experts from finance and tech sectors"
                      />
                      <ScheduleItem 
                        time="1:00 PM - 2:00 PM"
                        title="Lunch Break & Networking"
                      />
                      <ScheduleItem 
                        time="2:15 PM - 3:45 PM"
                        title="Workshop Sessions (Multiple Tracks)"
                        description="Choose from AI, Blockchain, or Sustainable Tech workshops"
                      />
                      <ScheduleItem 
                        time="4:00 PM - 5:00 PM"
                        title="Closing Keynote & Networking Reception"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Similar Events */}
            <div className="space-y-6 animate-fade-up delay-200">
              <h2 className="text-xl font-semibold">Similar Events You Might Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarEvents.map(event => (
                  <EventCard key={event.id} event={event} compact />
                ))}
              </div>
            </div>
          </div>
          
          {/* Booking Column */}
          <div className="animate-fade-up delay-150">
            {paymentStep === 0 && (
              <div className="glass-card rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Book Tickets</h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium">${event.price}</p>
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="h-4 w-4" />
                        <span>
                          {availableTickets} {availableTickets === 1 ? 'ticket' : 'tickets'} left
                        </span>
                      </div>
                    </div>
                    
                    <Progress value={event.attendees / event.maxAttendees * 100} className="h-1" />
                    
                    {availableTickets < 20 && (
                      <p className="text-sm text-yellow-500 flex items-center gap-1">
                        <Info className="h-4 w-4" />
                        {availableTickets < 10 
                          ? 'Almost sold out! Get your tickets now.' 
                          : 'Selling fast! Limited tickets available.'}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Quantity</span>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-r-none"
                          onClick={decrementQuantity}
                          disabled={quantity <= 1 || isSoldOut}
                        >
                          -
                        </Button>
                        <div className="h-8 px-3 flex items-center justify-center border border-x-0 border-input">
                          {quantity}
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-l-none"
                          onClick={incrementQuantity}
                          disabled={quantity >= availableTickets || isSoldOut}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Price ({quantity} {quantity === 1 ? 'ticket' : 'tickets'})</span>
                        <span>${event.price * quantity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Service fee</span>
                        <span>${Math.round(event.price * quantity * 0.05)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${Math.round(event.price * quantity * 1.05)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full glass-button"
                    disabled={isSoldOut}
                    onClick={handlePayment}
                  >
                    {isSoldOut ? 'Sold Out' : 'Proceed to Payment'}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    By proceeding, you agree to our terms of service and cancellation policy.
                  </p>
                </div>
              </div>
            )}
            
            {paymentStep === 1 && (
              <div className="glass-card rounded-xl p-6 sticky top-24 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="cardName" className="text-sm font-medium">
                        Cardholder Name
                      </label>
                      <Input id="cardName" placeholder="Enter cardholder name" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="cardNumber" className="text-sm font-medium">
                        Card Number
                      </label>
                      <div className="relative">
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="expiry" className="text-sm font-medium">
                          Expiry Date
                        </label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="cvv" className="text-sm font-medium">
                          CVV
                        </label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Event</span>
                      <span>{event.title}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Date</span>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Quantity</span>
                      <span>{quantity} {quantity === 1 ? 'ticket' : 'tickets'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service fee</span>
                      <span>${Math.round(totalPrice * 0.05)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${Math.round(totalPrice * 1.05)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full glass-button"
                      onClick={handlePayment}
                    >
                      Pay ${Math.round(totalPrice * 1.05)}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setPaymentStep(0)}
                    >
                      Back
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2">
                    <Lock className="h-3 w-3" />
                    <span>Secure payment processed by Stripe</span>
                  </div>
                </div>
              </div>
            )}
            
            {paymentStep === 2 && (
              <div className="glass-card rounded-xl p-6 sticky top-24 animate-fade-in">
                <div className="text-center py-8 space-y-4">
                  <div className="inline-flex h-16 w-16 rounded-full bg-primary/10 items-center justify-center mb-4">
                    <Ticket className="h-8 w-8 text-primary animate-pulse" />
                  </div>
                  
                  <h2 className="text-xl font-semibold">Processing Your Payment</h2>
                  <p className="text-muted-foreground">
                    Please wait while we confirm your booking...
                  </p>
                  
                  <div className="flex justify-center py-4">
                    <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Do not refresh or close this page.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const ScheduleItem = ({ 
  time, 
  title, 
  speaker, 
  description 
}: { 
  time: string; 
  title: string; 
  speaker?: string; 
  description?: string; 
}) => (
  <div className="bg-secondary/50 rounded-lg p-4">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
      <p className="text-sm font-medium text-primary">{time}</p>
      <div className="sm:text-right">
        <p className="text-sm font-semibold">{title}</p>
        {speaker && <p className="text-xs text-muted-foreground">{speaker}</p>}
      </div>
    </div>
    {description && (
      <p className="text-xs text-muted-foreground mt-2">{description}</p>
    )}
  </div>
);

export default EventDetails;
