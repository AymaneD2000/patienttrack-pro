
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  Trash2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  notes?: string;
}

export default function PatientDetails() {
  const { patientId } = useParams<{ patientId: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = () => {
      try {
        setLoading(true);
        const patients = JSON.parse(localStorage.getItem("patients") || "[]");
        const foundPatient = patients.find(
          (p: Patient) => p.id === patientId
        );
        
        if (foundPatient) {
          setPatient(foundPatient);
        } else {
          setError("Patient not found");
        }
      } catch (err) {
        setError("Error fetching patient details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  const handleDeletePatient = () => {
    try {
      const patients = JSON.parse(localStorage.getItem("patients") || "[]");
      const updatedPatients = patients.filter(
        (p: Patient) => p.id !== patientId
      );
      
      localStorage.setItem("patients", JSON.stringify(updatedPatients));
      
      toast.success("Patient deleted successfully");
      navigate("/patients");
    } catch (err) {
      toast.error("Error deleting patient");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Patient Not Found</h1>
          <p className="text-gray-500 mb-6">
            The patient record you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/patients">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Patients
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="pt-16 lg:pl-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex items-center">
              <Link to="/patients">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Patient Details</h1>
            </div>
            
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Patient Record</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this patient record? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeletePatient}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Patient's basic details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center pb-6">
                  <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <User className="h-12 w-12" />
                  </div>
                  <h2 className="text-xl font-bold">
                    {patient.firstName} {patient.lastName}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">{patient.id}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-500">{patient.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-gray-500">{patient.phoneNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Date of Birth</p>
                      <p className="text-sm text-gray-500">
                        {patient.dateOfBirth
                          ? format(new Date(patient.dateOfBirth), "MMMM d, yyyy")
                          : "Not provided"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Gender</p>
                      <p className="text-sm text-gray-500 capitalize">{patient.gender}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-gray-500">
                        {patient.address}
                        <br />
                        {patient.city}, {patient.state} {patient.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="md:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="medical-info">Medical Info</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Patient Notes</CardTitle>
                      <CardDescription>Additional information about the patient</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {patient.notes ? (
                        <p className="text-gray-700">{patient.notes}</p>
                      ) : (
                        <p className="text-gray-500 italic">No notes available</p>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Latest updates on this patient</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500 italic text-center py-8">
                        No recent activity to display
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="medical-info">
                  <Card>
                    <CardHeader>
                      <CardTitle>Medical Information</CardTitle>
                      <CardDescription>Clinical history and details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-gray-500 mb-4">
                          No medical information available yet
                        </p>
                        <Button>
                          <Edit className="mr-2 h-4 w-4" />
                          Add Medical Information
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="appointments">
                  <Card>
                    <CardHeader>
                      <CardTitle>Appointments</CardTitle>
                      <CardDescription>Schedule and history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-gray-500 mb-4">
                          No appointments scheduled yet
                        </p>
                        <Button>
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Appointment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="billing">
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Information</CardTitle>
                      <CardDescription>Invoices and payment history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-gray-500 mb-4">
                          No billing information available yet
                        </p>
                        <Button>
                          <Edit className="mr-2 h-4 w-4" />
                          Add Billing Information
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
