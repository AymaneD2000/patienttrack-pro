
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, RefreshCw, User } from "lucide-react";
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
}

export default function Patients() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load patients from localStorage
    const loadPatients = () => {
      try {
        const storedPatients = localStorage.getItem("patients");
        if (storedPatients) {
          setPatients(JSON.parse(storedPatients));
        }
      } catch (error) {
        console.error("Error loading patients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPatients();
  }, []);

  // Format date for display
  const formatDate = (dateString: string | Date) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Define columns for the data table
  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: "id",
      header: "Patient ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      id: "fullName",
      header: "Patient Name",
      cell: ({ row }) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
            <User className="h-4 w-4" />
          </div>
          <div>
            <div className="font-medium">{row.getValue("fullName")}</div>
            <div className="text-xs text-gray-500">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => row.getValue("phoneNumber"),
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date of Birth",
      cell: ({ row }) => formatDate(row.original.dateOfBirth),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("gender")}</div>
      ),
    },
    {
      accessorFn: (row) => `${row.city}, ${row.state}`,
      id: "location",
      header: "Location",
      cell: ({ row }) => row.getValue("location"),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            onClick={() => navigate(`/patients/${row.original.id}`)}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="pt-16 lg:pl-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Patients</h1>
              <p className="text-gray-500 mt-1">Manage patient records</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link to="/patients/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Patient
                </Button>
              </Link>
            </div>
          </div>
          
          {isMobile ? (
            <div className="mb-6 flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-8 pr-4 py-2 w-full border rounded-md"
                />
              </div>
              <Button variant="outline" size="icon" aria-label="Filter">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Refresh">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          ) : null}
          
          {isLoading ? (
            <div className="bg-white rounded-lg border shadow-sm p-8 flex flex-col items-center justify-center">
              <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin mb-4"></div>
              <p className="text-gray-500">Loading patient records...</p>
            </div>
          ) : patients.length > 0 ? (
            <DataTable
              columns={columns}
              data={patients}
              searchColumn="fullName"
              searchPlaceholder="Search patients..."
              className="bg-white rounded-lg shadow-sm"
            />
          ) : (
            <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
              <div className="h-20 w-20 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No patients found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start by adding your first patient record to the system.
              </p>
              <Link to="/patients/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Patient
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
