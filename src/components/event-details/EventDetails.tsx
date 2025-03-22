
import React from 'react';
import { Calendar, Clock, Info, MapPin, Share, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import EventSchedule from './EventSchedule';
import { EventType } from '@/components/EventCard';

interface EventDetailsProps {
  event: EventType;
}

const EventDetails = ({ event }: EventDetailsProps) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="relative h-[400px]">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80';
          }}
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
            <button className="flex items-center gap-2 px-3 py-1 rounded border border-input text-sm">
              <Star className="h-4 w-4" />
              Save
            </button>
            <button className="flex items-center gap-2 px-3 py-1 rounded border border-input text-sm">
              <Share className="h-4 w-4" />
              Share
            </button>
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
          
          <EventSchedule />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
