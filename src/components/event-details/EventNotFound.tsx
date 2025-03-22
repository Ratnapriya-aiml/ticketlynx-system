
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const EventNotFound = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default EventNotFound;
