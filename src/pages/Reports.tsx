
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Calendar, PieChart as PieChartIcon, BarChart as BarChartIcon, FileDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

// Sample data for reports
const patientData = [
  { month: "Jan", patients: 65 },
  { month: "Feb", patients: 59 },
  { month: "Mar", patients: 80 },
  { month: "Apr", patients: 81 },
  { month: "May", patients: 56 },
  { month: "Jun", patients: 55 },
];

const appointmentData = [
  { month: "Jan", completed: 40, cancelled: 5, rescheduled: 10 },
  { month: "Feb", completed: 45, cancelled: 3, rescheduled: 8 },
  { month: "Mar", completed: 55, cancelled: 7, rescheduled: 12 },
  { month: "Apr", completed: 60, cancelled: 4, rescheduled: 9 },
  { month: "May", completed: 50, cancelled: 6, rescheduled: 11 },
  { month: "Jun", completed: 48, cancelled: 5, rescheduled: 7 },
];

const treatmentData = [
  { name: "Physical Therapy", value: 45 },
  { name: "Manual Therapy", value: 25 },
  { name: "Exercise Therapy", value: 20 },
  { name: "Electrotherapy", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Reports() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState("last6Months");

  const handleDownloadReport = (reportType: string) => {
    // In a real app, this would generate and download a PDF or CSV report
    alert(`Downloading ${reportType} report...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="pt-16 lg:pl-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Analytics & Reports</h1>
              <p className="text-gray-500 mt-1">View and export practice analytics</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <select 
                  className="text-sm border-none bg-transparent focus:outline-none focus:ring-0"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="last6Months">Last 6 Months</option>
                  <option value="thisYear">This Year</option>
                  <option value="lastYear">Last Year</option>
                  <option value="allTime">All Time</option>
                </select>
              </div>
              <Button size="sm" variant="outline" onClick={() => handleDownloadReport("all")}>
                <FileDown className="mr-2 h-4 w-4" />
                Export All
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                    <div className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">254</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Appointments</CardTitle>
                    <div className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">145</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <div className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$12,234</div>
                    <p className="text-xs text-muted-foreground">+18% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
                    <div className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45 min</div>
                    <p className="text-xs text-muted-foreground">+2 min from last month</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Patients Growth</CardTitle>
                    <CardDescription>
                      New patients over the past 6 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={patientData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="patients" fill="#4f46e5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Treatment Types</CardTitle>
                    <CardDescription>
                      Distribution of treatments by type
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={treatmentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {treatmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="patients" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Patient Demographics</CardTitle>
                      <CardDescription>Patient age and gender distribution</CardDescription>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleDownloadReport("patients")}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { age: "0-18", male: 15, female: 20 },
                        { age: "19-35", male: 25, female: 30 },
                        { age: "36-50", male: 35, female: 40 },
                        { age: "51-65", male: 30, female: 25 },
                        { age: "66+", male: 20, female: 15 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="male" fill="#3b82f6" name="Male" />
                      <Bar dataKey="female" fill="#ec4899" name="Female" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appointments" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Appointment Status</CardTitle>
                      <CardDescription>Monthly appointment completion rates</CardDescription>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleDownloadReport("appointments")}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={appointmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#10b981" name="Completed" />
                      <Bar dataKey="cancelled" fill="#ef4444" name="Cancelled" />
                      <Bar dataKey="rescheduled" fill="#f59e0b" name="Rescheduled" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Revenue Analysis</CardTitle>
                      <CardDescription>Monthly revenue breakdown</CardDescription>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleDownloadReport("billing")}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={[
                        { month: "Jan", revenue: 4000, expenses: 2400 },
                        { month: "Feb", revenue: 3000, expenses: 1398 },
                        { month: "Mar", revenue: 5000, expenses: 3200 },
                        { month: "Apr", revenue: 2780, expenses: 3908 },
                        { month: "May", revenue: 1890, expenses: 4800 },
                        { month: "Jun", revenue: 2390, expenses: 3800 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Legend />
                      <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                      <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
