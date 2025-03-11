
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Calendar, FileText, Users, DollarSign, ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function Index() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is authenticated
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);
  
  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      // In a real application, you might want to redirect here
      // For demo purposes, let's allow viewing the dashboard
    }
  }, [isAuthenticated]);

  // Get total patients
  const getTotalPatients = () => {
    const patients = JSON.parse(localStorage.getItem("patients") || "[]");
    return patients.length;
  };

  return isAuthenticated ? (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="pt-16 lg:pl-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-500 mt-1">Welcome to PatientTrack Pro</p>
            </div>
            <div className="mt-4 sm:mt-0 space-x-3">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                View Calendar
              </Button>
              <Button size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <DashboardCard
              title="Total Patients"
              value={getTotalPatients()}
              icon={<Users className="h-5 w-5" />}
              trend={{ value: 12, isPositive: true }}
            />
            <DashboardCard
              title="Appointments Today"
              value="8"
              icon={<Calendar className="h-5 w-5" />}
              trend={{ value: 5, isPositive: true }}
            />
            <DashboardCard
              title="New Records"
              value="12"
              icon={<FileText className="h-5 w-5" />}
              trend={{ value: 3, isPositive: true }}
            />
            <DashboardCard
              title="Revenue"
              value="$8,590"
              icon={<DollarSign className="h-5 w-5" />}
              trend={{ value: 7, isPositive: true }}
            />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Recent Patients</CardTitle>
                  <Link to="/patients" className="text-sm text-primary hover:underline flex items-center">
                    View all
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
                <CardDescription>Latest patient records added</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getTotalPatients() > 0 ? (
                    <div className="space-y-4">
                      {JSON.parse(localStorage.getItem("patients") || "[]")
                        .slice(0, 5)
                        .map((patient: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                              <User className="h-5 w-5" />
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium">
                                {patient.firstName} {patient.lastName}
                              </p>
                              <p className="text-xs text-gray-500">{patient.id}</p>
                            </div>
                            <Link to={`/patients/${patient.id}`}>
                              <Button size="sm" variant="ghost">
                                Details
                              </Button>
                            </Link>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="text-sm font-medium mb-1">No patients yet</h3>
                      <p className="text-xs text-gray-500 mb-4">
                        Start by adding your first patient record
                      </p>
                      <Link to="/patients/new">
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Patient
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Today's Appointments</CardTitle>
                  <Link to="/appointments" className="text-sm text-primary hover:underline flex items-center">
                    View all
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
                <CardDescription>Scheduled for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <Calendar className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-medium mb-1">No appointments today</h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Schedule a new appointment to get started
                  </p>
                  <Link to="/appointments/new">
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Appointment
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                </div>
                <CardDescription>Frequently used actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link to="/patients/new">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      New Patient Record
                    </Button>
                  </Link>
                  <Link to="/appointments/new">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Schedule Appointment
                    </Button>
                  </Link>
                  <Link to="/records/new">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Medical Record
                    </Button>
                  </Link>
                  <Link to="/billing/new">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Invoice
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center mb-4">
          <div className="bg-primary rounded-md p-3">
            <div className="w-10 h-10 text-white font-semibold text-2xl flex items-center justify-center">
              P
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold">Welcome to PatientTrack Pro</h1>
        <p className="text-lg text-gray-600">
          A complete management solution for your therapeutic clinic
        </p>
        <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
          <Link to="/login">
            <Button size="lg" className="w-full sm:w-auto min-w-[120px]">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[120px]">Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
