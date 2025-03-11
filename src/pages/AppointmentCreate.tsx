
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AppointmentCreate() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("This feature is not implemented yet");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="pt-16 lg:pl-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
          <div className="flex items-center mb-6">
            <Link to="/appointments">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Appointments
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Schedule New Appointment</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>New Appointment</CardTitle>
              <CardDescription>Schedule an appointment for a patient</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="patient">Patient</Label>
                    <Input id="patient" placeholder="Select or search for a patient" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Appointment Type</Label>
                    <Input id="type" placeholder="Select appointment type" />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Input id="notes" placeholder="Add notes about this appointment" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Schedule Appointment</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
