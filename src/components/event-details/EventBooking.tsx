
import React, { useState } from 'react';
import { Info, Lock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { EventType } from '@/components/EventCard';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

interface EventBookingProps {
  event: EventType;
}

const EventBooking = ({ event }: EventBookingProps) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  
  const availableTickets = event.maxAttendees - event.attendees;
  const isSoldOut = availableTickets <= 0;
  
  const incrementQuantity = () => {
    if (quantity < availableTickets) {
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
  
  const proceedToPayment = () => {
    navigate(`/payment/${event.id}`, { 
      state: { 
        event: event,
        quantity: quantity
      } 
    });
  };

  return (
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
          className="w-full glass-button gradient-button-blue"
          disabled={isSoldOut}
          onClick={proceedToPayment}
        >
          {isSoldOut ? 'Sold Out' : 'Proceed to Checkout'}
        </Button>
        
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" />
          <span>Secure checkout with 256-bit encryption</span>
        </div>
        
        <p className="text-xs text-muted-foreground text-center">
          By proceeding, you agree to our terms of service and cancellation policy.
        </p>
      </div>
    </div>
  );
};

export default EventBooking;
