
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Plus, 
  Search,
  Calendar,
  FilePlus2,
  Trash2
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Sample mock data for medical records
const mockRecords = [
  {
    id: 1,
    patientName: "John Doe",
    patientId: "P-1001",
    recordType: "Consultation",
    date: "2025-03-10",
    description: "Initial consultation for lower back pain",
    createdBy: "Dr. Smith"
  },
  {
    id: 2,
    patientName: "Jane Smith",
    patientId: "P-1002",
    recordType: "Therapy Session",
    date: "2025-03-09",
    description: "Physical therapy session for shoulder rehabilitation",
    createdBy: "Dr. Johnson"
  },
  {
    id: 3,
    patientName: "Robert Brown",
    patientId: "P-1003",
    recordType: "Assessment",
    date: "2025-03-08",
    description: "Comprehensive mobility assessment",
    createdBy: "Dr. Williams"
  }
];

export default function Records() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [records, setRecords] = useState(mockRecords);
  const { toast } = useToast();

  // Filter records based on search term
  const filteredRecords = records.filter(record =>
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.recordType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteRecord = (id: number) => {
    setRecords(records.filter(record => record.id !== id));
    toast({
      title: "Record deleted",
      description: "The medical record has been deleted successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="pt-16 lg:pl-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Medical Records</h1>
              <p className="text-gray-500 mt-1">Manage patient medical records</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link to="/records/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Record
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search records..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredRecords.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{record.patientName}</CardTitle>
                        <CardDescription>ID: {record.patientId}</CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteRecord(record.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="grid gap-2">
                      <div className="flex items-center text-sm">
                        <FileText className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="font-medium">{record.recordType}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                        <span>{record.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{record.description}</p>
                      <div className="mt-2 text-sm text-gray-500">Created by: {record.createdBy}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
              <div className="h-20 w-20 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-4">
                <FileText className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No medical records found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchTerm ? "No records match your search criteria." : "Start by adding your first medical record."}
              </p>
              <Link to="/records/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Record
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
