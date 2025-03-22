
import { useState } from 'react';
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export type EventType = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  price: number;
  attendees: number;
  maxAttendees: number;
  trending?: boolean;
  status?: 'upcoming' | 'ongoing' | 'completed';
};

interface EventCardProps {
  event: EventType;
  compact?: boolean;
}

const EventCard = ({ event, compact = false }: EventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const percentageFilled = Math.min(100, Math.round((event.attendees / event.maxAttendees) * 100));
  const almostFull = percentageFilled >= 80;
  const isSoldOut = percentageFilled >= 100;

  // Default image if none is provided
  const imageUrl = event.image.startsWith('http') 
    ? event.image 
    : `/images/${event.image}`;

  return (
    <div 
      className={`glass-card rounded-xl overflow-hidden transition-all duration-500 animate-fade-up group ${
        compact ? 'h-64' : 'h-full'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={event.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onError={(e) => {
            // Fallback to a placeholder image if the event image fails to load
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge className="bg-primary/90 backdrop-blur-sm text-xs">
            {event.category}
          </Badge>
          {event.trending && (
            <Badge className="bg-red-500/90 backdrop-blur-sm text-xs animate-pulse-slow">
              Trending
            </Badge>
          )}
        </div>
        
        {event.status && (
          <Badge 
            className={`absolute top-2 right-2 text-xs ${
              event.status === 'upcoming' 
                ? 'bg-blue-500/90' 
                : event.status === 'ongoing' 
                ? 'bg-green-500/90' 
                : 'bg-gray-500/90'
            } backdrop-blur-sm`}
          >
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        )}
        
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
          <h3 className="text-white text-lg font-semibold truncate">
            {event.title}
          </h3>
          <span className="text-white font-medium">
            ${event.price}
          </span>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{event.attendees}/{event.maxAttendees}</span>
            </div>
            <span className={`${
              almostFull ? (isSoldOut ? 'text-red-500' : 'text-yellow-500') : 'text-green-500'
            }`}>
              {isSoldOut 
                ? 'Sold Out' 
                : almostFull 
                ? 'Almost Full' 
                : 'Available'}
            </span>
          </div>
          <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isSoldOut 
                  ? 'bg-red-500' 
                  : almostFull 
                  ? 'bg-yellow-500' 
                  : 'bg-green-500'
              }`}
              style={{ width: `${percentageFilled}%` }}
            />
          </div>
        </div>
        
        {!compact && (
          <Link to={`/event/${event.id}`}>
            <Button 
              className="w-full glass-button mt-2"
              disabled={isSoldOut}
            >
              {isSoldOut ? 'Sold Out' : 'Book Now'}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventCard;
