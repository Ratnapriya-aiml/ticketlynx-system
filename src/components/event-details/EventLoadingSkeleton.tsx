
import React from 'react';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const EventLoadingSkeleton = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-secondary rounded-full w-1/3" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="h-[400px] bg-secondary rounded-xl mb-6" />
            <div className="space-y-4">
              <div className="h-4 bg-secondary rounded-full" />
              <div className="h-4 bg-secondary rounded-full" />
              <div className="h-4 bg-secondary rounded-full w-3/4" />
            </div>
          </div>
          
          <div>
            <div className="h-[300px] bg-secondary rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLoadingSkeleton;
