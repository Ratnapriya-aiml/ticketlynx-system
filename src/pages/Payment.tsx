
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  CreditCard, 
  Lock,
  Shield, 
  CheckCircle
} from "lucide-react";
import { EventType } from '@/components/EventCard';

// Define payment method type
type PaymentMethod = 'card' | 'paypal' | 'apple' | 'google';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStep, setPaymentStep] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [quantity, setQuantity] = useState(1);
  
  // Get event data and quantity from location state if available
  useEffect(() => {
    if (location.state?.event) {
      setEvent(location.state.event);
      if (location.state.quantity) {
        setQuantity(location.state.quantity);
      }
      setIsLoading(false);
    } else if (id) {
      // Fetch event data if not passed in state
      setTimeout(() => {
        const mockEvent: EventType = {
          id: id,
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
        
        setEvent(mockEvent);
        setIsLoading(false);
      }, 1000);
    }
  }, [id, location.state]);

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
  
  if (isLoading || !event) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex justify-center items-center h-64">
            <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        </main>
      </div>
    );
  }

  const totalPrice = event.price * quantity;
  const serviceFee = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + serviceFee;

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
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 animate-fade-up">Secure Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Payment Info Column */}
            <div className="md:col-span-2 space-y-6 animate-fade-up">
              {paymentStep === 0 && (
                <div className="glass-card rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  
                  <div className="space-y-4">
                    <PaymentOption 
                      id="card"
                      label="Credit or Debit Card"
                      icon={<CreditCard className="h-5 w-5" />}
                      selected={selectedMethod === 'card'}
                      onClick={() => setSelectedMethod('card')}
                    />
                    
                    <PaymentOption 
                      id="paypal"
                      label="PayPal"
                      icon={<div className="text-blue-500 font-bold text-sm">PayPal</div>}
                      selected={selectedMethod === 'paypal'}
                      onClick={() => setSelectedMethod('paypal')}
                    />
                    
                    <PaymentOption 
                      id="apple"
                      label="Apple Pay"
                      icon={<div className="font-semibold">Apple Pay</div>}
                      selected={selectedMethod === 'apple'}
                      onClick={() => setSelectedMethod('apple')}
                    />
                    
                    <PaymentOption 
                      id="google"
                      label="Google Pay"
                      icon={<div className="font-semibold">Google Pay</div>}
                      selected={selectedMethod === 'google'}
                      onClick={() => setSelectedMethod('google')}
                    />
                  </div>
                  
                  <Button 
                    className="w-full glass-button mt-8"
                    onClick={handlePayment}
                  >
                    Continue to Payment Details
                  </Button>
                </div>
              )}
              
              {paymentStep === 1 && (
                <div className="glass-card rounded-xl p-6 animate-fade-in">
                  <h2 className="text-xl font-semibold mb-4">
                    {selectedMethod === 'card' 
                      ? 'Card Details' 
                      : `${selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1)} Payment`}
                  </h2>
                  
                  {selectedMethod === 'card' ? (
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
                            Security Code
                          </label>
                          <Input id="cvv" placeholder="123" type="password" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <Lock className="h-4 w-4" />
                        <span>Your payment information is secure</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="mb-6">
                        You will be redirected to {selectedMethod === 'paypal' 
                          ? 'PayPal' 
                          : selectedMethod === 'apple' 
                          ? 'Apple Pay' 
                          : 'Google Pay'} to complete your payment
                      </p>
                      <div className="inline-flex h-16 w-16 items-center justify-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Shield className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4 mt-8">
                    <Button 
                      className="w-full glass-button"
                      onClick={handlePayment}
                    >
                      Pay ${grandTotal}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setPaymentStep(0)}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              )}
              
              {paymentStep === 2 && (
                <div className="glass-card rounded-xl p-6 animate-fade-in">
                  <div className="text-center py-8 space-y-4">
                    <div className="inline-flex h-16 w-16 rounded-full bg-green-500/10 items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-green-500 animate-pulse" />
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
              
              <div className="glass-card rounded-xl p-6 animate-fade-up delay-75">
                <h2 className="text-xl font-semibold mb-4">Secure Payment</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <Shield className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-medium text-sm">SSL Secure Payment</p>
                      <p className="text-xs text-muted-foreground">Your information is protected by 256-bit SSL encryption</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    <div className="p-2 bg-secondary/50 rounded-md flex items-center justify-center">
                      <div className="text-xs font-semibold">VISA</div>
                    </div>
                    <div className="p-2 bg-secondary/50 rounded-md flex items-center justify-center">
                      <div className="text-xs font-semibold">MASTERCARD</div>
                    </div>
                    <div className="p-2 bg-secondary/50 rounded-md flex items-center justify-center">
                      <div className="text-xs font-semibold">AMEX</div>
                    </div>
                    <div className="p-2 bg-secondary/50 rounded-md flex items-center justify-center">
                      <div className="text-xs font-semibold">DISCOVER</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary Column */}
            <div className="animate-fade-up delay-150">
              <div className="glass-card rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Price ({quantity} {quantity === 1 ? 'ticket' : 'tickets'})</span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service fee</span>
                      <span>${serviceFee}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${grandTotal}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.location}</p>
                    </div>
                    
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>• All sales are final, no refunds</p>
                      <p>• Tickets will be emailed to you</p>
                      <p>• Valid ID may be required at the venue</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Payment option component
const PaymentOption = ({ 
  id,
  label,
  icon,
  selected,
  onClick
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) => (
  <div 
    className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
      selected 
        ? 'bg-primary/10 border border-primary/20' 
        : 'bg-secondary/50 border border-border hover:bg-secondary'
    }`}
    onClick={onClick}
  >
    <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
      selected ? 'border-primary' : 'border-muted-foreground'
    }`}>
      {selected && <div className="h-3 w-3 rounded-full bg-primary" />}
    </div>
    
    <div className="flex-1 flex items-center justify-between">
      <label htmlFor={id} className="cursor-pointer font-medium">
        {label}
      </label>
      <div>{icon}</div>
    </div>
  </div>
);

export default Payment;
