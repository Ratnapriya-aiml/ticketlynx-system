
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, CalendarIcon, Clock, Upload } from "lucide-react";
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const categories = [
  'Concerts',
  'Conferences',
  'Exhibitions',
  'Festivals',
  'Sports',
  'Workshops'
];

const CreateEvent = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    price: '',
    maxAttendees: '',
    description: '',
    time: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.category || !date || !formData.location || !formData.price || !formData.maxAttendees) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Event Created",
        description: `${formData.title} has been created successfully`,
      });
      setIsSubmitting(false);
      
      // Redirect to admin dashboard
      navigate('/admin');
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Navbar isAdmin={true} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6"
          onClick={() => navigate('/admin')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
          <p className="text-muted-foreground mb-8">Fill in the details to create a new event</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left column - Basic details */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    id="title"
                    name="title"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="time" className="block text-sm font-medium">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input 
                      id="time"
                      name="time"
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    id="location"
                    name="location"
                    placeholder="Enter event location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              {/* Right column - Additional details */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="image" className="block text-sm font-medium">
                    Event Image
                  </label>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-4 text-center ${
                      previewImage ? 'border-primary' : 'border-muted'
                    }`}
                  >
                    {previewImage ? (
                      <div className="relative">
                        <img 
                          src={previewImage} 
                          alt="Event preview" 
                          className="mx-auto h-48 object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setPreviewImage(null)}
                        >
                          Change Image
                        </Button>
                      </div>
                    ) : (
                      <div className="py-8">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop an image, or click to browse
                        </p>
                        <Input 
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('image')?.click()}
                        >
                          Upload Image
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-medium">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="maxAttendees" className="block text-sm font-medium">
                    Maximum Attendees <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    id="maxAttendees"
                    name="maxAttendees"
                    type="number"
                    min="1"
                    placeholder="Enter maximum attendees"
                    value={formData.maxAttendees}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium">
                    Description
                  </label>
                  <Textarea 
                    id="description"
                    name="description"
                    placeholder="Enter event description"
                    rows={5}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Event'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateEvent;
