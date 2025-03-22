
import React from 'react';
import EventCard, { EventType } from '@/components/EventCard';

interface SimilarEventsProps {
  events: EventType[];
}

const SimilarEvents = ({ events }: SimilarEventsProps) => {
  return (
    <div className="space-y-6 animate-fade-up delay-200">
      <h2 className="text-xl font-semibold">Similar Events You Might Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event.id} event={event} compact />
        ))}
      </div>
    </div>
  );
};

export default SimilarEvents;
