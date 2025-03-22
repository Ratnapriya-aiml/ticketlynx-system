
import React from 'react';

interface ScheduleItemProps { 
  time: string; 
  title: string; 
  speaker?: string; 
  description?: string; 
}

const ScheduleItem = ({ time, title, speaker, description }: ScheduleItemProps) => (
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

export default ScheduleItem;
