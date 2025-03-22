
import { useState, useEffect } from 'react';
import { Calendar, Clock, Heart, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

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
  inWishlist?: boolean;
};

interface EventCardProps {
  event: EventType;
  compact?: boolean;
}

// Function to get category-specific image
const getCategoryImage = (category: string): string => {
  switch (category) {
    case 'Concerts':
      return 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80';
    case 'Conferences':
      return 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80';
    case 'Exhibitions':
      return 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80';
    case 'Festivals':
      return 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80';
    case 'Sports':
      return 'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1680&q=80';
    case 'Workshops':
      return 'https://images.unsplash.com/photo-1536094333464-13c0a26fe225?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80';
    default:
      return 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80';
  }
};

const EventCard = ({ event, compact = false }: EventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(event.inWishlist || false);
  
  const percentageFilled = Math.min(100, Math.round((event.attendees / event.maxAttendees) * 100));
  const almostFull = percentageFilled >= 80;
  const isSoldOut = percentageFilled >= 100;

  // Get category-specific image or use provided image
  const imageUrl = event.image.startsWith('http') 
    ? event.image 
    : getCategoryImage(event.category);

  // Toggle wishlist status
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsInWishlist(!isInWishlist);
    
    // Get existing wishlist from localStorage
    const wishlistString = localStorage.getItem('eventWishlist') || '[]';
    const wishlist = JSON.parse(wishlistString) as string[];
    
    if (isInWishlist) {
      // Remove from wishlist
      const newWishlist = wishlist.filter(id => id !== event.id);
      localStorage.setItem('eventWishlist', JSON.stringify(newWishlist));
      toast({
        title: "Removed from wishlist",
        description: `${event.title} has been removed from your wishlist`,
        variant: "default",
      });
    } else {
      // Add to wishlist
      if (!wishlist.includes(event.id)) {
        wishlist.push(event.id);
        localStorage.setItem('eventWishlist', JSON.stringify(wishlist));
      }
      toast({
        title: "Added to wishlist",
        description: `${event.title} has been added to your wishlist`,
        variant: "default",
      });
    }
  };

  // Check if event is in wishlist on component mount
  useEffect(() => {
    const wishlistString = localStorage.getItem('eventWishlist') || '[]';
    const wishlist = JSON.parse(wishlistString) as string[];
    setIsInWishlist(wishlist.includes(event.id));
  }, [event.id]);

  // Get category-specific color for badge
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
          <Badge className={`${getCategoryColor(event.category)} backdrop-blur-sm text-xs`}>
            {event.category}
          </Badge>
          {event.trending && (
            <Badge className="bg-red-500/90 backdrop-blur-sm text-xs animate-pulse-slow">
              Trending
            </Badge>
          )}
        </div>
        
        <button 
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm transition-colors hover:bg-black/60"
          onClick={toggleWishlist}
        >
          <Heart 
            className={`h-4 w-4 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-white'}`} 
          />
        </button>
        
        {event.status && (
          <Badge 
            className={`absolute top-12 right-2 text-xs ${
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
