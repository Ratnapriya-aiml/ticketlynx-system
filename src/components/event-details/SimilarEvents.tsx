
import React from 'react';
import EventCard, { EventType } from '@/components/EventCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SimilarEventsProps {
  events: EventType[];
}

const SimilarEvents = ({ events }: SimilarEventsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 animate-fade-up delay-200">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Similar Events You Might Like</h2>
        <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
          View All Events
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event.id} event={event} compact />
        ))}
      </div>
    </div>
  );
};

export default SimilarEvents;
