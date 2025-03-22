
import React from 'react';
import ScheduleItem from './ScheduleItem';

const EventSchedule = () => {
  return (
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
  );
};

export default EventSchedule;
